import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

export default function LeadManagerAppPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Lead Manager App</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Mobile App
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Access the Lead Manager mobile application for capturing leads on the go.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
