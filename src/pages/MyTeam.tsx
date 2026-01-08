import { PageLayout } from '@/components/exhibitor/PageLayout';

export default function MyTeam() {
  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">My Team</h1>
        <p className="text-muted-foreground">Manage your team members and their roles.</p>
      </div>
    </PageLayout>
  );
}
