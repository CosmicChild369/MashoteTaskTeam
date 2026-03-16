import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

/**
 * Wraps protected routes.
 * While auth is loading shows nothing (spinner handled by App).
 * If user is not authenticated, redirects to /Login preserving the original URL.
 */
export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) return null;

  if (!isAuthenticated) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children;
}
