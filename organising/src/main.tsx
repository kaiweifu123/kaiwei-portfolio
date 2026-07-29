import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {startButtonSounds} from './uiSounds.ts';

declare global {
  interface Window {
    __finishPageLoader?: () => void;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

startButtonSounds();

if (document.readyState === 'complete') {
  window.__finishPageLoader?.();
} else {
  window.addEventListener('load', () => window.__finishPageLoader?.(), { once: true });
}
