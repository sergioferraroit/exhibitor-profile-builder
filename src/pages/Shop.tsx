import { PageLayout } from '@/components/exhibitor/PageLayout';

export default function Shop() {
  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Shop</h1>
        <p className="text-muted-foreground">Browse and purchase exhibitor services and upgrades.</p>
      </div>
    </PageLayout>
  );
}
