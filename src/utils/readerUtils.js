// src/utils/readerUtils.js

/**
 * Resolves the font family for a given content type and display language.
 * Fallback order:
 * 1. fonts[language][type]
 * 2. fonts.default[type]
 * 3. undefined
 *
 * @param {object} fonts - The fonts configuration object from JSON schema.
 * @param {string} language - Current selected language code (e.g. 'kn', 'en').
 * @param {string} type - Content type ('subheading' or 'paragraph').
 * @returns {string|undefined} Font family string or undefined.
 */
export const getFontForLanguage = (fonts, language, type = 'paragraph') => {
  if (!fonts) return undefined;
  if (language && fonts[language] && fonts[language][type]) {
    return fonts[language][type];
  }
  if (fonts.default && fonts.default[type]) {
    return fonts.default[type];
  }
  return undefined;
};

/**
 * Resolves effective audio URL and timestamps for a paragraph.
 * If paragraph audio object specifies url (even if null), it should NOT fall back to global audio URL.
 *
 * @param {object} globalAudio - Root audio object from JSON schema.
 * @param {object} paragraphAudio - Paragraph audio object.
 * @returns {object} { url, start, end, paragraphHasOwnAudio }
 */
export const resolveAudioData = (globalAudio, paragraphAudio) => {
  const paragraphUrl = paragraphAudio?.url;
  const globalUrl = globalAudio?.url;

  // Use paragraphUrl if non-empty; if null/empty, fallback to globalUrl
  const url = (paragraphUrl && paragraphUrl.trim().length > 0) ? paragraphUrl : (globalUrl || null);
  const start = paragraphAudio?.start || 0;
  const end = paragraphAudio?.end || 0;

  return { url, start, end };
};



/**
 * Resolves available language codes from supportedLanguages.
 *
 * @param {object} supportedLanguages - supportedLanguages object from JSON schema.
 * @returns {string[]} Array of available language codes.
 */
export const getAvailableLanguages = (supportedLanguages) => {
  if (!supportedLanguages) return ['kn'];
  const textLangs = supportedLanguages.text || [];
  const transliterationLangs = supportedLanguages.transliterations || [];
  const allLangs = Array.from(new Set([...textLangs, ...transliterationLangs]));
  return allLangs.length > 0 ? allLangs : ['kn'];
};
