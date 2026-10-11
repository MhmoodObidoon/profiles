import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "@/i18n/LangContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const getRouterBasename = (): string | undefined => {
  const raw = import.meta.env.BASE_URL;
  if (!raw || raw === "./" || raw === ".") return undefined;
  const clean = raw.replace(/\/+$/, "");
  return clean.startsWith("/") ? clean : `/${clean}`;
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
    <LangProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={getRouterBasename()}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LangProvider>
  </ThemeProvider>
);

export default App;
