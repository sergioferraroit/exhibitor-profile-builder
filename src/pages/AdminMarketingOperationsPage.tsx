import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, TrendingUp, Cog } from 'lucide-react';

export default function AdminMarketingOperationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin, Marketing & Operations</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage administrative settings and configurations.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Marketing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Access marketing tools and campaigns.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monitor and manage operational tasks.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
