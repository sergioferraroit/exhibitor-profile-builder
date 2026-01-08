import { MainNav } from '@/components/exhibitor/MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react';

export default function AllocateBadgesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Allocate Badges</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5" />
              Badge Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Allocate and manage badges for your team members.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
