// utils/analytics.js
export const initGA = () => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    
    // Add the Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-J8M10SL43W';
    document.head.appendChild(script);

    // Configure GA
    window.gtag('js', new Date());
    window.gtag('config', 'G-J8M10SL43W', {
      send_page_view: false // Disable automatic pageview tracking
    });
  }
};

export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_path: url,
      send_to: 'G-J8M10SL43W'
    });
  }
};