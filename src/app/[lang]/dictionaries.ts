import 'server-only'
 
const dictionaries = {
  en: () => import('../../../locale/en.json').then((module) => module.default),
  pl: () => import('../../../locale/pl.json').then((module) => module.default),
};
const getDictionary = async (locale: 'en' | 'pl') =>
  dictionaries[locale]()