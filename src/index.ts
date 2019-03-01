import { app, BrowserWindow, BrowserView } from 'electron';
import * as path from 'path';

let windows: BrowserWindow[];
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

  win.on('closed', () => onWindowClosed(win));
  win.on('focus', () => onWindowFocus(win));

  return win;
}

function onWindowClosed(win: BrowserWindow) {
  const index = windows.indexOf(win);
  if (index >= 0) {
    windows.splice(index, 1);
  }
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

  windows = [...new Array(n)].map((_, i) => createWindow(i));

  view = new BrowserView();
  view.webContents.loadURL('https://google.com/');
}

createWindows(4);