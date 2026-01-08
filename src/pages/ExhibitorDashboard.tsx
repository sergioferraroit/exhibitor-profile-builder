import { PageLayout } from '@/components/exhibitor/PageLayout';

export default function ExhibitorDashboard() {
  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Exhibitor Dashboard</h1>
        <p className="text-muted-foreground">View your exhibitor performance metrics and insights.</p>
      </div>
    </PageLayout>
  );
}
