/**
 * Theme initialization script
 * This script is injected into the HTML head to prevent theme flash on page load
 * It runs before React hydration to apply the correct theme immediately
 */

export const themeScript = `
(function() {
  try {
    const storageKey = 'theme';
    const theme = localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = theme || systemTheme;
    
    // Apply theme class
    document.documentElement.classList.add(activeTheme);
    
    // Set color-scheme for native browser elements (scrollbars, form controls, etc.)
    document.documentElement.style.colorScheme = activeTheme;
    
    // Prevent transition on page load
    document.documentElement.classList.add('no-transition');
    window.addEventListener('load', function() {
      setTimeout(function() {
        document.documentElement.classList.remove('no-transition');
      }, 0);
    });
  } catch (e) {
    console.error('Error loading theme:', e);
  }
})();
`;

/**
 * Get the theme script as a string for dangerouslySetInnerHTML
 */
export function getThemeScript(): string {
  return themeScript;
}

/**
 * Create a script element with the theme initialization code
 * Useful if you want to inject it programmatically
 */
export function createThemeScriptElement(): HTMLScriptElement {
  if (typeof document === 'undefined') {
    throw new Error('createThemeScriptElement can only be called in the browser');
  }
  
  const script = document.createElement('script');
  script.innerHTML = themeScript;
  return script;
}



