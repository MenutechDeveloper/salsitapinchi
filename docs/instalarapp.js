// ============================
// Script de instalación de PWA
// ============================

let deferredPrompt; // Evento de instalación diferido

// Detecta si la PWA es instalable
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("installContainer").style.display = "block"; // Muestra el botón de instalación
});

// Cuando el usuario da clic en el botón instalar
document.getElementById("installBtn").addEventListener("click", async () => {
  if (!deferredPrompt) {
    return;
  }

  // Mostrar animación de instalación falsa
  showInstallAnimation();

  // Esperar a que la animación se muestre antes de lanzar prompt real
  setTimeout(async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`El usuario eligió: ${outcome}`);
    deferredPrompt = null;
  }, 2500); // 2.5s para dar tiempo a que la animación se ejecute
});

// ====================================
// Función para mostrar animación logo
// ====================================
function showInstallAnimation() {
  const overlay = document.getElementById("installOverlay");
  const fill = document.querySelector(".logo-fill");

  // Mostrar overlay
  overlay.classList.remove("hidden");

  // Resetear fill
  fill.style.transition = "none";
  fill.style.transform = "translateY(-100%)";

  // Forzar reflow para reiniciar animación
  void fill.offsetWidth;

  // Iniciar animación de relleno
  fill.style.transition = "transform 2s linear";
  fill.style.transform = "translateY(0)";

  // Cuando termine la animación, ocultar overlay
  fill.addEventListener("transitionend", () => {
    setTimeout(() => {
      overlay.classList.add("hidden"); // 👈 Oculta logo animado
    }, 500); // medio segundo extra para que se vea bien terminado
  }, { once: true });
}
