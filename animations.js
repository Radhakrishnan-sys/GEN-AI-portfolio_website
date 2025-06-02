/**
 * Enhanced Gen AI Animations for Portfolio Website
 * 
 * This file contains custom animations specifically designed for a Gen AI portfolio
 * with neural network visualizations, particle effects, and interactive elements.
 */

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize particles.js for neural network background
    initNeuralParticles();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize 3D tilt effect
    initTiltEffect();
    
    // Initialize theme toggle animation
    initThemeToggle();
});

// Neural network particle animation
function initNeuralParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6366f1"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6366f1",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Typing animation for hero section
function initTypingAnimation() {
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        // Create wrapper for typing animation
        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'typing-animation';
        heroTitle.parentNode.insertBefore(typingWrapper, heroTitle);
        
        // Create elements for typing animation
        const staticText = document.createElement('span');
        staticText.className = 'static-text';
        staticText.innerHTML = '<span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Generative AI</span> ';
        
        const dynamicTextWrapper = document.createElement('span');
        dynamicTextWrapper.className = 'dynamic-text-wrapper';
        
        const dynamicText = document.createElement('span');
        dynamicText.className = 'dynamic-text';
        
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.innerHTML = '';
        
        // Append elements
        dynamicTextWrapper.appendChild(dynamicText);
        dynamicTextWrapper.appendChild(cursor);
        typingWrapper.appendChild(staticText);
        typingWrapper.appendChild(dynamicTextWrapper);
        
        // Words to type
        const words = ['Engineer', 'Developer', 'Researcher', 'Innovator'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        // Typing function
        function type() {
            const currentWord = words[wordIndex];
            const typingSpeed = isDeleting ? 80 : 150;
            
            if (!isDeleting && charIndex < currentWord.length) {
                dynamicText.textContent += currentWord.charAt(charIndex);
                charIndex++;
            } else if (isDeleting && charIndex > 0) {
                dynamicText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            } else if (charIndex === currentWord.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(function() {
                    type();
                }, 2000);
                return;
            }
            
            const timeout = isEnd ? 2000 : typingSpeed;
            isEnd = false;
            
            setTimeout(function() {
                type();
            }, timeout);
        }
        
        // Start typing animation
        setTimeout(function() {
            type();
        }, 1000);
    }
}

// Floating animation for elements
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(element => {
        // Random animation duration between 3-5s
        const duration = 3 + Math.random() * 2;
        // Random animation delay
        const delay = Math.random() * 1;
        
        element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Add floating keyframes if not already in stylesheet
    if (!document.querySelector('#floating-keyframes')) {
        const style = document.createElement('style');
        style.id = 'floating-keyframes';
        style.innerHTML = `
            @keyframes floating {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Neural network connection animation on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Animate sections based on scroll position
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionTop - windowHeight * 0.75 && 
                scrollPosition < sectionTop + sectionHeight) {
                section.classList.add('section-active');
            } else {
                section.classList.remove('section-active');
            }
        });
    });
    
    // Add section transition styles if not already in stylesheet
    if (!document.querySelector('#section-transition-styles')) {
        const style = document.createElement('style');
        style.id = 'section-transition-styles';
        style.innerHTML = `
            .section-transition {
                position: relative;
                overflow: hidden;
            }
            
            .section-transition::before {
                content: '';
                position: absolute;
                top: -50px;
                left: 0;
                width: 100%;
                height: 50px;
                background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.8));
                z-index: 1;
            }
            
            .section-active {
                animation: sectionFadeIn 0.8s ease-out forwards;
            }
            
            @keyframes sectionFadeIn {
                from { opacity: 0.8; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 3D tilt effect for cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.card-3d-effect');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateX(${-deltaY * 10}deg) rotateY(${deltaX * 10}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Enhanced theme toggle with AI-inspired animation
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Make theme toggle more visible
    if (themeToggle) {
        themeToggle.style.position = 'fixed';
        themeToggle.style.bottom = '30px';
        themeToggle.style.right = '30px';
        themeToggle.style.width = '60px';
        themeToggle.style.height = '60px';
        themeToggle.style.borderRadius = '50%';
        themeToggle.style.backgroundColor = '#ffffff';
        themeToggle.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        themeToggle.style.display = 'flex';
        themeToggle.style.alignItems = 'center';
        themeToggle.style.justifyContent = 'center';
        themeToggle.style.cursor = 'pointer';
        themeToggle.style.zIndex = '1000';
        themeToggle.style.transition = 'all 0.3s ease';
        
        // Add pulsing animation to make it more noticeable
        themeToggle.style.animation = 'pulse 2s infinite';
        
        // Add pulse keyframes if not already in stylesheet
        if (!document.querySelector('#pulse-keyframes')) {
            const style = document.createElement('style');
            style.id = 'pulse-keyframes';
            style.innerHTML = `
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Update icon based on current theme
        const updateThemeIcon = () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            themeToggle.innerHTML = isDark ? 
                '<i class="fas fa-sun text-yellow-500 text-2xl"></i>' : 
                '<i class="fas fa-moon text-indigo-500 text-2xl"></i>';
            
            // Update theme toggle appearance based on theme
            if (isDark) {
                themeToggle.style.backgroundColor = '#1f2937';
                themeToggle.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.15)';
            } else {
                themeToggle.style.backgroundColor = '#ffffff';
                themeToggle.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            }
        };
        
        updateThemeIcon();
        
        // Toggle theme on click
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add transition effect
            body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            
            // Update theme
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateThemeIcon();
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'theme-toggle-ripple';
            ripple.style.position = 'fixed';
            ripple.style.top = '0';
            ripple.style.left = '0';
            ripple.style.width = '100vw';
            ripple.style.height = '100vh';
            ripple.style.backgroundColor = newTheme === 'dark' ? '#1f2937' : '#ffffff';
            ripple.style.opacity = '0';
            ripple.style.zIndex = '-1';
            ripple.style.transition = 'opacity 0.5s ease';
            
            document.body.appendChild(ripple);
            
            // Trigger ripple animation
            setTimeout(() => {
                ripple.style.opacity = '0.3';
                setTimeout(() => {
                    ripple.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(ripple);
                    }, 500);
                }, 500);
            }, 10);
        });
        
        // Add tooltip to make it more intuitive
        const tooltip = document.createElement('div');
        tooltip.className = 'theme-toggle-tooltip';
        tooltip.textContent = 'Switch Theme';
        tooltip.style.position = 'absolute';
        tooltip.style.right = '70px';
        tooltip.style.backgroundColor = '#333';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '14px';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease';
        tooltip.style.whiteSpace = 'nowrap';
        
        themeToggle.appendChild(tooltip);
        
        themeToggle.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });
        
        themeToggle.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    }
}

// Add neural network brain visualization to hero section
function addNeuralNetworkVisualization() {
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.id = 'neural-network-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.1';
        
        heroSection.appendChild(canvas);
        
        // Neural network visualization code
        const ctx = canvas.getContext('2d');
        let width, height;
        
        function resizeCanvas() {
            width = canvas.width = heroSection.offsetWidth;
            height = canvas.height = heroSection.offsetHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Neural network nodes
        const nodes = [];
        const numNodes = 50;
        
        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                connected: []
            });
        }
        
        // Connect nodes
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const numConnections = Math.floor(Math.random() * 3) + 1;
            
            for (let j = 0; j < numConnections; j++) {
                const targetIndex = Math.floor(Math.random() * nodes.length);
                if (targetIndex !== i && !node.connected.includes(targetIndex)) {
                    node.connected.push(targetIndex);
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Update and draw nodes
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                
                // Update position
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
                
                // Draw connections
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
                ctx.lineWidth = 1;
                
                for (let j = 0; j < node.connected.length; j++) {
                    const targetNode = nodes[node.connected[j]];
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(targetNode.x, targetNode.y);
                    ctx.stroke();
                }
                
                // Draw node
                ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Initialize additional animations
window.addEventListener('load', function() {
    // Add neural network visualization
    addNeuralNetworkVisualization();
    
    // Add data flow animation
    addDataFlowAnimation();
});

// Data flow animation for AI theme
function addDataFlowAnimation() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Create data flow particles
        const dataFlow = document.createElement('div');
        dataFlow.className = 'data-flow-container';
        dataFlow.style.position = 'absolute';
        dataFlow.style.top = '0';
        dataFlow.style.left = '0';
        dataFlow.style.width = '100%';
        dataFlow.style.height = '100%';
        dataFlow.style.pointerEvents = 'none';
        dataFlow.style.zIndex = '0';
        dataFlow.style.overflow = 'hidden';
        
        section.style.position = 'relative';
        section.insertBefore(dataFlow, section.firstChild);
        
        // Create data particles
        const numParticles = 20;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '10px';
            particle.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.transform = 'translateY(0)';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            // Set animation
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animation = `dataFlow ${duration}s linear ${delay}s infinite`;
            
            dataFlow.appendChild(particle);
        }
    });
    
    // Add data flow keyframes if not already in stylesheet
    if (!document.querySelector('#data-flow-keyframes')) {
        const style = document.createElement('style');
        style.id = 'data-flow-keyframes';
        style.innerHTML = `
            @keyframes dataFlow {
                0% {
                    transform: translateY(-100px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: var(--opacity);
                }
                90% {
                    opacity: var(--opacity);
                }
                100% {
                    transform: translateY(calc(100vh + 100px)) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
