// components/TranslationsProvider.tsx
'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

interface Props {
  locale: string;
  namespaces: string[];
  resources: any;
  children: React.ReactNode;
}

const TranslationsProvider = ({ locale, resources, children }: Props) => {
  const instance = i18n.createInstance();

  instance
    .use(initReactI18next)
    .init({
      lng: locale,
      fallbackLng: 'en',
      ns: ['common'],
      defaultNS: 'common',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
