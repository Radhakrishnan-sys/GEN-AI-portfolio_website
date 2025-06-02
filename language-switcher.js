// Language Switcher Component
// This script handles the language switching functionality

class LanguageSwitcher {
    constructor(options = {}) {
        this.defaultLanguage = options.defaultLanguage || 'en';
        this.availableLanguages = options.availableLanguages || ['en', 'de'];
        this.translations = options.translations || {};
        this.currentLanguage = localStorage.getItem('language') || this.defaultLanguage;
        
        this.initSwitcher();
        this.setInitialLanguage();
    }
    
    initSwitcher() {
        // Create language switcher if it doesn't exist
        if (!document.querySelector('.language-switcher')) {
            const switcherHTML = `
                <div class="language-switcher">
                    ${this.availableLanguages.map(lang => 
                        `<div class="language-option${lang === this.currentLanguage ? ' active' : ''}" data-lang="${lang}">${lang.toUpperCase()}</div>`
                    ).join('')}
                </div>
            `;
            
            const switcherContainer = document.createElement('div');
            switcherContainer.innerHTML = switcherHTML;
            document.body.appendChild(switcherContainer.firstElementChild);
        }
        
        // Add event listeners to language options
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', () => this.switchLanguage(option.getAttribute('data-lang')));
        });
    }
    
    setInitialLanguage() {
        // Set active class on current language
        document.querySelectorAll('.language-option').forEach(option => {
            if (option.getAttribute('data-lang') === this.currentLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Apply translations if not English
        if (this.currentLanguage !== 'en') {
            this.applyTranslations(this.currentLanguage);
        }
    }
    
    switchLanguage(lang) {
        if (!this.availableLanguages.includes(lang)) return;
        
        // Update current language
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Update active class
        document.querySelectorAll('.language-option').forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Apply translations or reset to English
        if (lang === 'en') {
            this.resetToEnglish();
        } else {
            this.applyTranslations(lang);
        }
    }
    
    applyTranslations(lang) {
        // Store original content if not already stored
        if (!window.originalContent) {
            this.storeOriginalContent();
        }
        
        // In a real implementation, you would use the Google Translate API
        // or load translations from a JSON file
        
        // For demonstration purposes, we'll show an alert
        if (lang === 'de') {
            alert('Die Seite würde jetzt auf Deutsch übersetzt werden.');
            
            // Simulate translation by adding a prefix to some elements
            document.querySelectorAll('h1, h2, h3').forEach(el => {
                if (!el.innerHTML.startsWith('[DE] ')) {
                    el.innerHTML = '[DE] ' + el.innerHTML;
                }
            });
            
            // Update common UI elements
            const germanTranslations = {
                'Home': 'Startseite',
                'About': 'Über mich',
                'Skills': 'Fähigkeiten',
                'Blog': 'Blog',
                'Projects': 'Projekte',
                'Contact': 'Kontakt',
                'Read More': 'Weiterlesen',
                'Download Resume': 'Lebenslauf herunterladen',
                'Send Message': 'Nachricht senden',
                'Name': 'Name',
                'Email': 'E-Mail',
                'Message': 'Nachricht',
                'Submit': 'Absenden'
            };
            
            // Apply simple translations to common elements
            Object.keys(germanTranslations).forEach(englishText => {
                document.querySelectorAll('a, button, h1, h2, h3, h4, h5, h6, label, span').forEach(el => {
                    if (el.innerText === englishText) {
                        el.innerText = germanTranslations[englishText];
                    }
                });
            });
        }
    }
    
    resetToEnglish() {
        // Reset to original English content if available
        if (window.originalContent) {
            Object.keys(window.originalContent).forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((el, index) => {
                    if (window.originalContent[selector][index]) {
                        if (selector === 'input[placeholder]') {
                            el.setAttribute('placeholder', window.originalContent[selector][index]);
                        } else {
                            el.innerHTML = window.originalContent[selector][index];
                        }
                    }
                });
            });
        }
    }
    
    storeOriginalContent() {
        window.originalContent = {
            'h1, h2, h3, h4, h5, h6': [],
            'p': [],
            'a': [],
            'span': [],
            'button': [],
            'label': [],
            'input[placeholder]': []
        };
        
        // Store original text content
        Object.keys(window.originalContent).forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (selector === 'input[placeholder]') {
                    window.originalContent[selector].push(el.getAttribute('placeholder'));
                } else {
                    window.originalContent[selector].push(el.innerHTML);
                }
            });
        });
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.languageSwitcher = new LanguageSwitcher({
        defaultLanguage: 'en',
        availableLanguages: ['en', 'de']
    });
});
