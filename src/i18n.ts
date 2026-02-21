import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        dashboard: {
          title: 'Title',
          titleHint: 'Please , provide a title for your content',
          description: 'Description',
          descriptionPlaceholder:
            'Write about React js form validation. Provide real life examples',
          descriptionHint: 'Please, provide a description for your conntent',
          generate: 'Generate',
          profile: 'Profile',
          logout: 'Logout',
          menuLabel: 'My account',
        },
      },
      uz: {
        dashboard: {
          title: 'Sarlavha',
          titleHint: 'Iltimos , kontent uchun sarlavha kiriting',
          description: 'Tavsif',
          descriptionPlaceholder:
            'React js form validatsiyasi haqida yozing. Amaliy misollar taqdim eting',
          descriptionHint: 'Iltimos, kontent tavsifini yozing',
          generate: 'Yaratish',
          profile: 'Sahifa',
          logout: 'Chiqish',
          menuLabel: 'Mening sahifam',
        },
      },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
