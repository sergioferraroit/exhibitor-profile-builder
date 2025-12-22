import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExhibitorProfile, Locale, Product } from '@/types/exhibitor';
import { 
  X, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Building2, 
  Users, 
  Award,
  FileText,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface PublicProfilePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ExhibitorProfile;
  selectedLocale: Locale;
}

function ProductCarousel({ product, locale }: { product: Product; locale: Locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.images || [];
  const hasMultiple = images.length > 1;

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <div className="relative aspect-[4/3] bg-muted">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentIndex]}
              alt={product.localeData[locale]?.name || product.name || 'Product'}
              className="w-full h-full object-cover"
            />
            {product.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center">
                  <Play className="h-5 w-5 text-foreground" />
                </div>
              </div>
            )}
            {hasMultiple && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex gap-1 mb-2">
          {product.categories?.slice(0, 2).map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>
        <h4 className="font-semibold text-foreground line-clamp-1">
          {product.localeData[locale]?.name || product.name || 'Untitled Product'}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {product.localeData[locale]?.description || product.description || 'No description'}
        </p>
      </div>
    </div>
  );
}

export function PublicProfilePreview({ 
  isOpen, 
  onClose, 
  profile, 
  selectedLocale 
}: PublicProfilePreviewProps) {
  const getLocalizedValue = (sectionId: string): string | null => {
    const section = profile.sections.find(s => s.id === sectionId);
    if (!section || section.isNotRelevant) return null;
    const value = section.localeData[selectedLocale]?.value;
    if (Array.isArray(value)) return value.join(', ');
    return value || null;
  };

  const companyName = profile.companyName;
  const tagline = getLocalizedValue('tagline');
  const description = getLocalizedValue('description');
  const website = getLocalizedValue('website');
  const address = getLocalizedValue('address');
  const email = getLocalizedValue('email');
  const phone = getLocalizedValue('phone');
  const tradeAffiliations = getLocalizedValue('tradeAffiliations');
  const accreditations = getLocalizedValue('accreditations');
  const awards = getLocalizedValue('awards');
  const teamSize = getLocalizedValue('teamSize');
  
  const logoSection = profile.sections.find(s => s.id === 'logo');
  const logoUrl = logoSection?.localeData[selectedLocale]?.value as string | undefined;
  
  const bannerSection = profile.sections.find(s => s.id === 'heroBanner' || s.id === 'cover-image');
  const bannerUrl = bannerSection?.localeData[selectedLocale]?.value as string | undefined;

  const availableProducts = profile.products.filter(p => 
    p.localeData[selectedLocale]?.name || p.name
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl xl:max-w-[calc(100vw-120px)] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">Public Profile Preview</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            This is how your profile appears to visitors on the show website.
          </p>
        </DialogHeader>

        {/* Preview Content - Mimics public show page */}
        <div className="bg-muted/30">
          {/* Hero Banner */}
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary/5">
            {bannerUrl && (
              <img 
                src={bannerUrl} 
                alt="Company banner" 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          {/* Company Info Section */}
          <div className="container mx-auto -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Logo */}
              <div className="w-32 h-32 rounded-xl bg-card border-4 border-background shadow-lg overflow-hidden flex-shrink-0">
                {logoUrl ? (
                  <img src={logoUrl} alt={companyName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Building2 className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Company Details */}
              <div className="flex-1 pt-4 md:pt-8">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{companyName}</h1>
                {tagline && (
                  <p className="text-lg text-muted-foreground mt-1">{tagline}</p>
                )}
                
                {/* Quick Info Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {website && (
                    <Badge variant="outline" className="gap-1">
                      <Globe className="h-3 w-3" />
                      Website
                    </Badge>
                  )}
                  {address && (
                    <Badge variant="outline" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {address}
                    </Badge>
                  )}
                  {teamSize && (
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      {teamSize} employees
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* About */}
                {description && (
                  <div className="bg-card rounded-xl p-6 border">
                    <h2 className="text-lg font-semibold text-foreground mb-3">About Us</h2>
                    <p className="text-muted-foreground whitespace-pre-wrap">{description}</p>
                  </div>
                )}

                {/* Products */}
                {availableProducts.length > 0 && (
                  <div className="bg-card rounded-xl p-6 border">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                      Products & Services ({availableProducts.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {availableProducts.slice(0, 4).map((product) => (
                        <ProductCarousel key={product.id} product={product} locale={selectedLocale} />
                      ))}
                    </div>
                    {availableProducts.length > 4 && (
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        +{availableProducts.length - 4} more products
                      </p>
                    )}
                  </div>
                )}

                {/* Awards & Accreditations */}
                {(awards || accreditations) && (
                  <div className="bg-card rounded-xl p-6 border">
                    <h2 className="text-lg font-semibold text-foreground mb-3">Recognition</h2>
                    <div className="space-y-4">
                      {awards && (
                        <div className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Awards</p>
                            <p className="text-sm text-muted-foreground">{awards}</p>
                          </div>
                        </div>
                      )}
                      {accreditations && (
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Accreditations</p>
                            <p className="text-sm text-muted-foreground">{accreditations}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Contact & Details */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-card rounded-xl p-6 border">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Contact</h2>
                  <div className="space-y-3">
                    {website && (
                      <a 
                        href={website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-primary hover:underline"
                      >
                        <Globe className="h-4 w-4" />
                        {website}
                      </a>
                    )}
                    {email && (
                      <a 
                        href={`mailto:${email}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="h-4 w-4" />
                        {email}
                      </a>
                    )}
                    {phone && (
                      <a 
                        href={`tel:${phone}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Phone className="h-4 w-4" />
                        {phone}
                      </a>
                    )}
                    {address && (
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5" />
                        <span>{address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trade Affiliations */}
                {tradeAffiliations && (
                  <div className="bg-card rounded-xl p-6 border">
                    <h2 className="text-lg font-semibold text-foreground mb-3">Trade Affiliations</h2>
                    <p className="text-sm text-muted-foreground">{tradeAffiliations}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
