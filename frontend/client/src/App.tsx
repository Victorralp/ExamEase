import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import StudentDashboard from "@/pages/student/dashboard";
import StudentUpcomingExams from "@/pages/student/upcoming-exams";
import StudentResults from "@/pages/student/results";
import StudentProgress from "@/pages/student/progress";
import StudentFeedback from "@/pages/student/feedback";
import StudentProfile from "@/pages/student/profile";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminExams from "@/pages/admin/exams";
import AdminQuestions from "@/pages/admin/questions";
import AdminStudents from "@/pages/admin/students";
import AdminResults from "@/pages/admin/results";
import AdminFeedback from "@/pages/admin/feedback";
import AdminLogs from "@/pages/admin/logs";
import AdminProfile from "@/pages/admin/profile";

function Router() {
  return (
    <Switch>
      {/* Auth Page */}
      <Route path="/auth" component={AuthPage} />

      {/* Student Routes */}
      <ProtectedRoute path="/" component={StudentDashboard} role="STUDENT" />
      <ProtectedRoute path="/student/upcoming-exams" component={StudentUpcomingExams} role="STUDENT" />
      <ProtectedRoute path="/student/results" component={StudentResults} role="STUDENT" />
      <ProtectedRoute path="/student/progress" component={StudentProgress} role="STUDENT" />
      <ProtectedRoute path="/student/feedback" component={StudentFeedback} role="STUDENT" />
      <ProtectedRoute path="/student/profile" component={StudentProfile} role="STUDENT" />

      {/* Admin Routes */}
      <ProtectedRoute path="/admin" component={AdminDashboard} role="ADMIN" />
      <ProtectedRoute path="/admin/exams" component={AdminExams} role="ADMIN" />
      <ProtectedRoute path="/admin/questions" component={AdminQuestions} role="ADMIN" />
      <ProtectedRoute path="/admin/students" component={AdminStudents} role="ADMIN" />
      <ProtectedRoute path="/admin/results" component={AdminResults} role="ADMIN" />
      <ProtectedRoute path="/admin/feedback" component={AdminFeedback} role="ADMIN" />
      <ProtectedRoute path="/admin/logs" component={AdminLogs} role="ADMIN" />
      <ProtectedRoute path="/admin/profile" component={AdminProfile} role="ADMIN" />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
