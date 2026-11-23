// Checks the login cookie with the server before showing pages that require an account.
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../api/authApi';

function ProtectedRoute() {
  const [user, setUser] = useState(undefined);

  // Run the session check when this component mounts, not on every render.
  useEffect(() => {
    getCurrentUser()
      .then(async response => setUser(response.ok ? (await response.json()).user : null))
      .catch(() => setUser(null));
  }, []);

  // Wait for the session response so member content is not shown before the check finishes.
  if (user === undefined) {
    return <p>Loading...</p>;
  }

  // Replace this history entry so Back does not keep returning to the rejected route.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Outlet renders the requested protected page, such as Dashboard.
  return <Outlet context={user} />;
}

export default ProtectedRoute;