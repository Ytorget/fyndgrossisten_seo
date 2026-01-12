import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Sortiment from "./pages/Sortiment";
import Fyndladan from "./pages/fyndladan"; // Corrected import
import OmOss from "./pages/OmOss";
import Kontakt from "./pages/Kontakt";
import BliAterforsaljare from "./pages/BliAterforsaljare";
import LoggaIn from "./pages/LoggaIn";
import GlomtLosenord from "./pages/GlomtLosenord";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sortiment" element={<Sortiment />} />
            <Route path="/fyndladan" element={<Fyndladan />} /> {/* Corrected route and component */}
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/bli-aterforsaljare" element={<BliAterforsaljare />} />
            <Route path="/logga-in" element={<LoggaIn />} />
            <Route path="/glomt-losenord" element={<GlomtLosenord />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
