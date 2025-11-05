'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

// Password strength checker
const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;

  if (strength <= 2) return { level: 'weak', label: 'Weak', color: 'bg-red-500' };
  if (strength <= 3) return { level: 'medium', label: 'Medium', color: 'bg-yellow-500' };
  return { level: 'strong', label: 'Strong', color: 'bg-green-500' };
};

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('test@assetworks.ai');
  const [password, setPassword] = useState('Test123456!');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(calculatePasswordStrength('Test123456!'));

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use redirect: false to handle errors properly
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('SignIn result:', result);

      if (result?.error) {
        // Show specific error
        console.error('SignIn error:', result.error);
        toast.error(result.error === 'CredentialsSignin'
          ? 'Invalid email or password'
          : result.error);
        setLoading(false);
      } else {
        // If no error, assume success and redirect
        console.log('SignIn successful, redirecting to:', callbackUrl);
        toast.success('Welcome back!');

        // Multiple redirect approaches to ensure it works
        setTimeout(() => {
          window.location.href = callbackUrl;
        }, 100);

        // Backup redirect after 1 second if first doesn't work
        setTimeout(() => {
          if (window.location.pathname === '/auth/signin') {
            console.log('First redirect failed, trying again...');
            window.location.replace(callbackUrl);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('SignIn error:', error);
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">AssetWorks</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordStrength(calculatePasswordStrength(e.target.value));
                    }}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength.level === 'weak' ? 'text-red-600' :
                        passwordStrength.level === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: passwordStrength.level === 'weak' ? '33%' :
                                 passwordStrength.level === 'medium' ? '66%' : '100%'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="mr-2 rounded w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm">Keep me logged in</span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" loading={loading}>
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground dark:text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}