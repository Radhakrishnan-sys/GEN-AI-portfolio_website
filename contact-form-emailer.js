// Contact Form Email Forwarding Script

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create email content
            const emailContent = `
                Name: ${name}
                Email: ${email}
                Subject: ${subject}
                
                Message:
                ${message}
            `;
            
            // Email configuration
            const recipientEmail = "work.connectwithkrishna@gmail.com";
            
            // Show sending indicator
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate sending email (in a real environment, this would be replaced with actual email sending code)
            setTimeout(function() {
                // In a production environment, you would use a service like EmailJS, Formspree, or a backend API
                // For demonstration purposes, we're simulating success
                
                // Show success message
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.classList.add('bg-green-500');
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(function() {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('bg-green-500');
                }, 3000);
                
                // Log for demonstration (remove in production)
                console.log("Email would be sent to:", recipientEmail);
                console.log("Email content:", emailContent);
                
            }, 1500);
        });
    }
});

/*
 * IMPORTANT: This is a client-side simulation only.
 * 
 * For actual email forwarding, you would need to:
 * 
 * 1. Use a service like EmailJS (https://www.emailjs.com/) which allows sending emails directly from client-side JavaScript
 *    - Sign up for EmailJS
 *    - Configure an email template
 *    - Add the EmailJS SDK to your website
 *    - Replace the setTimeout code with actual EmailJS send method
 * 
 * 2. OR use a form submission service like Formspree (https://formspree.io/)
 *    - Sign up for Formspree
 *    - Configure your form with your Formspree endpoint
 *    - No JavaScript required, just HTML form configuration
 * 
 * 3. OR implement a server-side solution using a backend API
 *    - Create a server endpoint that handles email sending
 *    - Use a library like Nodemailer (Node.js) or similar in your backend
 *    - Send form data to this endpoint via fetch() or axios
 * 
 * For security reasons, you cannot send emails directly from client-side JavaScript without using a service.
 */

