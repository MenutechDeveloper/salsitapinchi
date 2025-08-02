
  document.getElementById("link21").addEventListener("click", () => {
    const url = "https://lasalsitapinchi.com/app.html";

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => {
          showToast("Link copied to clipboard!");
        })
        .catch(() => {
          showToast("Failed to copy the link.");
        });
    } else {
      showToast("Clipboard API not supported by this browser.");
    }

    function showToast(message) {
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        opacity: 0;
        z-index: 9999;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(toast);
      requestAnimationFrame(() => {
        toast.style.opacity = "1";
      });
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
      }, 2000);
    }
  });

