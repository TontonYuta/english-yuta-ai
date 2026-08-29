const { app, BrowserWindow, shell, Menu, session } = require('electron');
const path = require('path');

// Clean Chrome User-Agent string to bypass Google OAuth "Couldn't sign you in - This browser or app may not be secure" detection
const CHROME_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

// Set fallback UA before app is ready so every window/webview/popup inherits standard Chrome headers
app.userAgentFallback = CHROME_UA;

// Command line switches to emulate standard Chrome and disable Electron automation flags
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('disable-features', 'UserAgentClientHint');

let mainWindow = null;

function setupCleanHeaders(sess) {
  if (!sess) return;
  sess.setUserAgent(CHROME_UA);
  sess.webRequest.onBeforeSendHeaders((details, callback) => {
    const headers = details.requestHeaders || {};
    headers['User-Agent'] = CHROME_UA;
    headers['sec-ch-ua'] = '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"';
    headers['sec-ch-ua-mobile'] = '?0';
    headers['sec-ch-ua-platform'] = '"Linux"';
    callback({ cancel: false, requestHeaders: headers });
  });
}

function createWindow() {
  // Configure persistent sessions for AI providers (Gemini, ChatGPT, Claude, etc.)
  const geminiSession = session.fromPartition('persist:gemini-session');
  const aiSession = session.fromPartition('persist:ai-session');

  setupCleanHeaders(session.defaultSession);
  setupCleanHeaders(geminiSession);
  setupCleanHeaders(aiSession);

  geminiSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });
  aiSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });

  mainWindow = new BrowserWindow({
    width: 1480,
    height: 920,
    minWidth: 1024,
    minHeight: 650,
    title: 'English Reading AI - Song Song Với AI Assistant',
    icon: path.join(__dirname, '../build/icon.png'),
    backgroundColor: '#0c0a09',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webviewTag: true, // Enable <webview> tag for AI split view
    },
  });

  // Open external links in user's default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
        event.preventDefault();
        shell.openExternal(url);
      }
    }
  });

  // Build application menu
  const menuTemplate = [
    {
      label: 'Ứng dụng',
      submenu: [
        {
          label: 'Mở ChatGPT trên trình duyệt',
          click: () => {
            shell.openExternal('https://chatgpt.com');
          }
        },
        {
          label: 'Mở Google Gemini trên trình duyệt',
          click: () => {
            shell.openExternal('https://gemini.google.com');
          }
        },
        {
          label: 'Mở Google AI Studio',
          click: () => {
            shell.openExternal('https://aistudio.google.com');
          }
        },
        { type: 'separator' },
        {
          label: 'Thoát',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Xem & Giao diện',
      submenu: [
        { label: 'Tải lại giao diện', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: 'Buộc tải lại', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
        { label: 'Công cụ phát triển (DevTools)', accelerator: 'Ctrl+Shift+I', role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'Kích thước mặc định', role: 'resetZoom' },
        { label: 'Phóng to', role: 'zoomIn' },
        { label: 'Thu nhỏ', role: 'zoomOut' },
        { type: 'separator' },
        { label: 'Toàn màn hình', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Chỉnh sửa',
      submenu: [
        { label: 'Hoàn tác', role: 'undo' },
        { label: 'Làm lại', role: 'redo' },
        { type: 'separator' },
        { label: 'Cắt', role: 'cut' },
        { label: 'Sao chép', role: 'copy' },
        { label: 'Dán', role: 'paste' },
        { label: 'Chọn tất cả', role: 'selectAll' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Load URL or built index.html
  const devServerUrl = process.env.VITE_DEV_SERVER_URL;
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Ensure webviews inside app have Chrome User Agent and proper handlers
app.on('web-contents-created', (event, contents) => {
  contents.setUserAgent(CHROME_UA);

  if (contents.getType() === 'webview') {
    contents.setUserAgent(CHROME_UA);
    contents.setWindowOpenHandler(({ url }) => {
      // Allow Google, OpenAI, Auth0, Apple login popups to open cleanly in child window
      if (
        url.includes('accounts.google.com') ||
        url.includes('openai.com') ||
        url.includes('chatgpt.com') ||
        url.includes('auth0.com') ||
        url.includes('google.com') ||
        url.includes('gemini.google.com') ||
        url.includes('claude.ai') ||
        url.includes('deepseek.com') ||
        url.includes('appleid.apple.com')
      ) {
        return { action: 'allow' };
      }
      shell.openExternal(url);
      return { action: 'deny' };
    });
  }
});

// Intercept new browser windows (popups for OAuth login) to force Chrome UA
app.on('browser-window-created', (event, window) => {
  window.webContents.setUserAgent(CHROME_UA);
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
