# Contact Form Setup Guide

## Tổng quan
Contact form đã được cấu hình để gửi email thông qua SMTP server khi người dùng submit form.

## Cấu hình đã thực hiện

### 1. Dependencies đã cài đặt
- `nodemailer`: Thư viện gửi email cho Node.js
- `react-hook-form`: Quản lý form state và validation
- `yup`: Schema validation
- `react-toastify`: Hiển thị notifications

### 2. Files đã tạo/cập nhật

#### API Endpoint: `src/pages/api/contact.js`
- Xử lý POST requests từ contact form
- Validation và sanitization input data
- Gửi email qua SMTP
- Error handling chi tiết
- Security features (rate limiting có thể thêm sau)

#### Form Component: `src/components/forms/contact-minimal-form.jsx`
- Sử dụng react-hook-form cho state management
- Yup schema validation
- Error handling và display
- Loading states
- Toast notifications
- Responsive design

#### Environment Variables: `.env.local`
```
SMTP_HOST=arrow.mailbux.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@vnideas.vn
SMTP_PASS=Hungthai@2511
CONTACT_EMAIL_TO=hung.dt@vnideas.vn
```

## Cách sử dụng

### 1. Setup Environment Variables
1. Copy `.env.example` thành `.env.local`
2. Điền thông tin SMTP của bạn
3. Restart development server

### 2. Import và sử dụng Form Component
```jsx
import ContactMinimalForm from '@/src/components/forms/contact-minimal-form';
import { ToastContainer } from '@/src/utils/toast';

function ContactPage() {
  return (
    <div>
      <ContactMinimalForm />
      <ToastContainer />
    </div>
  );
}
```

### 3. Test Form
- Truy cập `/test-contact` để test functionality
- Điền form và submit để kiểm tra email được gửi

## Features

### Validation
- Tên: 2-50 ký tự, bắt buộc
- Email: Format hợp lệ, bắt buộc
- Chủ đề: 5-100 ký tự, bắt buộc
- Tin nhắn: 10-1000 ký tự, bắt buộc

### Security
- Input sanitization
- SMTP credentials trong environment variables
- Error handling không expose sensitive information
- Rate limiting (có thể thêm sau)

### User Experience
- Real-time validation
- Loading states
- Success/error notifications
- Form reset sau khi gửi thành công
- Responsive design

## Email Template
Email được gửi bao gồm:
- Thông tin người gửi (tên, email, chủ đề)
- Nội dung tin nhắn
- Thông tin kỹ thuật (timestamp, IP, user agent)
- HTML và text format

## Troubleshooting

### Lỗi thường gặp
1. **EAUTH**: Sai username/password SMTP
2. **ECONNECTION**: Không kết nối được SMTP server
3. **Validation errors**: Kiểm tra format input

### Debug
- Check console logs trong browser và server
- Verify environment variables được load
- Test SMTP credentials với tool khác

## Cải tiến có thể thêm
1. Rate limiting để tránh spam
2. Captcha verification
3. Email templates customizable
4. Auto-reply email cho người gửi
5. Database logging cho audit trail
6. Attachment support
7. Multiple recipients
8. Email queue system cho high volume

## Security Considerations
- Không commit `.env.local` vào git
- Sử dụng strong passwords cho SMTP
- Consider using OAuth2 thay vì password
- Implement rate limiting
- Validate và sanitize tất cả inputs
- Monitor email sending logs
