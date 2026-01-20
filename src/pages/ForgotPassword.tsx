import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Footer } from '@/components/Footer';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <h1 className="text-3xl font-normal text-foreground mb-2">
          Forgot Password
        </h1>
        <p className="text-sm text-foreground mb-4">
          Please enter your email address and we will send you a link you can use to set a new password.
        </p>

        <div className="space-y-2 mb-4">
          <Label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            className="h-10 border-border"
          />
        </div>

        <div className="flex justify-end">
          <Button className="bg-[#4a90a4] hover:bg-[#3d7a8c] text-white px-4">
            Send
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
