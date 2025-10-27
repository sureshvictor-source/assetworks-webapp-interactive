'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, ShieldOff } from 'lucide-react';

export default function DevLoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Only work in development mode
    if (process.env.NODE_ENV !== 'development') {
      setStatus('error');
      setErrorMessage('This page is only available in development mode');
      return;
    }

    // Auto-login with dev credentials
    const performAutoLogin = async () => {
      try {
        const result = await signIn('credentials', {
          email: 'dev@assetworks.ai',
          password: 'dev-bypass',
          redirect: false,
        });

        if (result?.error) {
          // If auth is not disabled, show error
          setStatus('error');
          setErrorMessage('Authentication bypass not enabled. Set DISABLE_AUTH=true in .env.local');
        } else if (result?.ok) {
          setStatus('success');
          // Redirect to financial playground after successful login
          setTimeout(() => {
            router.push('/financial-playground');
          }, 1000);
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage('Failed to perform auto-login');
      }
    };

    performAutoLogin();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Warning Banner */}
          <div className="mb-8 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <ShieldOff className="w-6 h-6 text-yellow-600 mr-2" />
              <span className="font-bold text-yellow-800">Development Mode Only</span>
            </div>
            <p className="text-sm text-yellow-700">
              Authentication is bypassed for development. Never use this in production!
            </p>
          </div>

          {/* Status Display */}
          {status === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
              <h2 className="text-xl font-semibold text-gray-900">
                Auto-logging in as Development User...
              </h2>
              <p className="text-gray-600">
                Bypassing authentication for development
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Login Successful!
              </h2>
              <p className="text-gray-600">
                Redirecting to Financial Playground...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
              <h2 className="text-xl font-semibold text-gray-900">
                Auto-login Failed
              </h2>
              <p className="text-red-600">
                {errorMessage}
              </p>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>To enable development bypass:</strong>
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>Add <code className="bg-gray-200 px-1 rounded">DISABLE_AUTH=true</code> to .env.local</li>
                  <li>Restart the development server</li>
                  <li>Visit <code className="bg-gray-200 px-1 rounded">/dev-login</code> again</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}