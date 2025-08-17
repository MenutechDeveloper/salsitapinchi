let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');

  // ANIMACIÓN
  const anim = document.getElementById('installAnimation');
  const text = document.getElementById('installText');
  const fillLogo = document.querySelector('.logo-fill');

  // El navegador lanza este evento SOLO si la PWA es instalable
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Opcional: clase para indicar que está activo
    installBtn.classList.add('instalable');
  });

  // Al hacer clic en el botón
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Mostrar prompt nativo primero
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted to install the app');

        // MOSTRAR ANIMACIÓN SOLO SI ACEPTÓ
        if(anim && text && fillLogo){
          anim.style.display = 'block';
          text.textContent = 'Descargando...';

          // Reiniciar progreso
          fillLogo.style.clipPath = "inset(100% 0 0 0)";

          // Progreso simulado
          setTimeout(() => {
            text.textContent = 'Instalando...';
            fillLogo.style.transition = "clip-path 3s linear";
            fillLogo.style.clipPath = "inset(0 0 0 0)";
          }, 1000);

          setTimeout(() => { text.textContent = 'Descarga completada ✅'; }, 4500);

          setTimeout(() => { anim.style.display = 'none'; }, 6000);
        }

      } else {
        console.log('❌ User declined the installation');
      }

      deferredPrompt = null;
    } else {
      // Si no hay instalación disponible
      alert('This app is already installed');
    }
  });
});

// Inicializa Firebase Messaging
const messaging = firebase.messaging();

// Solicita permiso para recibir notificaciones
messaging.requestPermission()
  .then(() => messaging.getToken({ vapidKey: 'BBWGV_mbSdoU8vi0Al-d79Dg4o02LUncG8Gqt4FUnhvKLk5TdNi' }))
  .then((currentToken) => { if(currentToken) console.log('✅ Token del usuario:', currentToken); })
  .catch((err) => console.error('❌ Error al obtener el token:', err));

// Recibir mensajes cuando la PWA esté en primer plano
messaging.onMessage((payload) => {
  console.log('🔔 Mensaje recibido en primer plano:', payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon.png'
  });
});








