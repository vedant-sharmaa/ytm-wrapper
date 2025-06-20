# YTM-Wrapper

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Platform: macOS](https://img.shields.io/badge/Platform-macOS-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

⭐️ If you find this helpful, please **star this repo** — it helps others discover it!

---

YTM-Wrapper is a simple Electron-based macOS wrapper for YouTube Music, designed to allow **background playback** even when the window is closed. It supports media keys, system tray controls, and seamless playback without interruption.

---

## 🚀 Features

- 🎵 Background playback (music continues when window is closed)
- 🎹 Media key support (Play/Pause, Next, Previous)
- 🖥 System tray with playback controls and app visibility toggle
- ⬅️ Custom back button and navigation support
- 🌙 macOS native look and feel with vibrancy and dark mode

---

## ❓ Why?

Unlike the web version or its installable PWA (Progressive Web App), this app allows your music to **continue playing** even when the app window is closed. Playback stops only when you explicitly quit the app.

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vedant-sharmaa/ytm-wrapper.git
   cd ytm-wrapper
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the app (for development):
    ```bash
    npm start
    ```

4. Build the app (creates a macOS app):
    ```bash
    npm run build
    ```

5. Once built, move the generated ```.app``` file (usually inside the ```YT Music Mac App-darwin-arm64``` folder) to your ```Applications``` folder for easy access.
    ```bash
    mv YT\ Music\ Mac\ App-darwin-arm64/YT\ Music\ Mac\ App.app /Applications/
    ```

---

## 🙏 Attribution
Icon made by [mayor-icons](https://www.flaticon.com/authors/mayor-icons) from [www.flaticon.com](https://www.flaticon.com/)

---

## 📬 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
