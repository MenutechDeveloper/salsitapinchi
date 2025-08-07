let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');

  // El navegador lanza este evento SOLO si la PWA es instalable
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Opcional:clase para indicar que está activo
    installBtn.classList.add('instalable');
  });

  // Al hacer clic en el botón
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

   if (choiceResult.outcome === 'accepted') {
  console.log('✅ User accepted to install the app');
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
  .then(() => {
    // Obtiene el token único del dispositivo
    return messaging.getToken({
      vapidKey: 'BBWGV_mbSdoU8vi0Al-d79Dg4o02LUncG8Gqt4FUnhvKLk5TdNi'
    });
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log('✅ Token del usuario:', currentToken);
      // Puedes guardarlo en tu servidor o mostrarlo en pantalla
    } else {
      console.warn('⚠️ No se obtuvo token. Revisa los permisos.');
    }
  })
  .catch((err) => {
    console.error('❌ Error al obtener el token:', err);
  });

// Recibir mensajes cuando la PWA esté en primer plano
messaging.onMessage((payload) => {
  console.log('🔔 Mensaje recibido en primer plano:', payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon.png'
  });
});









