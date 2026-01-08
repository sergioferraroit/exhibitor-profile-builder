import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';

export default function ProfileViewerPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Profile Viewer</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              View Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Track who has viewed your company profile.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
