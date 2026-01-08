import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2 } from 'lucide-react';

export default function ManageSharesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Manage Shares</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Shared Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage your shared content and permissions here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
