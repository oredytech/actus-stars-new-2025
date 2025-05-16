
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/ArticlePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Create a context for sharing category state
export const CategoryContext = createContext<{
  selectedCategoryId: number | null;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  selectedCategoryId: null,
  setSelectedCategoryId: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CategoryContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactPage />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CategoryContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
