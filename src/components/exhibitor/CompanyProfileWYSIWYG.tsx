import { ProfileSection, Locale, SectionId, SECTION_IDS, Product, ExhibitorProfile } from '@/types/exhibitor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Edit, 
  Plus, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  Youtube, 
  MessageCircle,
  MapPin,
  Building2,
  Users,
  Calendar,
  Gift,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanyProfileWYSIWYGProps {
  profile: ExhibitorProfile;
  selectedLocale: Locale;
  onEditSection: (sectionId: string) => void;
  onNavigateToProducts: () => void;
}

export function CompanyProfileWYSIWYG({
  profile,
  selectedLocale,
  onEditSection,
  onNavigateToProducts,
}: CompanyProfileWYSIWYGProps) {
  const getSectionValue = (sectionId: string): string | string[] | null => {
    const section = profile.sections.find(s => s.id === sectionId);
    return section?.localeData[selectedLocale]?.value ?? null;
  };

  const getSectionStatus = (sectionId: string) => {
    const section = profile.sections.find(s => s.id === sectionId);
    return section?.localeData[selectedLocale]?.status ?? 'empty';
  };

  const description = getSectionValue(SECTION_IDS.DESCRIPTION) as string | null;
  const whyVisit = getSectionValue(SECTION_IDS.WHY_VISIT) as string | null;
  const website = getSectionValue(SECTION_IDS.WEBSITE) as string | null;
  const email = getSectionValue(SECTION_IDS.EMAIL) as string | null;
  const phone = getSectionValue(SECTION_IDS.PHONE) as string | null;
  const filters = getSectionValue(SECTION_IDS.FILTERS) as string[] | null;
  const matchmaking = getSectionValue(SECTION_IDS.MATCHMAKING) as string[] | null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Cover Image Section */}
        <Card className="overflow-hidden border-2 border-dashed border-border-strong bg-muted/30 group relative">
          <div className="aspect-[4/1] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            {getSectionStatus(SECTION_IDS.COVER_IMAGE) === 'complete' ? (
              <div className="w-full h-full relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onEditSection(SECTION_IDS.COVER_IMAGE)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => onEditSection(SECTION_IDS.COVER_IMAGE)}
              >
                <Plus className="h-4 w-4" />
                Add cover image
              </Button>
            )}
          </div>
        </Card>

        {/* Logo + Company Info Section */}
        <div className="flex items-start gap-4">
          {/* Logo */}
          <Card className="shrink-0 w-24 h-24 border-2 border-dashed border-border-strong bg-muted/30 group relative overflow-hidden">
            {getSectionStatus(SECTION_IDS.LOGO) === 'complete' ? (
              <div className="w-full h-full relative">
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground bg-muted">
                  {profile.companyName.charAt(0)}
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onEditSection(SECTION_IDS.LOGO)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <button
                className="w-full h-full flex flex-col items-center justify-center gap-1 text-muted-foreground hover:bg-muted/50 transition-colors"
                onClick={() => onEditSection(SECTION_IDS.LOGO)}
              >
                <Plus className="h-5 w-5" />
                <span className="text-[10px]">Add logo</span>
              </button>
            )}
          </Card>

          {/* Company Name & Stand */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-foreground truncate">{profile.companyName}</h1>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={() => onEditSection(SECTION_IDS.COMPANY_NAME)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Stand E40</span>
            </div>
            
            {/* Why Visit */}
            <Card className="mt-3 border-2 border-dashed border-border-strong bg-muted/30 group relative">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Why visit our stand</p>
                    {whyVisit ? (
                      <p className="text-sm text-foreground">{whyVisit}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Add a compelling reason for visitors to visit your stand</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditSection(SECTION_IDS.WHY_VISIT)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Company Description */}
        <Card className="border-2 border-dashed border-border-strong bg-muted/30 group relative">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-foreground">Company description</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.DESCRIPTION)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            {description ? (
              <p className="text-sm text-foreground leading-relaxed">{description}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Add a description about your company. Tell visitors what you do and what makes you unique.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Video Section */}
        <Card className="border-2 border-dashed border-border-strong bg-muted/30">
          <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add company video
            </Button>
          </div>
        </Card>

        {/* Brands Section */}
        <Card className="border-2 border-dashed border-border-strong bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Brands</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.BRANDS)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add brand
              </Button>
            </div>
            <p className="text-sm text-muted-foreground italic">
              No brands added yet
            </p>
          </CardContent>
        </Card>

        {/* Filters Section */}
        <Card className="border-2 border-dashed border-border-strong bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Filters</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.FILTERS)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            {filters && filters.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {filters.map((filter, idx) => (
                  <Badge key={idx} variant="secondary">{filter}</Badge>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {['Category 01', 'Category 02', 'Category 03', 'Category 04', 'Category 05'].map((cat) => (
                  <Badge key={cat} variant="outline" className="text-muted-foreground">{cat}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Matchmaking Section */}
        <Card className="border-2 border-dashed border-border-strong bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Matchmaking</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.MATCHMAKING)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            {matchmaking && matchmaking.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchmaking.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">{tag}</Badge>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {['Matchmaking 01', 'Matchmaking 02', 'Matchmaking 03', 'Matchmaking 04', 'Matchmaking 05'].map((tag) => (
                  <Badge key={tag} variant="outline" className="text-muted-foreground">{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sponsored Category Section */}
        {profile.packageType === 'gold' && (
          <Card className="border-2 border-dashed border-border-strong bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Sponsored category</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditSection(SECTION_IDS.SPONSORED_CATEGORY)}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </div>
              <Badge variant="outline" className="text-muted-foreground">Sponsored category 01</Badge>
            </CardContent>
          </Card>
        )}

        {/* Company Documents Section */}
        <Card className="border-2 border-dashed border-border-strong bg-muted/30">
          <CardContent className="p-4">
            <div className="mb-3">
              <h3 className="font-semibold text-foreground mb-1">Company information documents</h3>
              <p className="text-sm text-muted-foreground">
                Exhibitors who share company documents tend to see higher visitor engagement ahead of the show.
              </p>
            </div>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Import from previous event
              </Button>
              <Button variant="default" size="sm" onClick={() => onEditSection(SECTION_IDS.DOCUMENTS)}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add company document
              </Button>
            </div>
            
            {/* Documents Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {profile.companyDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden">
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                    <div className="flex gap-1 mt-2">
                      <Button variant="outline" size="sm" className="h-6 text-xs flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - Right Column */}
      <div className="space-y-6">
        {/* Contact Details */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Contact details</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.WEBSITE)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                {website ? (
                  <a href={website} className="text-primary hover:underline truncate">{website.replace('https://', '')}</a>
                ) : (
                  <span className="text-muted-foreground italic">Add website</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                {email ? (
                  <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
                ) : (
                  <span className="text-muted-foreground italic">Add email</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {phone ? (
                  <span>{phone}</span>
                ) : (
                  <span className="text-muted-foreground italic">Add phone</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">LEGO® Customer Service</span>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Building Communication<br />
                33 Bath Road<br />
                Slough<br />
                SL1 3UF<br />
                United Kingdom
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delegates */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Delegates</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.DELEGATES)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Arjun Mehra', role: 'Senior Manager' },
                { name: 'Priya Nandakumar', role: 'Director of Sales' },
                { name: 'Ravi Kulkarni', role: 'Head of International Marketing' },
              ].map((delegate, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{delegate.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{delegate.role}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-xs">
                <ChevronDown className="h-3 w-3 mr-1" />
                Show all delegates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Offers */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Offers ({1})</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.OFFERS)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add offer
              </Button>
            </div>
            <Card className="bg-warning-subdued border-warning/30">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center shrink-0">
                    <Gift className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Cheval Maison · The Palm</p>
                    <p className="text-sm font-medium">Stay on The Palm Jumeirah from AED 555 per night</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Sessions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">At stand session ({1})</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.SESSIONS)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add session
              </Button>
            </div>
            <Card className="border">
              <CardContent className="p-3">
                <Badge variant="secondary" className="mb-2">Event</Badge>
                <p className="text-sm font-medium mb-1">Discover the Future of Play: Hands-On Demo of LEGO's New Building Blocks at Our Stand!</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>Stand E40</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Wednesday, 24th Sept</span>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Follow us</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.SOCIAL_MEDIA)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Globe, label: 'Facebook' },
                { icon: Twitter, label: 'X (Twitter)' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Youtube, label: 'YouTube' },
                { icon: MessageCircle, label: 'WeChat' },
                { icon: Globe, label: 'Instagram' },
              ].map((social, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <social.icon className="h-4 w-4" />
                  <span>{social.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Company's Privacy Policy</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditSection(SECTION_IDS.PRIVACY_POLICY)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Globe className="h-4 w-4" />
              <a href="#" className="hover:underline truncate">https://www.lego.com/en-gb/legal/notices-and...</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
