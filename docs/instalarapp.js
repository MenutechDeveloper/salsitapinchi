let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');

  // Elementos de animación
  const anim = document.getElementById('installAnimation');
  const text = document.getElementById('installText');
  const video = document.getElementById('installVideo');

  // Evento que detecta si la PWA se puede instalar
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.add('instalable');
  });

  // Al hacer clic en el botón de instalación
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted to install the app');

        // MOSTRAR ANIMACIÓN
        if(anim && text && video){
          anim.style.display = 'flex';
          text.textContent = 'Instalando...';

          // Reiniciar video
          video.currentTime = 0;
          video.style.opacity = "1";
          video.play();

          // Fade out después de 3s
          setTimeout(() => {
            video.style.opacity = "0";
            text.textContent = 'Instalación completada ✅';
          }, 3000);

          // Ocultar animación después de 4s
          setTimeout(() => {
            anim.style.display = 'none';
          }, 4000);
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
