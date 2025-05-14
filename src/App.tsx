
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ImageDataProvider } from "@/contexts/ImageDataContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import BeforeSurgeryPage from "@/pages/BeforeSurgeryPage";
import DuringSurgeryPage from "@/pages/DuringSurgeryPage";
import AfterSurgeryPage from "@/pages/AfterSurgeryPage";
import ResourcesPage from "@/pages/ResourcesPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <ImageDataProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-slate-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/before-surgery" element={<BeforeSurgeryPage />} />
                  <Route path="/during-surgery" element={<DuringSurgeryPage />} />
                  <Route path="/after-surgery" element={<AfterSurgeryPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </ImageDataProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
