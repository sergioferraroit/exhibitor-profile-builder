import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Login() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center pt-16 px-4 pb-16">
        <div className="w-full max-w-xl border border-border rounded-md overflow-hidden h-fit">
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
                  {t('login.usernameEmail')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.username')}
                  className="h-10 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  {t('login.enterPassword')}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('login.password')}
                  className="h-10 border-border"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button asChild className="bg-slate-700 hover:bg-slate-800 text-white px-4">
                  <Link to="/">{t('login.login')}</Link>
                </Button>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {t('login.forgotPassword')}
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
            <a href="#" className="hover:underline">{t('footer.cookiePolicy')}</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">{t('footer.rxGlobalPrivacyPolicy')}</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">{t('footer.yourPrivacyChoices')}</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">{t('login.termsConditions')}</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">{t('login.accessibility')}</a>
            <span className="text-zinc-500">|</span>
            <a href="#" className="hover:underline">{t('login.cookieSettings')}</a>
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
