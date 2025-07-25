import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useLanguage from '@/src/hooks/useLanguage';
import { notifySuccess, notifyError } from '@/src/utils/toast';

// Generate random math CAPTCHA
const generateCaptcha = () => {
  const operations = ['+', '-'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let num1, num2, answer;

  if (operation === '+') {
    num1 = Math.floor(Math.random() * 10) + 1; // 1-10
    num2 = Math.floor(Math.random() * 10) + 1; // 1-10
    answer = num1 + num2;
  } else {
    // For subtraction, ensure positive result
    num1 = Math.floor(Math.random() * 10) + 5; // 5-14
    num2 = Math.floor(Math.random() * 5) + 1; // 1-5
    answer = num1 - num2;
  }

  return {
    question: `${num1} ${operation} ${num2}`,
    answer: answer
  };
};

const ContactMinimalForm = () => {
  const { translations } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());

  // Validation schema
  const schema = yup.object({
    name: yup
      .string()
      .required(translations?.contact?.form_validation?.name_required || 'Name is required')
      .min(2, translations?.contact?.form_validation?.name_min || 'Name must be at least 2 characters')
      .max(50, translations?.contact?.form_validation?.name_max || 'Name must not exceed 50 characters'),
    email: yup
      .string()
      .required(translations?.contact?.form_validation?.email_required || 'Email is required')
      .email(translations?.contact?.form_validation?.email_invalid || 'Invalid email address'),
    subject: yup
      .string()
      .required(translations?.contact?.form_validation?.subject_required || 'Subject is required')
      .min(5, translations?.contact?.form_validation?.subject_min || 'Subject must be at least 5 characters')
      .max(100, translations?.contact?.form_validation?.subject_max || 'Subject must not exceed 100 characters'),
    message: yup
      .string()
      .required(translations?.contact?.form_validation?.message_required || 'Message is required')
      .min(10, translations?.contact?.form_validation?.message_min || 'Message must be at least 10 characters')
      .max(1000, translations?.contact?.form_validation?.message_max || 'Message must not exceed 1000 characters'),
    captcha: yup
      .number()
      .required(translations?.contact?.form_validation?.captcha_required || 'Please solve the math problem')
      .integer(translations?.contact?.form_validation?.captcha_integer || 'Please enter a whole number')
      .test(
        'captcha-correct',
        translations?.contact?.form_validation?.captcha_incorrect || 'Incorrect answer. Please try again.',
        function (value) {
          return value === captcha.answer;
        }
      )
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    setIsSubmitting(true);

    try {
      // Include CAPTCHA answer for server-side verification
      const formData = {
        ...data,
        captchaAnswer: captcha.answer,
        captchaQuestion: captcha.question
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        notifySuccess(result.message);
        reset(); // Clear form after successful submission
        setCaptcha(generateCaptcha()); // Generate new CAPTCHA
      } else {
        notifyError(result.message || 'An error occurred. Please try again.');
        // Generate new CAPTCHA on error to prevent reuse
        setCaptcha(generateCaptcha());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      notifyError('An error occurred. Please try again.');
      // Generate new CAPTCHA on error
      setCaptcha(generateCaptcha());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form id='contact-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            {...register('name')}
            type='text'
            placeholder={translations?.contact?.contact_form?.name_placeholder || 'Full Name'}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className='error-message'>{errors.name.message}</span>}
        </div>

        <div className='form-group'>
          <input
            {...register('email')}
            type='email'
            placeholder={translations?.contact?.contact_form?.email_placeholder || 'Email Address'}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className='error-message'>{errors.email.message}</span>}
        </div>

        <div className='form-group'>
          <input
            {...register('subject')}
            type='text'
            placeholder={translations?.contact?.contact_form?.subject_placeholder || 'Subject'}
            className={errors.subject ? 'error' : ''}
          />
          {errors.subject && <span className='error-message'>{errors.subject.message}</span>}
        </div>

        <div className='form-group'>
          <textarea
            {...register('message')}
            cols='30'
            rows='10'
            placeholder={translations?.contact?.contact_form?.message_placeholder || 'Message Content'}
            className={errors.message ? 'error' : ''}
          ></textarea>
          {errors.message && <span className='error-message'>{errors.message.message}</span>}
        </div>

        {/* CAPTCHA Field */}
        <div className='form-group captcha-group'>
          <label className='captcha-label'>
            {translations?.contact?.contact_form?.captcha_label || 'Security Question:'}
            <strong>
              {' '}
              {translations?.contact?.contact_form?.captcha_question?.replace(
                '${captcha.question}',
                captcha.question
              ) || `{What is ${captcha.question}?}`}
            </strong>
          </label>
          <input
            {...register('captcha', { valueAsNumber: true })}
            type='number'
            placeholder={translations?.contact?.contact_form?.captcha_placeholder || 'Enter your answer'}
            className={errors.captcha ? 'error captcha-input' : 'captcha-input'}
            min='0'
            max='99'
          />
          {errors.captcha && <span className='error-message'>{errors.captcha.message}</span>}
        </div>

        <button type='submit' className='x-btn btn-black' disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : translations?.contact?.contact_form?.submit || 'Send Message'}
        </button>
      </form>

      <style jsx>{`
        .form-group {
          margin-bottom: 1rem;
        }

        .captcha-group {
          background-color: #f8f9fa;
          padding: 1rem;
          border-radius: 0.375rem;
          border: 1px solid #dee2e6;
          margin-bottom: 1.5rem;
        }

        .captcha-label {
          display: block;
          font-size: 0.9rem;
          color: #495057;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .captcha-input {
          width: 100px;
          padding: 0.5rem;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          font-size: 1rem;
          text-align: center;
        }

        .captcha-input:focus {
          outline: none;
          border-color: #80bdff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .error-message {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }

        input.error,
        textarea.error {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default ContactMinimalForm;
