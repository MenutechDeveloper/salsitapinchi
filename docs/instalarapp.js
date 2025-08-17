let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');

  // Referencias a la animación
  const overlay = document.getElementById('installOverlay');
  const text = document.getElementById('installText');
  const fillLogo = document.querySelector('.logo-fill');

  // Guardar evento cuando el navegador detecta que la PWA es instalable
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.add('instalable'); // opcional para estilos
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted to install the app');

        // Mostrar overlay y animación
        overlay.style.display = 'flex';
        text.textContent = 'Descargando...';

        // Reiniciar progreso
        fillLogo.style.transition = "none";
        fillLogo.style.clipPath = "inset(100% 0 0 0)";

        setTimeout(() => {
          text.textContent = 'Instalando...';
          fillLogo.style.transition = "clip-path 3s linear";
          fillLogo.style.clipPath = "inset(0 0 0 0)";
        }, 800);

        setTimeout(() => { text.textContent = 'Instalación completada ✅'; }, 4000);

        setTimeout(() => { overlay.style.display = 'none'; }, 5500);

      } else {
        console.log('❌ User declined installation');
      }

      deferredPrompt = null;
    } else {
      alert('Esta app ya está instalada');
    }
  });
});
