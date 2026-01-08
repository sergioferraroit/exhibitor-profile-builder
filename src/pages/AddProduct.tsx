import { PageLayout } from '@/components/exhibitor/PageLayout';

export default function AddProduct() {
  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Add Product or Service</h1>
        <p className="text-muted-foreground">Add a new product or service to your listing.</p>
      </div>
    </PageLayout>
  );
}
