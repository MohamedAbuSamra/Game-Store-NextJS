'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from '../../context/ToastContext';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from 'next-themes';
import ClientNavbarWrapper from '../navbar/ClientNavbarWrapper';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function AuthRedirectListener() {
  const router = useRouter();
  useEffect(() => {
    const handler = () => {
      router.replace('/logout');
    };
    window.addEventListener('auth-logout', handler);
    return () => window.removeEventListener('auth-logout', handler);
  }, [router]);
  return null;
}

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthRedirectListener />
            <nav aria-label="Main navigation">
              <ClientNavbarWrapper />
            </nav>
            <main id="main-content" role="main" className="flex-1">
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
} 