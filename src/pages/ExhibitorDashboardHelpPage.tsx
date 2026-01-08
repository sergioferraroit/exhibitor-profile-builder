import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, HelpCircle } from 'lucide-react';

export default function ExhibitorDashboardHelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Exhibitor Dashboard Help</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Learn how to navigate and use the Exhibitor Dashboard to track your performance.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
