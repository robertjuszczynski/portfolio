import React from 'react';

const dictionaries = {
  en: () => import('../../locale/en.json').then((module) => module.default),
  pl: () => import('../../locale/pl.json').then((module) => module.default),
};

const getDictionary = async (locale: 'en' | 'pl') => dictionaries[locale]();

const useTranslate = () => {
  const lang = window.location.pathname.split('/')[1] || 'en';
  const [dictionary, setDictionary] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang as 'en' | 'pl');
        const flatten = (obj: any, prefix = ''): Record<string, string> =>
          Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? `${prefix}.${k}` : k;
            if (typeof obj[k] === 'object' && obj[k] !== null) {
              Object.assign(acc, flatten(obj[k], pre));
            } else {
              acc[pre] = obj[k];
            }
            return acc;
          }, {} as Record<string, string>);
        setDictionary(flatten(dict));
      } catch (error) {
        console.error(`Failed to load dictionary for language: ${lang}`, error);
      }
    };
    loadDictionary();
  }, []);

  function t(key: string): string {
    return dictionary[key] || key;
  }

  return { t, lang };
};

export default useTranslate;