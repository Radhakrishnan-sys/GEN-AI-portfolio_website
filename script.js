// Enhanced script.js with fixed chatbot functionality and theme toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-100', 'text-blue-600'));
                filterButtons.forEach(btn => btn.classList.add('bg-gray-100', 'text-gray-600'));
                
                // Add active class to clicked button
                this.classList.add('active', 'bg-blue-100', 'text-blue-600');
                this.classList.remove('bg-gray-100', 'text-gray-600');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide project cards based on filter
                projectCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            }
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const body = document.body;
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcons(newTheme);
    }
    
    // Function to update theme icons
    function updateThemeIcons(theme) {
        const sunIcon = '<i class="fas fa-sun mr-1"></i> Theme';
        const moonIcon = '<i class="fas fa-moon mr-1"></i> Theme';
        
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        }
        
        if (themeToggleMobile) {
            themeToggleMobile.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        }
    }
    
    // Initialize theme based on localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
    
    // Add event listeners to theme toggles
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    // Chatbot functionality
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const providerOptions = document.querySelectorAll('.provider-option');
    
    if (chatbotButton && chatbotContainer) {
        // Toggle chatbot visibility
        chatbotButton.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
            // Remove notification badge when opened
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
        
        // Close chatbot
        if (chatbotClose) {
            chatbotClose.addEventListener('click', function() {
                chatbotContainer.classList.remove('active');
            });
        }
        
        // Send message
        function sendMessage() {
            if (chatbotInput && chatbotInput.value.trim() !== '') {
                const message = chatbotInput.value;
                
                // Add user message to chat
                addMessage('user', message);
                
                // Clear input
                chatbotInput.value = '';
                
                // Simulate bot response after a short delay
                setTimeout(() => {
                    const responses = [
                        "I'm working on implementing RAG for better context-aware responses.",
                        "That's an interesting question about AI. I specialize in LLMs and NLP technologies.",
                        "I've worked on several projects involving generative AI and vector databases.",
                        "My portfolio showcases various AI applications including chatbots and semantic search systems.",
                        "I'd be happy to discuss potential collaboration on AI projects."
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage('bot', randomResponse);
                }, 1000);
            }
        }
        
        // Add message to chat
        function addMessage(type, content) {
            if (chatbotMessages) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', type);
                
                const now = new Date();
                const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
                
                messageDiv.innerHTML = content + '<div class="message-time">' + timeString + '</div>';
                
                chatbotMessages.appendChild(messageDiv);
                
                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        }
        
        // Send message on button click
        if (chatbotSend) {
            chatbotSend.addEventListener('click', sendMessage);
        }
        
        // Send message on Enter key
        if (chatbotInput) {
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        // Provider selection
        if (providerOptions.length > 0) {
            providerOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove active class from all options
                    providerOptions.forEach(opt => opt.classList.remove('active'));
                    
                    // Add active class to clicked option
                    this.classList.add('active');
                    
                    // Get selected provider
                    const provider = this.getAttribute('data-provider');
                    
                    // Add bot message about provider change
                    addMessage('bot', `Switched to ${provider} model. How can I help you?`);
                });
            });
        }
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = 'Sending...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    // Show success message
                    const formContainer = contactForm.parentElement;
                    formContainer.innerHTML = `
                        <div class="text-center py-8">
                            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-check text-green-500 text-2xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2 text-gray-800">Message Sent!</h3>
                            <p class="text-gray-600">Thank you for reaching out, ${name}. I'll get back to you as soon as possible.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }
    
    // Language switcher
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (languageOptions.length > 0) {
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                languageOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Get selected language
                const lang = this.getAttribute('data-lang');
                
                // Save language preference
                localStorage.setItem('language', lang);
                
                // Show notification
                const notification = document.createElement('div');
                notification.className = 'language-notification';
                notification.textContent = lang === 'en' ? 'Switched to English' : 'Zu Deutsch gewechselt';
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.left = '20px';
                notification.style.backgroundColor = '#333';
                notification.style.color = '#fff';
                notification.style.padding = '10px 15px';
                notification.style.borderRadius = '4px';
                notification.style.zIndex = '1000';
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 500);
                }, 2000);
            });
        });
        
        // Initialize language based on localStorage or default to English
        const savedLanguage = localStorage.getItem('language') || 'en';
        
        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === savedLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
});
