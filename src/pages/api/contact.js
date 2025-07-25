import nodemailer from 'nodemailer';
import { getTranslation, getEmailTranslations } from '@/src/utils/i18n-api';

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
      message: getTranslation(req, 'api.errors.method_not_allowed')
    });
  }

  // Check environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_EMAIL_TO) {
    console.error('Missing required environment variables');
    return res.status(500).json({
      success: false,
      message: getTranslation(req, 'api.errors.server_config_error')
    });
  }

  try {
    // Extract and validate form data
    const { name, email, subject, message, captcha, captchaAnswer, captchaQuestion } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: getTranslation(req, 'api.errors.all_fields_required')
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: getTranslation(req, 'api.errors.invalid_email')
      });
    }

    // CAPTCHA validation
    if (!captcha || !captchaAnswer || !captchaQuestion) {
      return res.status(400).json({
        success: false,
        message: getTranslation(req, 'api.errors.captcha_required')
      });
    }

    if (parseInt(captcha) !== parseInt(captchaAnswer)) {
      return res.status(400).json({
        success: false,
        message: getTranslation(req, 'api.errors.captcha_incorrect')
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
        message: getTranslation(req, 'api.errors.smtp_connection_failed')
      });
    }

    // Get email translations
    const emailTranslations = getEmailTranslations(req);
    const t = emailTranslations.email;

    // Email content
    const mailOptions = {
      from: `"${sanitizedData.name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: sanitizedData.email,
      subject: `${t.subject_prefix || '[Contact Form]'} ${sanitizedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            ${t.new_message_title || 'New message from Contact Form'}
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">${t.sender_info_title || 'Sender Information:'}</h3>
            <p><strong>${t.name_label || 'Name'}:</strong> ${sanitizedData.name}</p>
            <p><strong>${t.email_label || 'Email'}:</strong> ${sanitizedData.email}</p>
            <p><strong>${t.subject_label || 'Subject'}:</strong> ${sanitizedData.subject}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #495057; margin-top: 0;">${t.message_content_title || 'Message Content:'}</h3>
            <p style="line-height: 1.6; color: #6c757d;">${sanitizedData.message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p><strong>${t.technical_info_title || 'Technical Information:'}</strong></p>
            <p>${t.timestamp_label || 'Timestamp'}: ${new Date().toLocaleString(
        emailTranslations.language === 'vi' ? 'vi-VN' : 'en-US'
      )}</p>
            <p>${t.ip_label || 'IP'}: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'}</p>
            <p>${t.user_agent_label || 'User Agent'}: ${req.headers['user-agent'] || 'Unknown'}</p>
            <p>${t.captcha_label || 'CAPTCHA'}: ${captchaQuestion} = ${captcha} ✓</p>
          </div>
        </div>
      `,
      text: `
        ${t.new_message_title || 'New message from Contact Form'}

        ${t.name_label || 'Name'}: ${sanitizedData.name}
        ${t.email_label || 'Email'}: ${sanitizedData.email}
        ${t.subject_label || 'Subject'}: ${sanitizedData.subject}

        ${t.message_content_title || 'Message Content:'}
        ${sanitizedData.message}

        ---
        ${t.timestamp_label || 'Timestamp'}: ${new Date().toLocaleString(
        emailTranslations.language === 'vi' ? 'vi-VN' : 'en-US'
      )}
        ${t.ip_label || 'IP'}: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'}
        ${t.captcha_label || 'CAPTCHA'}: ${captchaQuestion} = ${captcha} ✓
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: getTranslation(req, 'api.success.email_sent'),
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);

    // Handle specific errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: getTranslation(req, 'api.errors.smtp_auth_failed')
      });
    }

    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: getTranslation(req, 'api.errors.smtp_connection_failed')
      });
    }

    return res.status(500).json({
      success: false,
      message: getTranslation(req, 'api.errors.general_error')
    });
  }
}
