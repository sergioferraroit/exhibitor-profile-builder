import { PageLayout } from '@/components/exhibitor/PageLayout';

export default function ProductListing() {
  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Product Listing</h1>
        <p className="text-muted-foreground">View and manage your product listings.</p>
      </div>
    </PageLayout>
  );
}
