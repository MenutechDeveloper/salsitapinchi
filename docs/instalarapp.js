let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');

  // ANIMACIÓN
  const anim = document.getElementById('installAnimation');
  const text = document.getElementById('installText');
  const fillWrapper = document.querySelector('.logo-fill-wrapper');

  // Evento que detecta si la PWA se puede instalar
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Opcional: clase para indicar que está activo
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
        if(anim && text && fillWrapper){
          anim.style.display = 'flex';
          text.textContent = 'Descargando...';

          // Animación del fill de abajo hacia arriba
          fillWrapper.style.height = '0%';
          setTimeout(() => { 
            text.textContent = 'Instalando...'; 
            fillWrapper.style.transition = 'height 3s ease-in-out';
            fillWrapper.style.height = '100%'; 
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
