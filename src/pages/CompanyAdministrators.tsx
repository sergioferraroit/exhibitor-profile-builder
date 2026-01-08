import { PageLayout } from '@/components/exhibitor/PageLayout';

export default function CompanyAdministrators() {
  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Company Administrators</h1>
        <p className="text-muted-foreground">Manage company administrator accounts and permissions.</p>
      </div>
    </PageLayout>
  );
}
