'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-600 mb-6">Welcome Back!</h2>
          <p className="text-gray-600 mb-8">Ready to continue learning? 📚</p>
        </div>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-2 block w-full rounded-lg border-2 border-purple-300 px-4 py-3 text-purple-900 placeholder-purple-300 focus:border-purple-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-2 block w-full rounded-lg border-2 border-purple-300 px-4 py-3 text-purple-900 placeholder-purple-300 focus:border-purple-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full transform rounded-lg bg-purple-600 px-6 py-4 text-xl font-medium text-white transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : "Let's Learn! 🚀"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            New to Jibber Jabber?{' '}
            <Link href="/auth/register" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign up here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 