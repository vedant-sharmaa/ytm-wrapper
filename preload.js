const { ipcRenderer } = require('electron');

function createBackButton() {
  const backBtn = document.createElement('button');
  backBtn.textContent = '←';
  backBtn.style.position = 'fixed';
  backBtn.style.top = '10px';
  backBtn.style.right = '10px';
  backBtn.style.zIndex = '9999';
  backBtn.style.border = 'none';
  backBtn.style.borderRadius = '4px';
  backBtn.style.padding = '6px 10px';
  backBtn.style.fontSize = '18px';
  backBtn.style.cursor = 'pointer';
  backBtn.style.transition = 'all 0.3s ease';
  backBtn.title = 'Go Back';
  backBtn.onclick = () => ipcRenderer.send('go-back');

  document.body.appendChild(backBtn);
  return backBtn;
}

function updateButtonStyle(button) {
  const url = window.location.href;

  if (url.startsWith('https://accounts.google.com/')) {
    // In Google Sign-in page
    button.style.background = '#dcdcdc'; // solid light gray
    button.style.color = '#000000';      // black arrow
    button.style.backdropFilter = 'none';
  } else {
    // In other pages
    button.style.background = '#222';
    button.style.color = 'white';
  }
}


window.addEventListener('DOMContentLoaded', () => {
  // create draggable region div
  const dragRegion = document.createElement('div');
  dragRegion.id = 'drag-region';
  document.body.appendChild(dragRegion);

  const style = document.createElement('style');
    style.textContent = `
    #drag-region {
        position: fixed;
        top: 0;
        left: 80px; /* leave space for macOS window buttons */
        right: 0;
        height: 15px; /* height of draggable area */
        -webkit-app-region: drag;
        -webkit-user-select: none;
        z-index: 9999;
    }
    `;
    document.head.appendChild(style);


  const backBtn = createBackButton();
  updateButtonStyle(backBtn);

  // Also handle SPA navigation (URL changes without reload)
  const observer = new MutationObserver(() => updateButtonStyle(backBtn));
  observer.observe(document.body, { childList: true, subtree: true });

  // Media key handlers (optional)
  ipcRenderer.on('media-play-pause', () => {
    const btn = document.querySelector('button[title="Play"], button[title="Pause"]');
    if (btn) btn.click();
  });
  ipcRenderer.on('media-next', () => {
    const btn = document.querySelector('tp-yt-paper-icon-button[title="Next"]');
    if (btn) btn.click();
  });
  ipcRenderer.on('media-previous', () => {
    const btn = document.querySelector('tp-yt-paper-icon-button[title="Previous"]');
    if (btn) btn.click();
  });
});


// Optionally, expose a safe API for future use
contextBridge.exposeInMainWorld('electronAPI', {});


