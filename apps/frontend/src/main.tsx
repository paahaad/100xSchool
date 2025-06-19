import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@lms/components/theme-provider';
import { Toaster } from '@lms/components/ui/sonner';
import App from './app/app';
import { AuthProvider } from './contexts/auth.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <App />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
