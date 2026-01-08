import { PageLayout } from '@/components/exhibitor/PageLayout';

export default function ProfileViewer() {
  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Profile Viewer</h1>
        <p className="text-muted-foreground">View analytics on who has viewed your profile.</p>
      </div>
    </PageLayout>
  );
}
