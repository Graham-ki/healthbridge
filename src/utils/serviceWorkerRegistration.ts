if (typeof window !== 'undefined' && 'serviceWorker' in navigator && (window as any).workbox !== undefined) {
const wb = (window as any).workbox;
  
  // Add event listeners to handle PWA lifecycle
  wb.addEventListener('installed', (event: { isUpdate: boolean }) => {
    if (event.isUpdate) {
      // If it's an update, show refresh prompt
      if (confirm('New version available! Click OK to refresh.')) {
        window.location.reload();
      }
    }
  });

  wb.addEventListener('controlling', () => {
    window.location.reload();
  });

  // Register the service worker after the content is loaded
  if (document.readyState === 'complete') {
    wb.register();
  } else {
    window.addEventListener('load', () => {
      wb.register();
    });
  }
}