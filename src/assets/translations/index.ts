import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import pl from './pl_PL';

const resources = {
  pl,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pl',
  fallbackLng: 'dev',
});

export default i18n;
