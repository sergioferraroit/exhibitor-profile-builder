import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-zinc-800 text-white mt-auto">
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
  );
}
