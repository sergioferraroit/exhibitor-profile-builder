import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog } from 'lucide-react';

export default function CompanyAdministratorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Company Administrators</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Administrators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage company administrators and their permissions.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
