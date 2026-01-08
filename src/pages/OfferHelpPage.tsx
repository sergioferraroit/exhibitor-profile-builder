import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, HelpCircle } from 'lucide-react';

export default function OfferHelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Offer Help</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Creating Offers Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Learn how to create compelling offers that attract visitors to your booth.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
