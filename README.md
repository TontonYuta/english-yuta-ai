<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# English Reading AI - Linux Desktop & Web App

Nền tảng học đọc tiếng Anh thông minh qua phương pháp cụm từ (Lexical Chunks) kèm nghĩa tiếng Việt, phát âm và bài tập tương tác.

---

## 🐧 Hướng dẫn sử dụng trên Linux

### 1. Chạy nhanh ứng dụng đã build
Bạn có thể mở ứng dụng ngay lập tức bằng các cách sau:

- **Cách 1 (Khuyên dùng)**: Mở từ App Launcher / Menu ứng dụng của Linux với tên **"English Reading AI"**.
- **Cách 2**: Chạy script khởi động:
  ```bash
  ./start-linux-app.sh
  ```
- **Cách 3**: Chạy file AppImage trực tiếp:
  ```bash
  ./release/"English Reading AI-1.0.0.AppImage"
  ```
- **Cách 4**: Cài đặt gói `.deb` vào hệ thống (Ubuntu / Debian / Linux Mint):
  ```bash
  sudo dpkg -i release/english-reading-ai_1.0.0_amd64.deb
  ```

---

### 2. Các lệnh phát triển và build (Development & Build)

- **Cài đặt thư viện**:
  ```bash
  npm install
  ```
- **Chạy chế độ Desktop Development**:
  ```bash
  npm run start
  ```
- **Chạy chế độ Web Dev Server**:
  ```bash
  npm run dev
  ```
- **Build lại toàn bộ ứng dụng Linux (AppImage + .deb + unpacked)**:
  ```bash
  npm run app:build
  ```
- **Chỉ build AppImage**:
  ```bash
  npm run app:build:appimage
  ```
- **Chỉ build file .deb**:
  ```bash
  npm run app:build:deb
  ```

---

## 📁 Cấu trúc các file build Desktop trong thư mục `release/`
- [English Reading AI-1.0.0.AppImage](file:///home/tontonyuta/Downloads/english-reading-ai/release/English%20Reading%20AI-1.0.0.AppImage): File thực thi di động, chạy được trên mọi distro Linux không cần cài đặt.
- [english-reading-ai_1.0.0_amd64.deb](file:///home/tontonyuta/Downloads/english-reading-ai/release/english-reading-ai_1.0.0_amd64.deb): Gói cài đặt chuẩn `.deb` cho Debian/Ubuntu.
- [english-reading-ai-1.0.0.apk](file:///home/tontonyuta/Downloads/english-reading-ai/release/english-reading-ai-1.0.0.apk): Gói cài đặt ứng dụng Android APK (Release signed).
- [release/linux-unpacked/](file:///home/tontonyuta/Downloads/english-reading-ai/release/linux-unpacked): Thư mục binary giải nén sẵn cho Linux.

---

## 📱 Build bản Android APK

- **Build lại bản APK Android**:
  ```bash
  npm run build
  npx cap sync android
  cd android && ./gradlew assembleRelease
  ```


