import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

export default function YourCompanyBadgesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Company Badges</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Company Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">View and manage your company's badges and credentials.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
