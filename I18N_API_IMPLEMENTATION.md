# API Internationalization Implementation

## 🎯 Overview
Implemented comprehensive internationalization (i18n) support for the contact API endpoint, enabling multi-language responses for all user-facing messages while maintaining full functionality of CAPTCHA validation and email sending.

## ✅ Features Implemented

### 1. Language Detection
- **Request Body Parameter**: `language` field in POST body (highest priority)
- **Accept-Language Header**: Parse browser language preferences with quality values
- **Fallback Mechanism**: Default to Vietnamese ('vi') for VNI website context
- **Supported Languages**: Vietnamese ('vi') and English ('en')

### 2. Translation System
- **Translation Files**: Extended existing `public/locales/vi.json` and `public/locales/en.json`
- **Caching**: In-memory translation cache for performance
- **Nested Keys**: Support for dot notation (e.g., 'api.errors.invalid_email')
- **Fallback**: English fallback when translation not found in requested language

### 3. API Message Internationalization
- **Error Messages**: All validation, CAPTCHA, and server errors
- **Success Messages**: Email sent confirmation
- **Email Content**: Subject line, headers, and body content
- **Technical Info**: Timestamp formatting based on language

## 📁 Files Created/Modified

### 1. Translation Utility (`src/utils/i18n-api.js`)
```javascript
// Core functions
- detectLanguage(req)           // Detect language from request
- getTranslation(req, key)      // Get single translation with fallback
- getEmailTranslations(req)     // Get all email translations
- loadTranslation(language)     // Load and cache translation file
```

### 2. Translation Files Extended

#### Vietnamese (`public/locales/vi.json`)
```json
{
  "api": {
    "errors": {
      "method_not_allowed": "Phương thức không được phép...",
      "all_fields_required": "Tất cả các trường đều bắt buộc...",
      "invalid_email": "Địa chỉ email không hợp lệ.",
      "captcha_incorrect": "Câu trả lời bài toán bảo mật không đúng..."
    },
    "success": {
      "email_sent": "Email đã được gửi thành công!..."
    },
    "email": {
      "subject_prefix": "[Biểu mẫu liên hệ]",
      "new_message_title": "Tin nhắn mới từ Contact Form",
      "name_label": "Tên:",
      "email_label": "Email:"
    }
  }
}
```

#### English (`public/locales/en.json`)
```json
{
  "api": {
    "errors": {
      "method_not_allowed": "Method not allowed. Only POST requests...",
      "all_fields_required": "All fields are required.",
      "invalid_email": "Invalid email address.",
      "captcha_incorrect": "Incorrect security question answer..."
    },
    "success": {
      "email_sent": "Email sent successfully! We will respond..."
    },
    "email": {
      "subject_prefix": "[Contact Form]",
      "new_message_title": "New message from Contact Form",
      "name_label": "Name:",
      "email_label": "Email:"
    }
  }
}
```

### 3. API Endpoint Updated (`src/pages/api/contact.js`)
```javascript
// Import translation utilities
import { getTranslation, getEmailTranslations } from '@/src/utils/i18n-api';

// Replace hardcoded messages
return res.status(400).json({
  success: false,
  message: getTranslation(req, 'api.errors.invalid_email')
});

// Internationalized email template
const emailTranslations = getEmailTranslations(req);
const t = emailTranslations.email;
subject: `${t.subject_prefix || '[Contact Form]'} ${sanitizedData.subject}`,
```

### 4. Form Component Updated (`src/components/forms/contact-minimal-form.jsx`)
```javascript
// Send language to API
const formData = {
  ...data,
  captchaAnswer: captcha.answer,
  captchaQuestion: captcha.question,
  language: translations?.language || 'vi'
};
```

## 🔧 Language Detection Logic

### Priority Order:
1. **Request Body**: `req.body.language` (e.g., 'vi', 'en')
2. **Accept-Language Header**: Parse browser preferences
3. **Default Fallback**: 'vi' (Vietnamese)

### Accept-Language Parsing:
```javascript
// Example: "en-US,en;q=0.9,vi;q=0.8"
// Parsed to: [
//   { code: 'en', quality: 0.9 },
//   { code: 'vi', quality: 0.8 }
// ]
// Returns: 'en' (highest quality supported language)
```

## 📧 Email Internationalization

### Subject Line:
- **Vietnamese**: `[Biểu mẫu liên hệ] Subject`
- **English**: `[Contact Form] Subject`

### Email Content:
- **Headers**: "Tin nhắn mới từ Contact Form" / "New message from Contact Form"
- **Labels**: "Tên:" / "Name:", "Email:" / "Email:", etc.
- **Timestamp**: Vietnamese format (vi-VN) or English format (en-US)

### Template Structure:
```html
<h2>${t.new_message_title}</h2>
<h3>${t.sender_info_title}</h3>
<p><strong>${t.name_label}:</strong> ${name}</p>
<p><strong>${t.email_label}:</strong> ${email}</p>
```

## 🛡️ Error Message Examples

### Validation Errors:
- **Vietnamese**: "Tất cả các trường đều bắt buộc phải điền."
- **English**: "All fields are required."

### CAPTCHA Errors:
- **Vietnamese**: "Câu trả lời bài toán bảo mật không đúng. Vui lòng thử lại."
- **English**: "Incorrect security question answer. Please try again."

### Server Errors:
- **Vietnamese**: "Không thể kết nối đến email server. Vui lòng thử lại sau."
- **English**: "Unable to connect to email server. Please try again later."

## 🚀 Performance Features

### Translation Caching:
```javascript
const translationCache = new Map();
// Translations loaded once and cached in memory
// Subsequent requests use cached versions
```

### Efficient Loading:
- Only load requested language file
- Fallback to English only when needed
- File existence check before loading

## 🧪 Testing Scenarios

### 1. Vietnamese Request:
```javascript
// Request with Vietnamese language
{
  "language": "vi",
  "name": "",
  "email": "invalid"
}
// Response: "Địa chỉ email không hợp lệ."
```

### 2. English Request:
```javascript
// Request with English language
{
  "language": "en", 
  "name": "",
  "email": "invalid"
}
// Response: "Invalid email address."
```

### 3. Browser Language Detection:
```javascript
// Headers: Accept-Language: en-US,en;q=0.9
// Response: English messages

// Headers: Accept-Language: vi-VN,vi;q=0.9
// Response: Vietnamese messages
```

### 4. Fallback Behavior:
```javascript
// Unsupported language request
{
  "language": "fr"
}
// Falls back to Vietnamese (default)
```

## 🔄 Fallback Mechanism

### Translation Not Found:
1. Try requested language
2. If not found, try English
3. If still not found, return translation key as default

### Language Not Supported:
1. Detect unsupported language
2. Fall back to Vietnamese (company default)
3. Log warning for monitoring

### File Loading Error:
1. Catch file read errors
2. Return null for failed language
3. Trigger fallback to English
4. Log error for debugging

## 📊 Supported Languages

### Current Support:
- **Vietnamese (vi)**: Primary language for VNI website
- **English (en)**: International fallback language

### Easy Extension:
```javascript
// To add new language (e.g., Japanese):
// 1. Create public/locales/ja.json
// 2. Add 'ja' to supported languages array
// 3. No code changes needed in API
```

## 🎯 Benefits Achieved

### 1. User Experience:
- **Native Language**: Users see messages in their preferred language
- **Consistent Experience**: All API responses match frontend language
- **Professional Communication**: Proper localization for business context

### 2. Maintainability:
- **Centralized Translations**: All text in translation files
- **Easy Updates**: Change translations without code changes
- **Consistent Terminology**: Shared translation keys across frontend/backend

### 3. Scalability:
- **Easy Language Addition**: Just add new translation file
- **Performance Optimized**: Caching and efficient loading
- **Fallback Safety**: Always returns meaningful message

## 🔧 Configuration

### Environment Variables:
No additional environment variables needed. Uses existing translation files.

### Language Detection:
```javascript
// Customize default language
const detectLanguage = (req) => {
  // Change default from 'vi' to 'en' if needed
  return 'en'; // Default fallback
};
```

### Translation Keys:
Add new keys to both language files:
```json
{
  "api": {
    "new_section": {
      "new_key": "Translation text"
    }
  }
}
```

## ✅ Implementation Complete

The API endpoint now fully supports internationalization with:
- ✅ Language detection from multiple sources
- ✅ Comprehensive error message translation
- ✅ Internationalized email templates
- ✅ Robust fallback mechanisms
- ✅ Performance optimization with caching
- ✅ Easy extensibility for new languages

**Test the implementation**: Send requests to `/api/contact` with different `language` parameters or `Accept-Language` headers to see localized responses.
