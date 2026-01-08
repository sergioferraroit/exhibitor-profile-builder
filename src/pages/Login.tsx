import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex justify-center pt-16 px-4">
        <div className="w-full max-w-xl border border-border rounded-md overflow-hidden">
          {/* Header with show branding */}
          <div className="bg-muted/50 py-4 px-6 text-center border-b-4 border-amber-500">
            <h1 className="text-xl font-bold text-foreground tracking-wide">
              THE LONDON BOOK FAIR
            </h1>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <h2 className="text-sm font-semibold text-foreground text-center mb-4">
              THE LONDON BOOK FAIR
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Username (email)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Username"
                  className="h-10 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  Enter Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="h-10 border-border"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button asChild className="bg-slate-700 hover:bg-slate-800 text-white px-4">
                  <Link to="/">Login</Link>
                </Button>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <p className="text-lg font-bold mb-3">The London Book Fair</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href="#" className="hover:underline">Cookie Policy</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">RX Privacy Policy</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">Your Privacy Choices</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">Terms & Conditions of Use</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">Accessibility</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">Cookie Settings</a>
          </div>
        </div>
        <div className="bg-zinc-900 py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="text-sm text-zinc-400">
              <p>© 2026 Reed Exhibitions Limited ("RX").</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
