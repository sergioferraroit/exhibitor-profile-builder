import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Home } from 'lucide-react';

export default function HomeGuidedTourPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Home Page Guided Tour</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Welcome Tour
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Take a guided tour of the home page to learn about all the features available to you.</p>
            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Start Tour
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
