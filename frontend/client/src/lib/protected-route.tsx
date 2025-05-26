import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
  role
}: {
  path: string;
  component: () => React.JSX.Element;
  role?: string;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  // If a role is specified, check if the user has that role
  if (role && user.role !== role) {
    return (
      <Route path={path}>
        <Redirect to={user.role === "ADMIN" ? "/admin" : "/"} />
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}
