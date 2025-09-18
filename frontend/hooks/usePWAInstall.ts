import { useState, useEffect } from 'react';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Empêche le mini-infobar de s'afficher sur mobile
      e.preventDefault();
      // Enregistre l'événement pour pouvoir le déclencher plus tard
      setDeferredPrompt(e);
      // Met à jour l'état pour indiquer que l'application est installable
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Vérifie si l'application est déjà installée
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    
    // Affiche l'invite d'installation
    deferredPrompt.prompt();
    
    // Attend que l'utilisateur réponde à l'invite
    const { outcome } = await deferredPrompt.userChoice;
    
    // Réinitialise la variable pour la prochaine fois
    setDeferredPrompt(null);
    
    // Cache l'option d'installation si l'utilisateur a installé l'application
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  return { isInstallable, installApp };
}
