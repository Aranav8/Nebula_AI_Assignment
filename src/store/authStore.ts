import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../core/api';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setIsHydrated: (value: boolean) => void;
  login: (credentials: object) => Promise<void>;
  register: (userData: object) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      setIsHydrated: (value) => set({ isHydrated: value }),
      login: async (credentials) => {
        const { data } = await api.post('/auth/login', credentials);
        set({ user: data, isAuthenticated: true });
      },
      register: async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        set({ user: data, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'user',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsHydrated(true);
        }
      },
    }
  )
);