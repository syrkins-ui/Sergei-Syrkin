import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress and dismiss Google Maps development purpose popups/banners if injected by the API
if (typeof window !== 'undefined') {
  const dismissDevElements = () => {
    // 1. Hide Google Maps error containers and dev banners
    const devSelectors = [
      '.gm-err-container',
      '.gm-err-content',
      '.gm-err-autocomplete',
      '.dismissButton',
      'div[class*="gm-err"]'
    ];
    document.querySelectorAll(devSelectors.join(',')).forEach((el) => {
      (el as HTMLElement).style.setProperty('display', 'none', 'important');
    });

    // 2. Hide any top banner or floating dialog containing "development" or "разработки"
    document.querySelectorAll('div, dialog, p, span').forEach((node) => {
      const text = node.textContent?.toLowerCase() || '';
      if (
        (text.includes('только для целей разработки') ||
         text.includes('development purposes only') ||
         text.includes('целей разработки')) &&
        node.children.length === 0
      ) {
        const modal = node.closest('[role="dialog"]') ||
                      node.closest('div[style*="position: fixed"]') ||
                      node.closest('div[style*="position: absolute"]') ||
                      node.parentElement;
        if (modal && modal !== document.body && modal !== document.getElementById('root')) {
          (modal as HTMLElement).style.setProperty('display', 'none', 'important');
        }
      }
    });
  };

  const observer = new MutationObserver(dismissDevElements);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', dismissDevElements);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
