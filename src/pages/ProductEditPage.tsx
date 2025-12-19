import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAISimulation } from '@/hooks/useAISimulation';
import { ArrowLeft, Upload, Sparkles, Loader2, Globe, Plus, X } from 'lucide-react';
import { Locale } from '@/types/exhibitor';

const LOCALE_LABELS: Record<Locale, string> = {
  'en-GB': 'English (UK)',
  'fr-FR': 'Français',
  'ja-JP': '日本語',
};

const ProductEditPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isNew = productId === 'new';
  
  const [selectedLocale, setSelectedLocale] = useState<Locale>('en-GB');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  
  const { generateContent, isLoading, typewriterText, isTyping } = useAISimulation();

  const handleAIName = async () => {
    const result = await generateContent('product-name', true);
    if (typeof result === 'string') setName(result);
  };

  const handleAIDescription = async () => {
    const result = await generateContent('product-description', true);
    if (typeof result === 'string') setDescription(result);
  };

  const handleAICategories = async () => {
    const result = await generateContent('product-categories', false);
    if (Array.isArray(result)) setCategories(result);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-xl font-bold">{isNew ? 'Add Product' : 'Edit Product'}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={selectedLocale} onValueChange={(v) => setSelectedLocale(v as Locale)} className="mb-6">
          <TabsList>
            {(['en-GB', 'fr-FR', 'ja-JP'] as Locale[]).map((locale) => (
              <TabsTrigger key={locale} value={locale} className="gap-2">
                <Globe className="h-3 w-3" />
                {LOCALE_LABELS[locale]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

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
                <Label>Product Categories</Label>
                <Button variant="ghost" size="sm" onClick={handleAICategories} disabled={isLoading('product-categories')} className="gap-2 text-primary">
                  {isLoading('product-categories') ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Use AI
                </Button>
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
              <div className="flex items-center justify-between mb-2">
                <Label>Product Name</Label>
                <Button variant="ghost" size="sm" onClick={handleAIName} disabled={isLoading('product-name')} className="gap-2 text-primary">
                  {isLoading('product-name') ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Use AI
                </Button>
              </div>
              <Input value={isTyping ? typewriterText : name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name..." disabled={isTyping} />
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Label>Product Description</Label>
                <Button variant="ghost" size="sm" onClick={handleAIDescription} disabled={isLoading('product-description')} className="gap-2 text-primary">
                  {isLoading('product-description') ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Use AI
                </Button>
              </div>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your product..." rows={4} />
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardContent className="p-6">
              <Label className="mb-4 block">Product Documents</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Upload brochures, case studies, etc.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
          <Button variant="secondary">Save as Draft</Button>
          <Button>Publish Product</Button>
        </div>
      </main>
    </div>
  );
};

export default ProductEditPage;
