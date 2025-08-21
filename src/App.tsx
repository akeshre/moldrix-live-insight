import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlantDashboard from "./pages/PlantDashboard";
import MachineDashboard from "./pages/MachineDashboard";
import MoldDashboard from "./pages/MoldDashboard";
import AddPlantForm from "./pages/AddPlantForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plant/:plantId" element={<PlantDashboard />} />
            <Route path="/plant/:plantId/machine/:machineId" element={<MachineDashboard />} />
            <Route path="/plant/:plantId/machine/:machineId/mold/:moldId" element={<MoldDashboard />} />
            <Route path="/add-plant" element={<AddPlantForm />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
