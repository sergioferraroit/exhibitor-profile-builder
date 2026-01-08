import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, HelpCircle } from 'lucide-react';

export default function CompanyProfileHelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Company Profile Help</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Profile Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Learn how to set up and optimize your company profile for maximum visibility.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
