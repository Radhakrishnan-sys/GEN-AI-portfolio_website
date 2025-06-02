// Contact Form Email Integration
// This script handles the email integration for the contact form

class ContactFormEmailer {
    constructor(options = {}) {
        this.formSelector = options.formSelector || '#contact-form';
        this.emailService = options.emailService || 'emailjs'; // 'emailjs', 'formspree', or 'custom'
        this.emailjsServiceId = options.emailjsServiceId || 'service_id';
        this.emailjsTemplateId = options.emailjsTemplateId || 'template_id';
        this.emailjsUserId = options.emailjsUserId || 'user_id';
        this.formspreeEndpoint = options.formspreeEndpoint || 'https://formspree.io/f/your-form-id';
        this.customEndpoint = options.customEndpoint || '/api/send-email';
        
        this.initForm();
    }
    
    initForm() {
        const form = document.querySelector(this.formSelector);
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form
            if (!this.validateForm(form)) return;
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show loading state
            this.setFormLoading(form, true);
            
            // Send email
            this.sendEmail(data)
                .then(success => {
                    if (success) {
                        this.showSuccessMessage(form);
                        form.reset();
                    } else {
                        this.showErrorMessage(form);
                    }
                })
                .catch(error => {
                    console.error('Email sending error:', error);
                    this.showErrorMessage(form);
                })
                .finally(() => {
                    this.setFormLoading(form, false);
                });
        });
    }
    
    validateForm(form) {
        let isValid = true;
        
        // Get required fields
        const requiredFields = form.querySelectorAll('[required]');
        
        // Check each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.markInvalid(field, `${field.name || 'This field'} is required`);
                isValid = false;
            } else {
                this.markValid(field);
                
                // Additional validation for email
                if (field.type === 'email' && !this.isValidEmail(field.value)) {
                    this.markInvalid(field, 'Please enter a valid email address');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    markInvalid(field, message) {
        field.classList.add('border-red-500');
        field.classList.remove('border-gray-300');
        
        // Add error message if it doesn't exist
        let errorMessage = field.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('p');
            errorMessage.className = 'text-red-500 text-sm mt-1 error-message';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
        errorMessage.textContent = message;
    }
    
    markValid(field) {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-300');
        
        // Remove error message if it exists
        const errorMessage = field.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    setFormLoading(form, isLoading) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.dataset.originalText = submitButton.textContent;
            submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.originalText || 'Send Message';
        }
    }
    
    showSuccessMessage(form) {
        // Remove any existing messages
        this.removeMessages(form);
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'mt-4 p-3 bg-green-100 text-green-700 rounded-lg message-alert';
        successMessage.innerHTML = '<svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Your message has been sent successfully!';
        
        // Add to form
        form.appendChild(successMessage);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    showErrorMessage(form) {
        // Remove any existing messages
        this.removeMessages(form);
        
        // Create error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'mt-4 p-3 bg-red-100 text-red-700 rounded-lg message-alert';
        errorMessage.innerHTML = '<svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> There was a problem sending your message. Please try again later.';
        
        // Add to form
        form.appendChild(errorMessage);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
    
    removeMessages(form) {
        const messages = form.querySelectorAll('.message-alert');
        messages.forEach(message => message.remove());
    }
    
    async sendEmail(data) {
        switch (this.emailService) {
            case 'emailjs':
                return this.sendWithEmailJS(data);
            case 'formspree':
                return this.sendWithFormspree(data);
            case 'custom':
                return this.sendWithCustomEndpoint(data);
            default:
                // For demo purposes, simulate success
                return new Promise(resolve => {
                    console.log('Sending email with data:', data);
                    setTimeout(() => resolve(true), 1500);
                });
        }
    }
    
    async sendWithEmailJS(data) {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS is not loaded');
            return false;
        }
        
        try {
            // Initialize EmailJS with user ID
            emailjs.init(this.emailjsUserId);
            
            // Send email
            const response = await emailjs.send(
                this.emailjsServiceId,
                this.emailjsTemplateId,
                data
            );
            
            console.log('EmailJS response:', response);
            return response.status === 200;
        } catch (error) {
            console.error('EmailJS error:', error);
            return false;
        }
    }
    
    async sendWithFormspree(data) {
        try {
            const response = await fetch(this.formspreeEndpoint, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            const json = await response.json();
            return response.ok;
        } catch (error) {
            console.error('Formspree error:', error);
            return false;
        }
    }
    
    async sendWithCustomEndpoint(data) {
        try {
            const response = await fetch(this.customEndpoint, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const json = await response.json();
            return json.success;
        } catch (error) {
            console.error('Custom endpoint error:', error);
            return false;
        }
    }
}

// Initialize contact form emailer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // For demonstration purposes, we'll use a simulated email service
    // In a real implementation, you would use EmailJS, Formspree, or a custom backend
    window.contactFormEmailer = new ContactFormEmailer({
        formSelector: '#contact-form',
        emailService: 'demo' // 'demo', 'emailjs', 'formspree', or 'custom'
    });
    
    // Instructions for setting up real email integration
    console.log(`
        To set up real email integration:
        
        1. EmailJS:
           - Sign up at https://www.emailjs.com/
           - Create a service and template
           - Update the emailjsServiceId, emailjsTemplateId, and emailjsUserId
           - Add the EmailJS SDK to your HTML
        
        2. Formspree:
           - Sign up at https://formspree.io/
           - Create a form
           - Update the formspreeEndpoint with your form URL
        
        3. Custom Backend:
           - Create a server endpoint to handle email sending
           - Update the customEndpoint with your API URL
    `);
});
