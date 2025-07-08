import React, { useState, FormEvent, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../../config/supabase';
import './ContactSection.css';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [progress, setProgress] = useState(0);

  // Debug log for Supabase configuration
  useEffect(() => {
    const checkSupabase = async () => {
      // Log environment variables (without exposing sensitive data)
      const envStatus = {
        SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL ? '✓ Set' : '✗ Missing',
        SUPABASE_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing',
      };
      console.log('Environment Status:', envStatus);

      // Log Supabase client status
      console.log('Supabase Client Status:', {
        isConfigured: isSupabaseConfigured(),
        clientInitialized: supabase ? '✓ Yes' : '✗ No'
      });

      if (!isSupabaseConfigured()) {
        console.warn('⚠️ Supabase is not configured. Please check your .env file.');
        return;
      }

      try {
        // Test database connection
        console.log('Testing Supabase connection...');
        const { error } = await supabase!
          .from('hirednext_contact_submissions')
          .select('id')
          .limit(1);

        if (error) {
          console.error('❌ Supabase connection test failed:', {
            code: error.code,
            message: error.message,
            details: error.details
          });
        } else {
          console.log('✓ Supabase connection test successful');
        }
      } catch (error) {
        console.error('❌ Error testing Supabase connection:', error);
      }
    };

    checkSupabase();
  }, []);

  useEffect(() => {
    // Calculate form completion percentage
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    const percentage = Math.floor((filledFields / totalFields) * 100);
    setProgress(percentage);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submission started');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      const missingFields = [];
      if (!formData.name) missingFields.push('name');
      if (!formData.email) missingFields.push('email');
      if (!formData.message) missingFields.push('message');
      
      console.warn('Form validation failed:', { missingFields });
      setSubmitError(`Please fill out all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!isSupabaseConfigured() || !supabase) {
      console.error('❌ Supabase client not available');
      setSubmitError('System configuration error. Please try again later.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      console.log('📨 Attempting to submit to Supabase...', {
        table: 'hirednext_contact_submissions',
        data: {
          ...formData,
          phone: formData.phone || null,
          subject: formData.subject || null
        }
      });
      
      // Submit form data to Supabase
      const { data, error, status } = await supabase
        .from('hirednext_contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject || null,
            message: formData.message,
            ip_address: 'client-ip'
          }
        ])
        .select();

      if (error) {
        console.error('❌ Supabase error:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          status
        });
        throw error;
      }

      console.log('✓ Submission successful:', { data, status });
      
      // Reset form on success
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error('❌ Form submission error:', error);
      let errorMessage = 'Something went wrong. Please try again later.';
      
      // Handle specific error cases
      if (error.code === '23505') { // Unique violation
        errorMessage = 'This submission appears to be a duplicate.';
      } else if (error.code === '42501') { // Insufficient privileges
        errorMessage = 'Permission denied. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Contact Us</h2>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-method">
              <div className="icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info">
                <h3>Our Location</h3>
                <p>Delhi NCR, Mumbai, Chennai & Bangalore, India</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info">
                <h3>Email Us</h3>
                <p>work@hirednext.info</p>
              </div>
            </div>
            
            <div className="socials-text">Connect With Us</div>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/hirednext-recruitment-service/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://x.com/Hired_Next?t=XeB5aSALcB-NUNNS2TvxgA&s=09 " target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/hirednext?igsh=MXJxd2E2OGQ4ZDJ6bg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              {submitSuccess && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We'll be in touch shortly.
                </div>
              )}
              
              {submitError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i> {submitError}
                </div>
              )}
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Your Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number (optional)"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message*</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message here..."
                  rows={6}
                  required
                ></textarea>
              </div>
              
              <div style={{ 
                height: '4px', 
                width: '100%', 
                backgroundColor: 'rgba(0,0,0,0.1)', 
                borderRadius: '2px',
                marginBottom: '20px' 
              }}>
                <div style={{ 
                  height: '100%', 
                  width: `${progress}%`, 
                  backgroundColor: progress === 100 ? 'var(--emerald-green)' : 'var(--gold)',
                  borderRadius: '2px',
                  transition: 'width 0.3s ease-in-out'
                }}></div>
              </div>
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <i className="fas fa-paper-plane" style={{ marginLeft: '8px' }}></i>
                  </>
                )}
              </button>
              
              <div className="form-footer">
                <i className="fas fa-shield-alt"></i>
                <span>Your information is secure and will not be shared with third parties.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 
