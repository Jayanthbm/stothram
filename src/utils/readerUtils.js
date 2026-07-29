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
  const url =
    paragraphUrl && paragraphUrl.trim().length > 0
      ? paragraphUrl
      : globalUrl || null;
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
export const getAvailableLanguages = supportedLanguages => {
  if (!supportedLanguages) return ['kn'];
  const textLangs = supportedLanguages.text || [];
  const transliterationLangs = supportedLanguages.transliterations || [];
  const allLangs = Array.from(new Set([...textLangs, ...transliterationLangs]));
  return allLangs.length > 0 ? allLangs : ['kn'];
};

/**
 * Scans readerData and returns array of language codes where meanings exist.
 *
 * @param {object} readerData - Root reader data object.
 * @returns {string[]} Array of language codes (e.g. ['kn', 'en']).
 */
export const getAvailableMeaningLanguages = readerData => {
  if (!readerData?.content || !Array.isArray(readerData.content)) return [];
  const langSet = new Set();
  readerData.content.forEach(item => {
    if (item?.meanings) {
      Object.keys(item.meanings).forEach(langKey => {
        const langObj = item.meanings[langKey];
        if (Array.isArray(langObj?.text) && langObj.text.length > 0) {
          langSet.add(langKey);
        }
      });
    }
  });
  return Array.from(langSet);
};

/**
 * Checks if reader data content contains any populated meanings.
 *
 * @param {object} readerData - Root reader data object.
 * @returns {boolean} True if at least one paragraph has non-empty meanings text.
 */
export const hasMeaningsInContent = readerData => {
  return getAvailableMeaningLanguages(readerData).length > 0;
};

/**
 * Resolves meaning text lines for a paragraph given selectedLanguage and available Meaning languages.
 * Fallback order:
 * 1. selectedLanguage
 * 2. defaultLanguage (or 'kn')
 * 3. first available language from meanings dictionary
 *
 * @param {object} meaningsDict - Paragraph's item.meanings object.
 * @param {string} selectedLanguage - Current active language in reader.
 * @param {string} defaultLanguage - Default language from JSON schema.
 * @returns {string[]} Resolved array of meaning text lines.
 */
export const resolveMeaningLines = (
  meaningsDict,
  selectedLanguage,
  defaultLanguage = 'kn',
) => {
  if (!meaningsDict || typeof meaningsDict !== 'object') return [];

  // 1. Try selectedLanguage
  if (
    Array.isArray(meaningsDict[selectedLanguage]?.text) &&
    meaningsDict[selectedLanguage].text.length > 0
  ) {
    return meaningsDict[selectedLanguage].text;
  }

  // 2. Try defaultLanguage
  if (
    Array.isArray(meaningsDict[defaultLanguage]?.text) &&
    meaningsDict[defaultLanguage].text.length > 0
  ) {
    return meaningsDict[defaultLanguage].text;
  }

  // 3. Fallback to any first language in meanings object that has text
  for (const langKey of Object.keys(meaningsDict)) {
    const textArr = meaningsDict[langKey]?.text;
    if (Array.isArray(textArr) && textArr.length > 0) {
      return textArr;
    }
  }

  return [];
};
