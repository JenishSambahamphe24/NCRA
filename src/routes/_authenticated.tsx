import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "@/context/auth-context";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    console.log("🔐 Checking authentication for:", location.href);
    
    // On server side, skip auth check to avoid hydration issues
    if (typeof window === 'undefined') {
      console.log("🌍 Server-side, skipping auth check");
      return;
    }
    
    // Wait for hydration in client-side navigation
    const store = useAuthStore.getState();
    
    // If not hydrated yet, wait a bit for it to complete
    if (!store.isHydrated) {
      console.log("⏳ Waiting for auth store hydration...");
      
      // Wait up to 2 seconds for hydration
      let attempts = 0;
      while (!useAuthStore.getState().isHydrated && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      // If still not hydrated after waiting, force hydration
      if (!useAuthStore.getState().isHydrated) {
        console.log("⚠️ Hydration timeout, forcing hydration...");
        useAuthStore.setState({ isHydrated: true });
      }
    }
    
    // Initialize auth if needed
    await useAuthStore.getState().initializeAuth();
    
    // Get current state after initialization
    const { isAuthenticated, checkTokenValidity, isHydrated } = useAuthStore.getState();
    const isValid = isAuthenticated && checkTokenValidity();
    
    console.log("🔐 Auth check result:", { isAuthenticated, isValid, isHydrated });
    
    if (!isValid) {
      console.log("❌ Not authenticated, redirecting to login");
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
    
    console.log("✅ Authentication successful");
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkTokenValidity = useAuthStore((state) => state.checkTokenValidity);
  
  // On server side, always show loading to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If we're not hydrated yet, show loading
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If hydrated but not authenticated or token invalid, this should not happen
  // because beforeLoad should have redirected, but just in case
  if (!isAuthenticated || !checkTokenValidity()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return <Outlet />;
}
