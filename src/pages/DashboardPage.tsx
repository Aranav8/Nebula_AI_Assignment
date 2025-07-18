import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import api from '../core/api';
import { useAuthStore } from '../store/authStore'; // <-- 1. IMPORT THE AUTH STORE

const DashboardPage: React.FC = () => {
  const logout = useAuthStore((state) => state.logout); // <-- 2. GET THE LOGOUT FUNCTION

  // All the state declarations below remain the same
  const [codeSnippet, setCodeSnippet] = useState<string>('// Paste your code here');
  const [title, setTitle] = useState<string>('');
  const [errorTrace, setErrorTrace] = useState<string>('');
  const [logs, setLogs] = useState<string>('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{rationale: string, correctedCode: string} | null>(null);

  // This function does not change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setScreenshot(e.target.files[0]);
  };

  // This function does not change
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAiResult(null);

    const formData = new FormData();
    formData.append('title', title || 'Untitled Session');
    formData.append('codeSnippet', codeSnippet);
    formData.append('errorTrace', errorTrace);
    formData.append('logs', logs);
    if (screenshot) formData.append('screenshot', screenshot);

    try {
      const res1 = await api.post('/sessions', formData);
      const newSession = res1.data;
      const res2 = await api.post(`/sessions/${newSession.id}/analyze`);
      setAiResult(res2.data.aiSuggestion);
    } catch (error) {
      console.error('Failed to create session:', error);
      alert('An error occurred. Please check the console.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-900 text-white min-h-screen">
      {/* 3. ADD THIS NEW HEADER SECTION WITH THE LOGOUT BUTTON */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-400">Debug Assistant</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </header>

      {/* The rest of the file (the form and results) is exactly the same */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Session Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Fixing the user login bug" className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 text-white" />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Code Snippet</label>
          <div className="border border-gray-700 rounded-md overflow-hidden"><Editor height="40vh" defaultLanguage="javascript" theme="vs-dark" value={codeSnippet} onChange={(value) => setCodeSnippet(value || '')} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-lg font-medium mb-2">Error Trace</label><textarea value={errorTrace} onChange={(e) => setErrorTrace(e.target.value)} className="w-full p-3 h-48 bg-gray-800 rounded-md border border-gray-700 text-white font-mono" placeholder="Paste stack trace..." /></div>
          <div><label className="block text-lg font-medium mb-2">Logs</label><textarea value={logs} onChange={(e) => setLogs(e.target.value)} className="w-full p-3 h-48 bg-gray-800 rounded-md border border-gray-700 text-white font-mono" placeholder="Paste relevant logs..." /></div>
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">UI Screenshot</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-md font-bold text-lg disabled:bg-gray-500 transition-colors">{isSubmitting ? 'Analyzing...' : 'Get AI Suggestion'}</button>
      </form>

      {aiResult && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-green-400">AI Suggestion</h2>
            <div>
                <h3 className="text-xl font-semibold mb-2">Rationale</h3>
                <p className="bg-gray-900 p-4 rounded-md whitespace-pre-wrap">{aiResult.rationale}</p>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Corrected Code</h3>
                <div className="border border-gray-700 rounded-md overflow-hidden"><Editor height="40vh" language="javascript" theme="vs-dark" value={aiResult.correctedCode} options={{ readOnly: true }} /></div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;