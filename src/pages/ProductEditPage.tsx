import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAISimulation } from '@/hooks/useAISimulation';
import { useExhibitorProfile } from '@/hooks/useExhibitorProfile';
import { DocumentUploadModal } from '@/components/exhibitor/DocumentUploadModal';
import { ArrowLeft, Upload, Sparkles, Loader2, Globe, Plus, X, FileText, Undo2 } from 'lucide-react';
import { Locale, ProductDocument, CompanyDocument } from '@/types/exhibitor';

const LOCALE_LABELS: Record<Locale, string> = {
  'en-GB': 'English (UK)',
  'fr-FR': 'Français',
  'ja-JP': '日本語',
};

const CATEGORY_LABELS: Record<string, string> = {
  'brochure': 'Brochure',
  'case-study': 'Case Study',
  'white-paper': 'White Paper',
  'press-release': 'Press Release',
  'other': 'Other',
};

interface AvailableDocument {
  id: string;
  name: string;
  fileName: string;
  category: string;
  source: 'company' | 'product';
  sourceProductName?: string;
}

const ProductEditPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isNew = productId === 'new';
  const { profile } = useExhibitorProfile();
  
  const [nameLocale, setNameLocale] = useState<Locale>('en-GB');
  const [descriptionLocale, setDescriptionLocale] = useState<Locale>('en-GB');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [linkedDocumentIds, setLinkedDocumentIds] = useState<string[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<CompanyDocument[]>([]);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  // Undo AI state
  const [previousName, setPreviousName] = useState<string | null>(null);
  const [previousDescription, setPreviousDescription] = useState<string | null>(null);
  const [previousCategories, setPreviousCategories] = useState<string[] | null>(null);
  
  const { generateContent, isLoading, typewriterText, isTyping } = useAISimulation();

  // Gather all available documents from company profile and other products
  const availableDocuments = useMemo((): AvailableDocument[] => {
    const docs: AvailableDocument[] = [];
    
    // Add company documents
    profile.companyDocuments.forEach(doc => {
      docs.push({
        id: doc.id,
        name: doc.name,
        fileName: doc.fileName,
        category: doc.category,
        source: 'company',
      });
    });
    
    // Add documents from other products
    profile.products.forEach(product => {
      if (product.id !== productId) {
        product.documents.forEach(doc => {
          // Avoid duplicates by checking if document already exists
          if (!docs.some(d => d.id === doc.id)) {
            docs.push({
              id: doc.id,
              name: doc.name,
              fileName: `${doc.name}.pdf`,
              category: doc.type,
              source: 'product',
              sourceProductName: product.name,
            });
          }
        });
      }
    });
    
    return docs;
  }, [profile, productId]);

  const toggleDocument = (docId: string) => {
    setLinkedDocumentIds(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleAIName = async () => {
    setPreviousName(name);
    const result = await generateContent('product-name', true);
    if (typeof result === 'string') setName(result);
  };

  const handleUndoName = () => {
    if (previousName !== null) {
      setName(previousName);
      setPreviousName(null);
    }
  };

  const handleAIDescription = async () => {
    setPreviousDescription(description);
    const result = await generateContent('product-description', true);
    if (typeof result === 'string') setDescription(result);
  };

  const handleUndoDescription = () => {
    if (previousDescription !== null) {
      setDescription(previousDescription);
      setPreviousDescription(null);
    }
  };

  const handleAICategories = async () => {
    setPreviousCategories([...categories]);
    const result = await generateContent('product-categories', false);
    if (Array.isArray(result)) setCategories(result);
  };

  const handleUndoCategories = () => {
    if (previousCategories !== null) {
      setCategories(previousCategories);
      setPreviousCategories(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-xl font-bold">{isNew ? 'Add Product' : 'Edit Product'}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6">
        <div className="space-y-6">
          {/* Images */}
          <Card>
            <CardContent className="p-6">
              <Label className="mb-4 block">Photos & Videos (up to 4 photos + 1 video)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/50">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Label>Product Categories Sergio Test</Label>
                {previousCategories !== null ? (
                  <Button variant="ghost" size="sm" onClick={handleUndoCategories} className="gap-2 text-amber-600">
                    <Undo2 className="h-4 w-4" />
                    Undo AI
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleAICategories} disabled={isLoading('product-categories')} className="gap-2 text-primary">
                    {isLoading('product-categories') ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Use AI
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {categories.map((cat, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                    {cat}
                    <button onClick={() => setCategories(categories.filter((_, idx) => idx !== i))}><X className="h-3 w-3" /></button>
                  </span>
                ))}
                <button className="px-3 py-1 border border-dashed rounded-full text-sm text-muted-foreground hover:bg-muted flex items-center gap-1">
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Name */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Label>Product Name</Label>
                {previousName !== null ? (
                  <Button variant="ghost" size="sm" onClick={handleUndoName} className="gap-2 text-amber-600">
                    <Undo2 className="h-4 w-4" />
                    Undo AI
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleAIName} disabled={isLoading('product-name')} className="gap-2 text-primary">
                    {isLoading('product-name') ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Use AI
                  </Button>
                )}
              </div>
              <Tabs value={nameLocale} onValueChange={(v) => setNameLocale(v as Locale)} className="mb-3">
                <TabsList className="h-8">
                  {(['en-GB', 'fr-FR', 'ja-JP'] as Locale[]).map((locale) => (
                    <TabsTrigger key={locale} value={locale} className="gap-1.5 text-xs px-2.5 h-6">
                      <Globe className="h-3 w-3" />
                      {LOCALE_LABELS[locale]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <Input value={isTyping ? typewriterText : name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name..." disabled={isTyping} />
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Label>Product Description</Label>
                {previousDescription !== null ? (
                  <Button variant="ghost" size="sm" onClick={handleUndoDescription} className="gap-2 text-amber-600">
                    <Undo2 className="h-4 w-4" />
                    Undo AI
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleAIDescription} disabled={isLoading('product-description')} className="gap-2 text-primary">
                    {isLoading('product-description') ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Use AI
                  </Button>
                )}
              </div>
              <Tabs value={descriptionLocale} onValueChange={(v) => setDescriptionLocale(v as Locale)} className="mb-3">
                <TabsList className="h-8">
                  {(['en-GB', 'fr-FR', 'ja-JP'] as Locale[]).map((locale) => (
                    <TabsTrigger key={locale} value={locale} className="gap-1.5 text-xs px-2.5 h-6">
                      <Globe className="h-3 w-3" />
                      {LOCALE_LABELS[locale]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your product..." rows={4} />
            </CardContent>
          </Card>

          {/* Documents - Upload new */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Label>Upload New Documents</Label>
                {uploadedDocuments.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {uploadedDocuments.length} document{uploadedDocuments.length !== 1 ? 's' : ''} uploaded
                  </span>
                )}
              </div>
              
              {uploadedDocuments.length > 0 && (
                <div className="space-y-2 mb-4">
                  {uploadedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium truncate flex-1">{doc.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {CATEGORY_LABELS[doc.category] || doc.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setIsDocumentModalOpen(true)}
              >
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {uploadedDocuments.length > 0 ? 'Add more documents' : 'Upload brochures, case studies, etc.'}
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Documents
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Link Existing Documents */}
          <Card>
            <CardContent className="p-6">
              <Label className="mb-2 block">Link Existing Documents</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Select documents from your company profile or other products to link to this product.
              </p>
              
              {availableDocuments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No documents available to link.</p>
                  <p className="text-xs">Upload documents to your company profile first.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {availableDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${
                        linkedDocumentIds.includes(doc.id) ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => toggleDocument(doc.id)}
                    >
                      <Checkbox
                        checked={linkedDocumentIds.includes(doc.id)}
                        onCheckedChange={() => toggleDocument(doc.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="font-medium text-sm truncate">{doc.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {CATEGORY_LABELS[doc.category] || doc.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {doc.source === 'company' ? 'Company Profile' : `From: ${doc.sourceProductName}`}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{doc.fileName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {linkedDocumentIds.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{linkedDocumentIds.length}</span> document{linkedDocumentIds.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
          <Button variant="secondary">Save as Draft</Button>
          <Button>Publish Product</Button>
        </div>
      </main>

      <DocumentUploadModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        documents={uploadedDocuments}
        onSave={setUploadedDocuments}
        title="Upload Product Documents"
      />
    </div>
  );
};

export default ProductEditPage;
