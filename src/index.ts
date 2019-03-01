import { app, BrowserWindow, BrowserView } from 'electron';
import * as path from 'path';

let view: BrowserView;

function createWindow(i: number): BrowserWindow {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    x: 32 * (i),
    y: 24 * (i + 1)
  });
  win.loadFile(path.join(__dirname, `window.html`), {
    search: `n=${i + 1}`
  });

  win.on('focus', () => onWindowFocus(win));

  return win;
}

function onWindowFocus(win: BrowserWindow) {
  const viewWin = BrowserWindow.fromBrowserView(view);
  if (viewWin) {
    viewWin.setBrowserView(null as any); // null works, with encouragement
  }
  win.setBrowserView(view);
  const { width, height } = win.getContentBounds();
  view.setBounds({ x: 0, y: 0, width, height });
}

async function createWindows(n: number) {
  await app.whenReady();

  for (let i = 0; i < n; i++) {
    createWindow(i);
  }

  view = new BrowserView();
  view.webContents.loadURL('https://google.com/');
}

createWindows(4);