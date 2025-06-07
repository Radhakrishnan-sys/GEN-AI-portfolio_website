// Theme Toggle Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle buttons
    const themeToggleNav = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    applyTheme(savedTheme);
    
    // Add click event listeners to theme toggle buttons
    if (themeToggleNav) {
        themeToggleNav.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    // Function to toggle between light and dark themes
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        
        // Save theme preference to localStorage
        localStorage.setItem('theme', newTheme);
    }
    
    // Function to apply theme to the document
    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        
        // Update theme toggle button icons
        updateThemeIcons(theme);
    }
    
    // Function to update theme toggle button icons
    function updateThemeIcons(theme) {
        const sunIcon = '<i class="fas fa-sun mr-1" aria-hidden="true"></i> Theme';
        const moonIcon = '<i class="fas fa-moon mr-1" aria-hidden="true"></i> Theme';
        
        if (themeToggleNav) {
            themeToggleNav.innerHTML = theme === 'light' ? sunIcon : moonIcon;
        }
        
        if (themeToggleMobile) {
            themeToggleMobile.innerHTML = theme === 'light' ? sunIcon : moonIcon;
        }
    }
});

