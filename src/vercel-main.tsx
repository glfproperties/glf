import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GoldenLeafApp from '@/components/glf/golden-leaf-app';
import '@/app/globals.css';

function slugFromLocation() {
  return window.location.pathname
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <GoldenLeafApp slug={slugFromLocation()} />
  </StrictMode>,
);
