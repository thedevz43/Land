import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandSearch from "./pages/LandSearch";
import LandDetails from "./pages/LandDetails";
import MutationModule from "./pages/MutationModule";
import TaxModule from "./pages/TaxModule";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/mutation" element={<MutationModule />} />
            <Route path="/dashboard/tax" element={<TaxModule />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/search" element={<LandSearch />} />
            <Route path="/land/:id" element={<LandDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/mutation" element={<MutationModule />} />
            <Route path="/tax" element={<TaxModule />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
