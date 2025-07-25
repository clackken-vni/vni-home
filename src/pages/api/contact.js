import nodemailer from 'nodemailer';

// Validation helper function
const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeInput = input => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  // Check environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_EMAIL_TO) {
    console.error('Missing required environment variables');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error. Please contact administrator.'
    });
  }

  try {
    // Extract and validate form data
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tất cả các trường đều bắt buộc phải điền.'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Địa chỉ email không hợp lệ.'
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    };

    // Create transporter
    console.log('Creating SMTP transporter with config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    console.log('Verifying SMTP connection...');
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return res.status(500).json({
        success: false,
        message: 'Không thể kết nối đến email server. Vui lòng thử lại sau.'
      });
    }

    // Email content
    const mailOptions = {
      from: `"${sanitizedData.name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: sanitizedData.email,
      subject: `[Contact Form] ${sanitizedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Tin nhắn mới từ Contact Form
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Tên:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Chủ đề:</strong> ${sanitizedData.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #495057; margin-top: 0;">Nội dung tin nhắn:</h3>
            <p style="line-height: 1.6; color: #6c757d;">${sanitizedData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p><strong>Thông tin kỹ thuật:</strong></p>
            <p>Thời gian: ${new Date().toLocaleString('vi-VN')}</p>
            <p>IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'}</p>
            <p>User Agent: ${req.headers['user-agent'] || 'Unknown'}</p>
          </div>
        </div>
      `,
      text: `
        Tin nhắn mới từ Contact Form
        
        Tên: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        Chủ đề: ${sanitizedData.subject}
        
        Nội dung tin nhắn:
        ${sanitizedData.message}
        
        ---
        Thời gian: ${new Date().toLocaleString('vi-VN')}
        IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email đã được gửi thành công! Chúng tôi sẽ phản hồi bạn sớm nhất có thể.',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);

    // Handle specific errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Lỗi xác thực email server. Vui lòng thử lại sau.'
      });
    }

    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'Không thể kết nối đến email server. Vui lòng thử lại sau.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.'
    });
  }
}
