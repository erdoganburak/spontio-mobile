import * as RNLocalize from "react-native-localize";
import { I18nManager } from "react-native";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance.
import StorageManager from "./storage.manager";
import { LocalStorageKey } from "../enums/localStorageKey.enum";

const translationGetters = {
  // Lazy requires. (Metro bundler does not support symlinks)
  de: () => require("../translations/de.json"),
  en: () => require("../translations/en.json")
};

/**
 * Translates given word or sentence.
 */
export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

/**
 * Manages language events.
 */
export class LanguageManagerInstance {

  /**
  * Sets i18n config.
  */
  public async setI18nConfig() {

    let selectedLanguage = await StorageManager.getItem(LocalStorageKey.Language);
    // Fallback if no available language fits.
    const fallback = { languageTag: "en", isRTL: false };

    let { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

    // Clear translation cache.
    translate.cache.clear();

    // Update layout direction.
    I18nManager.forceRTL(isRTL);

    // Set i18n-js config.
    if (selectedLanguage != null) {
      languageTag = selectedLanguage;
    }

    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;

  }

}

const LanguageManager = new LanguageManagerInstance();
export default LanguageManager;
