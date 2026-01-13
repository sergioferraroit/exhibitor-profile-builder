import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Home from "./pages/Home";
import ExhibitorHub from "./pages/ExhibitorHub";
import ProductEditPage from "./pages/ProductEditPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AdminMarketingOperations from "./pages/AdminMarketingOperations";
import ProductListing from "./pages/ProductListing";
import AddProduct from "./pages/AddProduct";
import ManageShares from "./pages/ManageShares";
import Shop from "./pages/Shop";
import ExhibitorManual from "./pages/ExhibitorManual";

import CompanyAdministrators from "./pages/CompanyAdministrators";
import AllocateBadges from "./pages/AllocateBadges";
import YourCompanyBadges from "./pages/YourCompanyBadges";
import LeadManagerApp from "./pages/LeadManagerApp";
import CreateOffer from "./pages/CreateOffer";
import InviteCustomers from "./pages/InviteCustomers";
import ExhibitorDashboard from "./pages/ExhibitorDashboard";
import ProfileViewer from "./pages/ProfileViewer";
import BenchmarkAnalytics from "./pages/BenchmarkAnalytics";
import HomeGuidedTour from "./pages/HomeGuidedTour";
import CompanyProfileHelp from "./pages/CompanyProfileHelp";
import LeadManagerHelp from "./pages/LeadManagerHelp";
import OfferHelp from "./pages/OfferHelp";
import ExhibitorDashboardHelp from "./pages/ExhibitorDashboardHelp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth Routes (public) */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            
            {/* My Show */}
            <Route path="/admin-marketing-operations" element={<ProtectedRoute><AdminMarketingOperations /></ProtectedRoute>} />
            <Route path="/edit-company-profile" element={<ProtectedRoute><ExhibitorHub /></ProtectedRoute>} />
            <Route path="/product-listing" element={<ProtectedRoute><ExhibitorHub /></ProtectedRoute>} />
            <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
            <Route path="/manage-shares" element={<ProtectedRoute><ManageShares /></ProtectedRoute>} />
            <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
            <Route path="/exhibitor-manual" element={<ProtectedRoute><ExhibitorManual /></ProtectedRoute>} />
            
            <Route path="/company-administrators" element={<ProtectedRoute><CompanyAdministrators /></ProtectedRoute>} />
            <Route path="/allocate-badges" element={<ProtectedRoute><AllocateBadges /></ProtectedRoute>} />
            <Route path="/your-company-badges" element={<ProtectedRoute><YourCompanyBadges /></ProtectedRoute>} />
            <Route path="/product/:productId" element={<ProtectedRoute><ProductEditPage /></ProtectedRoute>} />
            
            {/* Lead Capture */}
            <Route path="/lead-manager-app" element={<ProtectedRoute><LeadManagerApp /></ProtectedRoute>} />
            <Route path="/create-offer" element={<ProtectedRoute><CreateOffer /></ProtectedRoute>} />
            <Route path="/invite-customers" element={<ProtectedRoute><InviteCustomers /></ProtectedRoute>} />
            
            {/* Analytics */}
            <Route path="/exhibitor-dashboard" element={<ProtectedRoute><ExhibitorDashboard /></ProtectedRoute>} />
            <Route path="/profile-viewer" element={<ProtectedRoute><ProfileViewer /></ProtectedRoute>} />
            <Route path="/benchmark-analytics" element={<ProtectedRoute><BenchmarkAnalytics /></ProtectedRoute>} />
            
            {/* Help */}
            <Route path="/home-guided-tour" element={<ProtectedRoute><HomeGuidedTour /></ProtectedRoute>} />
            <Route path="/company-profile-help" element={<ProtectedRoute><CompanyProfileHelp /></ProtectedRoute>} />
            <Route path="/lead-manager-help" element={<ProtectedRoute><LeadManagerHelp /></ProtectedRoute>} />
            <Route path="/offer-help" element={<ProtectedRoute><OfferHelp /></ProtectedRoute>} />
            <Route path="/exhibitor-dashboard-help" element={<ProtectedRoute><ExhibitorDashboardHelp /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
