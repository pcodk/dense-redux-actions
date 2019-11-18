import I18n from 'i18n-js';

// Locales.
import { en, languageTag as enLanguageTag } from './en';

I18n.locale = enLanguageTag;
I18n.translations = { en };
I18n.locale = enLanguageTag;

export function strings(name: string, params = {}) {
  return I18n.t(name, params);
}
