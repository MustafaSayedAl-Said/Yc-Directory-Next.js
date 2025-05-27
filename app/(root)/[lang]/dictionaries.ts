import 'server-only'

type Locale = 'en-US' | 'ja-JP';

const dictionaries = async (locale: Locale): Promise<Record<string, string>> => {
  switch (locale) {
    case 'en-US':
      return (await import('./dictionaries/en.json')).default;
    case 'ja-JP':
      return (await import('./dictionaries/ja.json')).default;
    default:
      throw new Error(`Unknown locale: ${locale}`);
  }
};


export const getDictionary = async (locale: 'en-US' | 'ja-JP') =>
    dictionaries(locale)