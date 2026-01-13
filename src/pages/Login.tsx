import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          toast({
            title: 'Sign up failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Account created',
            description: 'You can now sign in with your credentials',
          });
          setIsSignUp(false);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Login failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          navigate(from, { replace: true });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

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
              {isSignUp ? 'Create Account' : 'THE LONDON BOOK FAIR'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Username (email)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Username"
                  className="h-10 border-border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  {isSignUp ? 'Create Password' : 'Enter Password'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="h-10 border-border"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button 
                  type="submit" 
                  className="bg-slate-700 hover:bg-slate-800 text-white px-4"
                  disabled={isLoading}
                >
                  {isLoading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Login')}
                </Button>
                {!isSignUp && (
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password
                  </Link>
                )}
              </div>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-blue-600 hover:underline"
                disabled={isLoading}
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
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
