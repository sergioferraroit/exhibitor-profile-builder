import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExhibitorHub from "./pages/ExhibitorHub";
import ProductEditPage from "./pages/ProductEditPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminMarketingOperationsPage from "./pages/AdminMarketingOperationsPage";
import EditCompanyProfilePage from "./pages/EditCompanyProfilePage";
import ProductListingPage from "./pages/ProductListingPage";
import AddProductPage from "./pages/AddProductPage";
import ManageSharesPage from "./pages/ManageSharesPage";
import ShopPage from "./pages/ShopPage";
import ExhibitorManualPage from "./pages/ExhibitorManualPage";
import MyTeamPage from "./pages/MyTeamPage";
import CompanyAdministratorsPage from "./pages/CompanyAdministratorsPage";
import AllocateBadgesPage from "./pages/AllocateBadgesPage";
import YourCompanyBadgesPage from "./pages/YourCompanyBadgesPage";
import LeadManagerAppPage from "./pages/LeadManagerAppPage";
import CreateOfferPage from "./pages/CreateOfferPage";
import InviteCustomersPage from "./pages/InviteCustomersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfileViewerPage from "./pages/ProfileViewerPage";
import BenchmarkAnalyticsPage from "./pages/BenchmarkAnalyticsPage";
import HomeGuidedTourPage from "./pages/HomeGuidedTourPage";
import CompanyProfileHelpPage from "./pages/CompanyProfileHelpPage";
import LeadManagerHelpPage from "./pages/LeadManagerHelpPage";
import OfferHelpPage from "./pages/OfferHelpPage";
import ExhibitorDashboardHelpPage from "./pages/ExhibitorDashboardHelpPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Home */}
          <Route path="/" element={<ExhibitorHub />} />
          
          {/* My show */}
          <Route path="/admin-marketing-operations" element={<AdminMarketingOperationsPage />} />
          <Route path="/edit-company-profile" element={<EditCompanyProfilePage />} />
          <Route path="/product-listing" element={<ProductListingPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/manage-shares" element={<ManageSharesPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/exhibitor-manual" element={<ExhibitorManualPage />} />
          <Route path="/my-team" element={<MyTeamPage />} />
          <Route path="/company-administrators" element={<CompanyAdministratorsPage />} />
          <Route path="/allocate-badges" element={<AllocateBadgesPage />} />
          <Route path="/your-company-badges" element={<YourCompanyBadgesPage />} />
          
          {/* Lead capture */}
          <Route path="/lead-manager-app" element={<LeadManagerAppPage />} />
          <Route path="/create-offer" element={<CreateOfferPage />} />
          <Route path="/invite-customers" element={<InviteCustomersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          
          {/* Exhibitor Dashboard */}
          <Route path="/profile-viewer" element={<ProfileViewerPage />} />
          <Route path="/benchmark-analytics" element={<BenchmarkAnalyticsPage />} />
          
          {/* Help */}
          <Route path="/home-guided-tour" element={<HomeGuidedTourPage />} />
          <Route path="/company-profile-help" element={<CompanyProfileHelpPage />} />
          <Route path="/lead-manager-help" element={<LeadManagerHelpPage />} />
          <Route path="/offer-help" element={<OfferHelpPage />} />
          <Route path="/exhibitor-dashboard-help" element={<ExhibitorDashboardHelpPage />} />
          
          {/* Product edit */}
          <Route path="/product/:productId" element={<ProductEditPage />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
