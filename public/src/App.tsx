import { useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/auth";

  return (
    <div className="min-h-screen flex w-full">
      {!hideSidebar && <AppSidebar />}
      <div className="flex-1 flex flex-col">
        {!hideSidebar && <Header />}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <AppLayout>
              <Routes>
                <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route
                  path="/"
                  element={
                    isAuthenticated ? <Index /> : <Navigate to="/auth" replace />
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    isAuthenticated ? <Dashboard /> : <Navigate to="/auth" replace />
                  }
                />
                <Route
                  path="/reports"
                  element={
                    isAuthenticated ? <Reports /> : <Navigate to="/auth" replace />
                  }
                />
                <Route
                  path="/alerts"
                  element={
                    isAuthenticated ? <Alerts /> : <Navigate to="/auth" replace />
                  }
                />
                <Route
                  path="/community"
                  element={
                    isAuthenticated ? <Community /> : <Navigate to="/auth" replace />
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    isAuthenticated ? <Analytics /> : <Navigate to="/auth" replace />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
