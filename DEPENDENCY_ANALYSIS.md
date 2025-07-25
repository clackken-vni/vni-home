# Dependency Analysis Report

## 🟢 Dependencies CẦN GIỮ LẠI (Core functionality)

### Essential Next.js & React
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM
- `next-i18next` - Internationalization
- `bootstrap` - CSS framework (used in styles/index.css)

### Form & Validation (Contact form)
- `react-hook-form` - Form management (used in contact-minimal-form.jsx)
- `@hookform/resolvers` - Form resolvers
- `yup` - Validation schema (used in contact form)
- `nodemailer` - Email sending (used in API)

### UI & Notifications
- `react-toastify` - Toast notifications (used in contact form & _app.jsx)

## 🟡 Dependencies ĐANG ĐƯỢC SỬ DỤNG (Có thể loại bỏ sau cleanup)

### Animation & Effects
- `aos` - Animation on scroll (used in _app.jsx)
- `react-countup` - Counter animations (used in number-count.jsx)
- `react-intersection-observer` - Scroll detection (used in number-count.jsx)

### Sliders & Carousels
- `react-slick` - Slider component (used in portfolio components)
- `slick-carousel` - Slider CSS (imported in styles/index.css)

### Redux (Có vẻ không cần thiết cho website đơn giản)
- `@reduxjs/toolkit` - Redux toolkit (used in _app.jsx)
- `react-redux` - React Redux bindings (used in _app.jsx & product-details)

## 🔴 Dependencies CÓ THỂ LOẠI BỎ (Không được sử dụng trong core pages)

### Image & Media Libraries
- `react-18-image-lightbox` - Image lightbox (imported in styles but only used in portfolio)
- `react-modal-image` - Modal images (không thấy được sử dụng)
- `react-modal-video` - Video modals (imported in styles but only used in portfolio)
- `react-responsive-masonry` - Masonry layouts (không thấy được sử dụng)

### Styling
- `styled-components` - CSS-in-JS (không thấy được sử dụng)
- `framer-motion` - Animation library (không thấy được sử dụng)

## 📋 CLEANUP PLAN

### Phase 1: Remove unused dependencies immediately
```bash
npm uninstall react-modal-image react-responsive-masonry styled-components framer-motion
```

### Phase 2: After removing portfolio/blog components
```bash
npm uninstall react-18-image-lightbox react-modal-video react-slick slick-carousel
```

### Phase 3: Evaluate after full cleanup
- `aos` - Keep if homepage uses animations
- `react-countup` + `react-intersection-observer` - Keep if homepage uses counters
- `@reduxjs/toolkit` + `react-redux` - Remove if not needed for state management

## 🎯 FINAL MINIMAL DEPENDENCIES (Estimated)

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.1.0",
    "bootstrap": "^5.2.3",
    "next": "13.4.1",
    "next-i18next": "^15.4.2",
    "nodemailer": "^7.0.5",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.43.9",
    "react-toastify": "^9.1.3",
    "yup": "^1.1.1"
  }
}
```

## 📊 SIZE REDUCTION ESTIMATE
- Current: ~35 dependencies
- After cleanup: ~10 dependencies
- Estimated bundle size reduction: 40-60%
