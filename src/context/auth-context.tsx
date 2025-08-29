import { UserRoleEnum } from '@/enums/user.enum';
import { create } from "zustand";
import { persist, createJSONStorage, subscribeWithSelector } from "zustand/middleware";
import { login as loginApi, logout as logoutApi, registerEmail, generateOTP, verifyOTP, resetPassword } from "@/api/user.api";
import { TLoginRequest, TRegisterEmailRequest, TGenerateOTPRequest, TVerifyOTPRequest, TResetPasswordRequest, TLoginResponse } from "@/types/user.type";
import axiosInstance from "@/lib/baseHttp.lib";
import { toast } from "sonner";
import env from '@/config/env.config';
import { redirect } from '@tanstack/react-router';

interface User {
  id: number;
  email: string;
  type: string;
  roles: Array<{
    id: number;
    roleName: UserRoleEnum;
    isActive: boolean;
  }>;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;
  tokenExpiry: number | null;
  autoLogoutTimer: NodeJS.Timeout | null;
  registrationData: Record<string, unknown> | null;
}

interface AuthActions {
  login: (credentials: TLoginRequest) => Promise<TLoginResponse>;
  logout: () => Promise<void>;
  registerEmail: (data: TRegisterEmailRequest) => Promise<number>;
  generateOTP: (data: TGenerateOTPRequest) => Promise<number>;
  verifyOTP: (data: TVerifyOTPRequest) => Promise<number>;
  resetPassword: (data: TResetPasswordRequest) => Promise<number>;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  clearRegistrationData: () => void;
  getRemainingTime: (expiryTime?: number) => number;
  isTokenExpired: (expiryTime?: number) => boolean;
  checkTokenValidity: () => boolean;
  setupAutoLogout: () => void;
  initializeAuth: () => Promise<void>;
  validateToken: (token: string) => Promise<boolean>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: typeof window === 'undefined', // true on server, false on client until hydrated
      error: null,
      tokenExpiry: null,
      autoLogoutTimer: null,
      registrationData: null,

      // Actions
      login: async (credentials: TLoginRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await loginApi(credentials);
          
          // Set token in axios headers for future requests
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.tokenString}`;
          
          // Map the response to our user structure
          const user: User = {
            id: response.id,
            email: response.email,
            type: response.type,
            roles: response.listUser.map(role => ({
              id: role.id,
              roleName: role.roleName,
              isActive: role.isActive
            }))
          };
          
          const expiryTime = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours
          
          set({
            token: response.tokenString,
            user,
            tokenExpiry: expiryTime,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          // Setup auto-logout timer
          get().setupAutoLogout();
          
          return response;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Login failed" 
          });
          throw error;
        }
      },

      logout: async () => {
        const { token, autoLogoutTimer } = get();
        
        set({ isLoading: true });
        
        try {
          if (token) {
            await logoutApi();
            
      toast.success("Logged out successfully");
      // Redirect to login page after successful logout
      redirect({ to: "/login" });
          }
        } catch (error) {
          console.warn("Logout API call failed:", error);
        } finally {
          // Clear auto-logout timer
          if (autoLogoutTimer) {
            clearTimeout(autoLogoutTimer);
          }
          
          // Remove token from axios headers
          delete axiosInstance.defaults.headers.common["Authorization"];
          
          set({
            user: null,
            token: null,
            tokenExpiry: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            autoLogoutTimer: null,
          });
        }
      },
      
      registerEmail: async (data: TRegisterEmailRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await registerEmail(data);
          set({ isLoading: false });
          return response.userId;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Registration failed" 
          });
          throw error;
        }
      },
      
      generateOTP: async (data: TGenerateOTPRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await generateOTP(data);
          set({ isLoading: false });
          return response.userId;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "OTP generation failed" 
          });
          throw error;
        }
      },
      
      verifyOTP: async (data: TVerifyOTPRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await verifyOTP(data);
          set({ isLoading: false, error: null, registrationData: {...get().registrationData, ...response} });
          return response.userId;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "OTP verification failed" 
          });
          throw error;
        }
      },
      
      resetPassword: async (data: TResetPasswordRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await resetPassword(data);
          set({ isLoading: false });
          return response.userId;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Password reset failed" 
          });
          throw error;
        }
      },

      setUser: (user: User) => {
        set({ user });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      clearRegistrationData: () => {
        set({ registrationData: null });
      },

      getRemainingTime: (expiryTime?: number) => {
        const expiry = expiryTime || get().tokenExpiry;
        if (!expiry) return 0;
        const remaining = expiry - new Date().getTime();
        return Math.max(0, remaining);
      },

      isTokenExpired: (expiryTime?: number) => {
        const expiry = expiryTime || get().tokenExpiry;
        if (!expiry) return true;
        return new Date().getTime() >= expiry;
      },

      checkTokenValidity: () => {
        const token = get().token;
        const expiry = get().tokenExpiry;
        
        if (!token || !expiry) return false;
        return !get().isTokenExpired(expiry);
      },

      setupAutoLogout: () => {
        const { tokenExpiry, autoLogoutTimer } = get();
        
        if (autoLogoutTimer) {
          clearTimeout(autoLogoutTimer);
        }
        
        if (tokenExpiry) {
          const remaining = get().getRemainingTime(tokenExpiry);
          if (remaining > 0) {
            const timer = setTimeout(() => {
              get().logout();
              toast.error("Session expired. Please login again.");
            }, remaining);
            
            set({ autoLogoutTimer: timer });
          }
        }
      },

      validateToken: async (token: string) => {
        try {
          console.log("🔍 Validating token...");
          const response = await fetch(`${env.backendURL}/User/ValidateToken`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          console.log("✅ Token validation response:", response.ok);
          return response.ok;
        } catch (error) {
          console.error("❌ Token validation failed:", error);
          return false;
        }
      },

      initializeAuth: async () => {
        const { token, tokenExpiry } = get();
        
        console.log("🚀 Initializing auth...", { hasToken: !!token, hasExpiry: !!tokenExpiry });
        
        if (!token || !tokenExpiry) {
          console.log("❌ No token or expiry found");
          set({ isAuthenticated: false });
          return;
        }
        
        // Set token in axios headers immediately
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        if (get().isTokenExpired(tokenExpiry)) {
          console.log("❌ Token expired");
          await get().logout();
          return;
        }
        
        // For initial load, assume token is valid to avoid blocking UI
        // The axios interceptor will handle 401s if token is actually invalid
        console.log("✅ Token appears valid, setting authenticated");
        set({ isAuthenticated: true });
        get().setupAutoLogout();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        // Only use localStorage on client side
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Return a no-op storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tokenExpiry: state.tokenExpiry,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state, error) => {
        console.log("🔄 Rehydrating auth state...", { state, error });
        
        if (error) {
          console.error("❌ Rehydration failed:", error);
          // Use setTimeout to avoid initialization issues
          setTimeout(() => {
            try {
              useAuthStore.setState({ isHydrated: true, isAuthenticated: false });
            } catch (e) {
              console.error("❌ Failed to set error state:", e);
            }
          }, 0);
          return;
        }
        
        if (state?.token && typeof window !== 'undefined') {
          console.log("🔑 Setting token in axios headers from rehydration");
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
        }
        
        // Mark as hydrated using setTimeout to avoid initialization issues
        setTimeout(() => {
          try {
            useAuthStore.setState({ isHydrated: true });
            console.log("✅ Rehydration complete, store is hydrated");
          } catch (e) {
            console.error("❌ Failed to set hydrated state:", e);
          }
        }, 0);
      },
      skipHydration: typeof window === 'undefined', // Skip hydration on server
    },
  ),
);

// Auth initialization is handled by the rehydration callback and root component
