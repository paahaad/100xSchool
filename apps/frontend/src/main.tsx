import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@lms/components/theme-provider';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      <App />
    </ThemeProvider>
  </StrictMode>
);
