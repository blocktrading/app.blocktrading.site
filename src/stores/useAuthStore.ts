import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulazione API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock validation - in produzione sarà una vera API
        if (email === 'admin@blocktrading.io' && password === 'password') {
          const user: User = {
            id: '1',
            email,
            name: 'Trading Admin',
            avatar: undefined
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        // Simulazione API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const user: User = {
          id: Math.random().toString(36),
          email,
          name,
          avatar: undefined
        };
        
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false 
        });
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);