import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Exhibitor Shop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Browse and purchase exhibitor services and add-ons.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
