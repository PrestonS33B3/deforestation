import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
