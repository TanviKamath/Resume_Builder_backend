import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Resume_Builder from "./pages/Resume_builder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="app" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="builder/:resumeId" element={<Resume_Builder />} />
            </Route>
            <Route path="view/:resumeId" element={<Preview />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>

      <Toaster />
      <Sonner />
    </QueryClientProvider>
  );
}

export default App;
