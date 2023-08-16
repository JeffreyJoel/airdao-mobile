type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  English: require('../locales/English.json'),
  Turkish: require('../locales/Turkish.json')
};

export const translate = (key: string, locale: string): string => {
  if (translations[locale] && translations[locale][key]) {
    return translations[locale][key];
  }
  return translations.en[key] || key;
};