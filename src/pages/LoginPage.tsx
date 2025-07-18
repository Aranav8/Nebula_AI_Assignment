import React, { useState } from 'react';
    import { useAuthStore } from '../store/authStore';
    import { useNavigate, Link } from 'react-router-dom';

    const LoginPage: React.FC = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState<string | null>(null);
      const login = useAuthStore((state) => state.login);
      const navigate = useNavigate();

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
          await login({ email, password });
          navigate('/dashboard');
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to login.');
        }
      };

      return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
          <div className="p-8 bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Login</h2>
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-cyan-500 text-white" required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-cyan-500 text-white" required />
              </div>
              <button type="submit" className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition-colors text-white">Login</button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-400">
              Don't have an account? <Link to="/signup" className="text-cyan-400 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      );
    };

    export default LoginPage;