import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/debug-auth")({
  component: DebugAuthPage,
});

function DebugAuthPage() {
  const navigate = useNavigate();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    isHydrated,
    error,
    tokenExpiry,
    login,
    logout,
    initializeAuth,
    checkTokenValidity,
    clearError,
  } = useAuthStore();

  const handleTestLogin = async () => {
    try {
      await login({ 
        email: "test@example.com", 
        password: "testpassword" 
      });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleInitAuth = async () => {
    await initializeAuth();
  };

  const getRemainingTime = () => {
    if (!tokenExpiry) return "N/A";
    const remaining = tokenExpiry - new Date().getTime();
    return remaining > 0 ? `${Math.floor(remaining / 1000 / 60)} minutes` : "Expired";
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Auth State */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Is Authenticated:</strong> {isAuthenticated ? "✅ Yes" : "❌ No"}</div>
            <div><strong>Is Loading:</strong> {isLoading ? "🔄 Yes" : "No"}</div>
            <div><strong>Is Hydrated:</strong> {isHydrated ? "✅ Yes" : "❌ No"}</div>
            <div><strong>Has Token:</strong> {token ? "✅ Yes" : "❌ No"}</div>
            <div><strong>Token Valid:</strong> {checkTokenValidity() ? "✅ Yes" : "❌ No"}</div>
            <div><strong>Token Expiry:</strong> {tokenExpiry ? new Date(tokenExpiry).toLocaleString() : "N/A"}</div>
            <div><strong>Time Remaining:</strong> {getRemainingTime()}</div>
            <div><strong>User ID:</strong> {user?.id || "N/A"}</div>
            <div><strong>User Email:</strong> {user?.email || "N/A"}</div>
            <div><strong>User Type:</strong> {user?.type || "N/A"}</div>
            <div><strong>User Roles:</strong> {user?.roles?.map(r => r.roleName).join(", ") || "N/A"}</div>
          </CardContent>
        </Card>

        {/* Error State */}
        <Card>
          <CardHeader>
            <CardTitle>Error State</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-red-600 bg-red-50 p-3 rounded">
                <strong>Error:</strong> {error}
                <Button onClick={clearError} size="sm" className="ml-2">
                  Clear
                </Button>
              </div>
            ) : (
              <div className="text-green-600">No errors</div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={handleTestLogin} disabled={isLoading} className="w-full">
              Test Login
            </Button>
            <Button onClick={handleLogout} disabled={isLoading} variant="outline" className="w-full">
              Logout
            </Button>
            <Button onClick={handleInitAuth} disabled={isLoading} variant="secondary" className="w-full">
              Re-initialize Auth
            </Button>
          </CardContent>
        </Card>

        {/* Token Details */}
        <Card>
          <CardHeader>
            <CardTitle>Token Details</CardTitle>
          </CardHeader>
          <CardContent>
            {token ? (
              <div className="break-all text-sm font-mono bg-gray-100 p-3 rounded">
                {token.substring(0, 50)}...
              </div>
            ) : (
              <div className="text-gray-500">No token available</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Local Storage Debug */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Local Storage Debug</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => {
              const storage = localStorage.getItem('auth-storage');
              console.log("Auth storage:", storage);
              alert(`Auth storage: ${storage}`);
            }}
            variant="outline"
          >
            Check Local Storage
          </Button>
          <Button 
            onClick={() => {
              localStorage.removeItem('auth-storage');
              window.location.reload();
            }}
            variant="destructive"
            className="ml-2"
          >
            Clear Storage & Reload
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
