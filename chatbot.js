/**
 * Portfolio Chatbot Widget
 * A floating chat widget that uses RAG to answer questions about portfolio projects
 */

// Check if chatbot is already initialized to prevent duplicate instances
if (!window.portfolioChatbotInitialized) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeChatbot();
    });
    
    // Also initialize if DOM is already loaded
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        initializeChatbot();
    }
}

function initializeChatbot() {
    // Prevent multiple initializations
    if (window.portfolioChatbotInitialized) return;
    window.portfolioChatbotInitialized = true;
    
    // Initialize the chatbot
    window.portfolioChatbot = new PortfolioChatbot({
        defaultProvider: 'openai',
        mockResponses: true // Use mock responses for localhost testing
    });
    
    console.log('Chatbot initialized successfully');
}

class PortfolioChatbot {
    constructor(options = {}) {
        this.apiUrl = options.apiUrl || 'http://localhost:8000';
        this.provider = options.defaultProvider || 'openai';
        this.messages = [];
        this.isOpen = false;
        this.isTyping = false;
        this.mockResponses = options.mockResponses || false;
        
        this.initWidget();
        this.attachEventListeners();
        
        // Add notification badge
        setTimeout(() => {
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'flex';
            }
        }, 3000);
    }
    
    initWidget() {
        // Remove any existing chatbot widgets to prevent duplicates
        const existingWidget = document.querySelector('.chatbot-widget');
        if (existingWidget) {
            existingWidget.remove();
        }
        
        // Create widget HTML
        const widgetHTML = `
            <div class="chatbot-widget">
                <div class="chatbot-button" aria-label="Open AI Assistant chat" title="Chat with AI Assistant">
                    <i class="fas fa-comment-dots chatbot-icon" aria-hidden="true"></i>
                    <div class="notification-badge" aria-label="1 new message">1</div>
                </div>
                <div class="chatbot-container">
                    <div class="chatbot-header">
                        <div class="chatbot-title">
                            <i class="fas fa-robot" aria-hidden="true"></i> AI Assistant
                        </div>
                        <div class="chatbot-close" aria-label="Close chat" title="Close chat">×</div>
                    </div>
                    <div class="chatbot-provider-selector">
                        <div class="provider-option ${this.provider === 'openai' ? 'active' : ''}" data-provider="openai" role="button" aria-label="Select OpenAI model" title="Use OpenAI model">OpenAI</div>
                        <div class="provider-option ${this.provider === 'huggingface' ? 'active' : ''}" data-provider="huggingface" role="button" aria-label="Select Hugging Face model" title="Use Hugging Face model">Hugging Face</div>
                    </div>
                    <div class="chatbot-messages" aria-live="polite"></div>
                    <div class="chatbot-input-container">
                        <input type="text" class="chatbot-input" placeholder="Ask me anything..." aria-label="Type your message">
                        <div class="chatbot-send" role="button" aria-label="Send message" title="Send message">
                            <i class="fas fa-paper-plane" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add widget to body
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = widgetHTML;
        document.body.appendChild(widgetContainer.firstElementChild);
        
        // Add welcome message
        this.addBotMessage("Hi there! I'm your AI assistant. I can answer questions about my projects, skills, and experience. What would you like to know?");
    }
    
    attachEventListeners() {
        // Toggle chatbot
        const chatbotButton = document.querySelector('.chatbot-button');
        const chatbotContainer = document.querySelector('.chatbot-container');
        const chatbotClose = document.querySelector('.chatbot-close');
        
        if (chatbotButton) {
            chatbotButton.addEventListener('click', () => {
                this.isOpen = !this.isOpen;
                chatbotContainer.classList.toggle('active', this.isOpen);
                
                // Remove notification badge when opened
                const badge = document.querySelector('.notification-badge');
                if (badge) {
                    badge.style.display = 'none';
                }
            });
        }
        
        if (chatbotClose) {
            chatbotClose.addEventListener('click', () => {
                this.isOpen = false;
                chatbotContainer.classList.remove('active');
            });
        }
        
        // Send message on button click
        const sendButton = document.querySelector('.chatbot-send');
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        // Send message on Enter key
        const inputField = document.querySelector('.chatbot-input');
        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        
        // Switch provider
        const providerOptions = document.querySelectorAll('.provider-option');
        providerOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Update active class
                providerOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Update provider
                this.provider = option.dataset.provider;
                
                // Add system message about provider change
                this.addBotMessage(`Switched to ${this.provider === 'openai' ? 'OpenAI' : 'Hugging Face'} model.`);
            });
        });
    }
    
    sendMessage() {
        const inputField = document.querySelector('.chatbot-input');
        if (!inputField) return;
        
        const message = inputField.value.trim();
        
        if (message) {
            // Add user message to chat
            this.addUserMessage(message);
            
            // Clear input field
            inputField.value = '';
            
            // Show typing indicator
            this.showTypingIndicator();
            
            if (this.mockResponses) {
                // Use mock responses for localhost testing
                setTimeout(() => {
                    this.handleMockResponse(message);
                }, 1000);
            } else {
                // Send message to API
                this.callChatAPI(message);
            }
        }
    }
    
    handleMockResponse(message) {
        const responses = [
            "I'm working on implementing RAG for better context-aware responses.",
            "That's an interesting question about AI. I specialize in LLMs and NLP technologies.",
            "I've worked on several projects involving generative AI and vector databases.",
            "My portfolio showcases various AI applications including chatbots and semantic search systems.",
            "I'd be happy to discuss potential collaboration on AI projects."
        ];
        
        // Choose a response based on the message content or randomly
        let response;
        if (message.toLowerCase().includes('project')) {
            response = "I've worked on several AI projects including RAG-powered chatbots, semantic search engines, and computer vision applications.";
        } else if (message.toLowerCase().includes('skill')) {
            response = "My skills include working with large language models, vector databases, Python, JavaScript, and various AI frameworks.";
        } else if (message.toLowerCase().includes('contact')) {
            response = "You can contact me through the contact form on this website or via email at contact@aiengineer.com.";
        } else {
            // Random response
            response = responses[Math.floor(Math.random() * responses.length)];
        }
        
        this.addBotMessage(response);
    }
    
    addUserMessage(message) {
        const messagesContainer = document.querySelector('.chatbot-messages');
        if (!messagesContainer) return;
        
        const time = this.formatTime(new Date());
        
        const messageHTML = `
            <div class="message user">
                ${message}
                <div class="message-time">${time}</div>
            </div>
        `;
        
        messagesContainer.innerHTML += messageHTML;
        this.scrollToBottom();
        
        // Add to messages array
        this.messages.push({
            role: 'user',
            content: message,
            time: time
        });
    }
    
    addBotMessage(message, sources = []) {
        const messagesContainer = document.querySelector('.chatbot-messages');
        if (!messagesContainer) return;
        
        const time = this.formatTime(new Date());
        
        // Create sources HTML if there are sources
        let sourcesHTML = '';
        if (sources && sources.length > 0) {
            sourcesHTML = `
                <div class="message-sources">
                    <div>Sources:</div>
                    ${sources.map(source => `<div class="source-item">• ${source.title}</div>`).join('')}
                </div>
            `;
        }
        
        const messageHTML = `
            <div class="message bot">
                ${message}
                ${sourcesHTML}
                <div class="message-time">${time}</div>
            </div>
        `;
        
        // Remove typing indicator if present
        this.hideTypingIndicator();
        
        messagesContainer.innerHTML += messageHTML;
        this.scrollToBottom();
        
        // Add to messages array
        this.messages.push({
            role: 'bot',
            content: message,
            sources: sources,
            time: time
        });
    }
    
    showTypingIndicator() {
        if (this.isTyping) return;
        
        const messagesContainer = document.querySelector('.chatbot-messages');
        if (!messagesContainer) return;
        
        const typingHTML = `
            <div class="typing-indicator" aria-label="AI is typing">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        messagesContainer.innerHTML += typingHTML;
        this.scrollToBottom();
        this.isTyping = true;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }
    
    scrollToBottom() {
        const messagesContainer = document.querySelector('.chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    async callChatAPI(question) {
        try {
            const response = await fetch(`${this.apiUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,
                    provider: this.provider
                })
            });
            
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            const data = await response.json();
            this.addBotMessage(data.answer, data.sources);
            
        } catch (error) {
            console.error('Error calling chat API:', error);
            this.hideTypingIndicator();
            this.addBotMessage("I'm sorry, I couldn't process your request. Please try again later.");
        }
    }
}
