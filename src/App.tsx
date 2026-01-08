import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import MyTeam from "./pages/MyTeam";
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
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Home */}
          <Route path="/" element={<ExhibitorHub />} />
          
          {/* My Show */}
          <Route path="/admin-marketing-operations" element={<AdminMarketingOperations />} />
          <Route path="/edit-company-profile" element={<ExhibitorHub />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-shares" element={<ManageShares />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/exhibitor-manual" element={<ExhibitorManual />} />
          <Route path="/my-team" element={<MyTeam />} />
          <Route path="/company-administrators" element={<CompanyAdministrators />} />
          <Route path="/allocate-badges" element={<AllocateBadges />} />
          <Route path="/your-company-badges" element={<YourCompanyBadges />} />
          <Route path="/product/:productId" element={<ProductEditPage />} />
          
          {/* Lead Capture */}
          <Route path="/lead-manager-app" element={<LeadManagerApp />} />
          <Route path="/create-offer" element={<CreateOffer />} />
          <Route path="/invite-customers" element={<InviteCustomers />} />
          
          {/* Analytics */}
          <Route path="/exhibitor-dashboard" element={<ExhibitorDashboard />} />
          <Route path="/profile-viewer" element={<ProfileViewer />} />
          <Route path="/benchmark-analytics" element={<BenchmarkAnalytics />} />
          
          {/* Help */}
          <Route path="/home-guided-tour" element={<HomeGuidedTour />} />
          <Route path="/company-profile-help" element={<CompanyProfileHelp />} />
          <Route path="/lead-manager-help" element={<LeadManagerHelp />} />
          <Route path="/offer-help" element={<OfferHelp />} />
          <Route path="/exhibitor-dashboard-help" element={<ExhibitorDashboardHelp />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
