import fs from 'fs';
import path from 'path';

/**
 * Translation utility for API endpoints
 * Supports language detection and fallback mechanism
 */

// Cache for loaded translations to improve performance
const translationCache = new Map();

/**
 * Load translation file for a specific language
 * @param {string} language - Language code (e.g., 'en', 'vi')
 * @returns {object} Translation object
 */
const loadTranslation = (language) => {
  // Check cache first
  if (translationCache.has(language)) {
    return translationCache.get(language);
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', `${language}.json`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Translation file not found for language: ${language}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const translations = JSON.parse(fileContent);
    
    // Cache the translations
    translationCache.set(language, translations);
    
    return translations;
  } catch (error) {
    console.error(`Error loading translation for language ${language}:`, error);
    return null;
  }
};

/**
 * Detect language from request
 * @param {object} req - Express request object
 * @returns {string} Detected language code
 */
const detectLanguage = (req) => {
  // 1. Check if language is specified in request body
  if (req.body && req.body.language) {
    return req.body.language.toLowerCase();
  }

  // 2. Check Accept-Language header
  const acceptLanguage = req.headers['accept-language'];
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,vi;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, quality] = lang.trim().split(';q=');
        return {
          code: code.split('-')[0].toLowerCase(), // Extract main language code
          quality: quality ? parseFloat(quality) : 1.0
        };
      })
      .sort((a, b) => b.quality - a.quality); // Sort by quality

    // Return the highest quality language that we support
    for (const lang of languages) {
      if (['en', 'vi'].includes(lang.code)) {
        return lang.code;
      }
    }
  }

  // 3. Default fallback to Vietnamese (since it's a Vietnamese company)
  return 'vi';
};

/**
 * Get nested translation value using dot notation
 * @param {object} translations - Translation object
 * @param {string} key - Translation key (e.g., 'api.errors.invalid_email')
 * @returns {string|null} Translation value or null if not found
 */
const getNestedValue = (translations, key) => {
  return key.split('.').reduce((obj, k) => obj && obj[k], translations);
};

/**
 * Get translated message with fallback mechanism
 * @param {object} req - Express request object
 * @param {string} key - Translation key (e.g., 'api.errors.invalid_email')
 * @param {object} options - Options for translation
 * @param {string} options.fallbackLanguage - Fallback language (default: 'en')
 * @param {string} options.defaultMessage - Default message if translation not found
 * @returns {string} Translated message
 */
const getTranslation = (req, key, options = {}) => {
  const {
    fallbackLanguage = 'en',
    defaultMessage = key
  } = options;

  // Detect language
  const detectedLanguage = detectLanguage(req);
  
  // Try to get translation in detected language
  let translations = loadTranslation(detectedLanguage);
  let message = translations ? getNestedValue(translations, key) : null;

  // If not found and detected language is not the fallback, try fallback language
  if (!message && detectedLanguage !== fallbackLanguage) {
    translations = loadTranslation(fallbackLanguage);
    message = translations ? getNestedValue(translations, key) : null;
  }

  // Return message or default
  return message || defaultMessage;
};

/**
 * Get multiple translations at once
 * @param {object} req - Express request object
 * @param {array} keys - Array of translation keys
 * @param {object} options - Options for translation
 * @returns {object} Object with translated messages
 */
const getTranslations = (req, keys, options = {}) => {
  const result = {};
  
  keys.forEach(key => {
    result[key] = getTranslation(req, key, options);
  });

  return result;
};

/**
 * Get all translations for email template
 * @param {object} req - Express request object
 * @returns {object} All email-related translations
 */
const getEmailTranslations = (req) => {
  const detectedLanguage = detectLanguage(req);
  const translations = loadTranslation(detectedLanguage) || loadTranslation('en');
  
  return {
    language: detectedLanguage,
    email: translations?.api?.email || {},
    // Include some common translations that might be useful
    common: translations?.common || {}
  };
};

export {
  detectLanguage,
  getTranslation,
  getTranslations,
  getEmailTranslations,
  loadTranslation
};
