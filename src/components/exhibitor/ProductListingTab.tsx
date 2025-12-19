import { useState } from 'react';
import { Product, Locale } from '@/types/exhibitor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Upload, 
  Grid3X3, 
  List, 
  GripVertical, 
  Edit, 
  Trash2,
  TrendingUp,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ProductListingTabProps {
  products: Product[];
  selectedLocale: Locale;
  onAddProduct: (product: Omit<Product, 'id'>) => string;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
  onReorderProducts: (productIds: string[]) => void;
  onToggleNotRelevant: () => void;
  isNotRelevant: boolean;
}

export function ProductListingTab({
  products,
  selectedLocale,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onReorderProducts,
  onToggleNotRelevant,
  isNotRelevant,
}: ProductListingTabProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const publishedProducts = products.filter(p => p.status === 'published');
  const draftProducts = products.filter(p => p.status === 'draft');

  const handleAddProduct = () => {
    navigate('/product/new');
  };

  const handleEditProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="space-y-6">
      {/* Engagement Stats */}
      {products.length === 0 && !isNotRelevant && (
        <Card className="bg-info/5 border-info/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-info" />
              <div>
                <p className="font-medium text-foreground">
                  Exhibitors with products get 30-40% more visitor engagement
                </p>
                <p className="text-sm text-muted-foreground">
                  Showcase your products and services to attract more visitors to your stand.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button onClick={handleAddProduct} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import from Last Event
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mark as not relevant (only when empty) */}
      {products.length === 0 && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="products-not-relevant"
            checked={isNotRelevant}
            onCheckedChange={onToggleNotRelevant}
          />
          <label
            htmlFor="products-not-relevant"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Products are not relevant for my company (exclude from completion score)
          </label>
        </div>
      )}

      {isNotRelevant ? (
        <Card className="opacity-60">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Products section marked as not relevant
            </p>
            <Button variant="link" onClick={onToggleNotRelevant} className="mt-2">
              Enable products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Published Products */}
          {publishedProducts.length > 0 && (
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Published ({publishedProducts.length})
              </h3>
              <div className={cn(
                viewMode === 'grid' 
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" 
                  : "space-y-3"
              )}>
                {publishedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selectedLocale={selectedLocale}
                    viewMode={viewMode}
                    onEdit={() => handleEditProduct(product.id)}
                    onDelete={() => onDeleteProduct(product.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Draft Products */}
          {draftProducts.length > 0 && (
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Drafts ({draftProducts.length})
              </h3>
              <div className={cn(
                viewMode === 'grid' 
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" 
                  : "space-y-3"
              )}>
                {draftProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selectedLocale={selectedLocale}
                    viewMode={viewMode}
                    onEdit={() => handleEditProduct(product.id)}
                    onDelete={() => onDeleteProduct(product.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {products.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-foreground mb-2">No products yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your first product to showcase on your exhibitor profile.
                </p>
                <Button onClick={handleAddProduct} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  selectedLocale: Locale;
  viewMode: 'grid' | 'list';
  onEdit: () => void;
  onDelete: () => void;
}

function ProductCard({ product, selectedLocale, viewMode, onEdit, onDelete }: ProductCardProps) {
  const name = product.localeData[selectedLocale]?.name || product.name;
  const description = product.localeData[selectedLocale]?.description || product.description;

  if (viewMode === 'list') {
    return (
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center gap-4">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              {product.images[0] ? (
                <img src={product.images[0]} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground truncate">{name}</h4>
                <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                  {product.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted relative">
        {product.images[0] ? (
          <img src={product.images[0]} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
            {product.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h4 className="font-medium text-foreground truncate mb-1">{name}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Image className="h-3 w-3" />
            {product.images.length} photos
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
