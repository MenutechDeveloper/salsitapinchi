let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');

  // ANIMACIÓN
  const anim = document.getElementById('installAnimation');
  const text = document.getElementById('installText');
  const fillWrapper = document.querySelector('.logo-fill-wrapper');
  const fillImg = document.querySelector('.logo-fill');

  // Evento que detecta si la PWA se puede instalar
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.add('instalable');
  });

  // Al hacer clic en el botón de instalación
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Muestra el prompt primero
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted to install the app');

        // MOSTRAR ANIMACIÓN solo si aceptó instalar
        if (anim && text && fillWrapper && fillImg) {
          anim.style.display = 'flex';
          text.textContent = 'Descargando...';

          // Animación tipo “revelado” del fill
          fillImg.style.webkitMaskSize = '100% 0%';
          fillImg.style.maskSize = '100% 0%';

          setTimeout(() => {
            text.textContent = 'Instalando...';
            fillImg.style.webkitMaskSize = '100% 100%';
            fillImg.style.maskSize = '100% 100%';
          }, 500);

          setTimeout(() => {
            text.textContent = 'Instalación completada ✅';
          }, 3500);

          setTimeout(() => {
            anim.style.display = 'none';
          }, 5000);
        }

      } else {
        console.log('❌ User declined the installation');
      }

      deferredPrompt = null;
    } else {
      alert('This app is already installed');
    }
  });
});

// Inicializa Firebase Messaging
const messaging = firebase.messaging();

messaging.requestPermission()
  .then(() => messaging.getToken({ vapidKey: 'BBWGV_mbSdoU8vi0Al-d79Dg4o02LUncG8Gqt4FUnhvKLk5TdNi' }))
  .then((currentToken) => { if(currentToken) console.log('✅ Token del usuario:', currentToken); })
  .catch((err) => console.error('❌ Error al obtener el token:', err));

messaging.onMessage((payload) => {
  console.log('🔔 Mensaje recibido en primer plano:', payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon.png'
  });
});
