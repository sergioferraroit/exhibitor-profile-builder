import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ExhibitorProfile, Locale, SECTION_IDS } from '@/types/exhibitor';
import { 
  X, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Building2, 
  Users, 
  FileText,
  Calendar,
  Gift,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Video
} from 'lucide-react';

interface PublicProfilePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ExhibitorProfile;
  selectedLocale: Locale;
}

export function PublicProfilePreview({ 
  isOpen, 
  onClose, 
  profile, 
  selectedLocale 
}: PublicProfilePreviewProps) {
  const getSectionValue = (sectionId: string): string | string[] | null => {
    const section = profile.sections.find(s => s.id === sectionId);
    if (!section || section.isNotRelevant) return null;
    return section.localeData[selectedLocale]?.value ?? null;
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[80vw] max-w-[80vw] h-[90vh] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">Public Profile Preview</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-foreground-secondary">
            This is how your profile appears to visitors on the show website.
          </p>
        </DialogHeader>

        {/* Preview Content - Mirrors WYSIWYG layout without edit controls */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cover Image Section */}
              <Card className="overflow-hidden">
                <div className="aspect-[4/1] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {getSectionStatus(SECTION_IDS.COVER_IMAGE) === 'complete' ? (
                    <img 
                      src="/placeholder.svg" 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm">No cover image</div>
                  )}
                </div>
              </Card>

              {/* Logo + Company Info Section */}
              <div className="flex items-start gap-4">
                {/* Logo */}
                <Card className="shrink-0 w-24 h-24 overflow-hidden">
                  {getSectionStatus(SECTION_IDS.LOGO) === 'complete' ? (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground bg-muted">
                      {profile.companyName.charAt(0)}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </Card>

                {/* Company Name & Stand */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-foreground truncate mb-1">{profile.companyName}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Stand E40</span>
                  </div>
                  
                  {/* Why Visit */}
                  {whyVisit && (
                    <Card className="mt-3">
                      <CardContent className="p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Why visit our stand</p>
                        <p className="text-sm text-foreground">{whyVisit}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Company Description */}
              {description && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">Company description</h3>
                    <p className="text-sm text-foreground leading-relaxed">{description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Video Section */}
              <Card>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
              </Card>

              {/* Brands Section */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Brands</h3>
                  <p className="text-sm text-muted-foreground italic">No brands added yet</p>
                </CardContent>
              </Card>

              {/* Filters Section */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Filters</h3>
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
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Matchmaking</h3>
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
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-3">Sponsored category</h3>
                    <Badge variant="outline" className="text-muted-foreground">Sponsored category 01</Badge>
                  </CardContent>
                </Card>
              )}

              {/* Company Documents Section */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Company information documents</h3>
                  {profile.companyDocuments.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {profile.companyDocuments.map((doc) => (
                        <Card key={doc.id} className="overflow-hidden">
                          <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <CardContent className="p-2">
                            <p className="text-xs font-medium truncate">{doc.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No documents uploaded</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Contact details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      {website ? (
                        <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                          {website.replace('https://', '')}
                        </a>
                      ) : (
                        <span className="text-muted-foreground italic">No website</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      {email ? (
                        <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
                      ) : (
                        <span className="text-muted-foreground italic">No email</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {phone ? (
                        <span>{phone}</span>
                      ) : (
                        <span className="text-muted-foreground italic">No phone</span>
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
                  <h3 className="font-semibold text-foreground mb-3">Delegates</h3>
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
                  </div>
                </CardContent>
              </Card>

              {/* Offers */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Offers (1)</h3>
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
                  <h3 className="font-semibold text-foreground mb-3">At stand session (1)</h3>
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
                  <h3 className="font-semibold text-foreground mb-3">Follow us</h3>
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
                  <h3 className="font-semibold text-foreground mb-2">Company's Privacy Policy</h3>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Globe className="h-4 w-4" />
                    <a href="#" className="hover:underline truncate">https://www.lego.com/en-gb/legal/notices-and...</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}