'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { LogoMark } from '@/components/logo'
import { Eye, EyeOff } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { getSiteUrl } from '@/lib/supabase/env'
import { loginSchema } from '@/lib/validation/auth'

type AuthLoginMode = 'user' | 'admin'

export function AuthLoginPage({ mode }: { mode: AuthLoginMode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createSupabaseBrowserClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(async ({ data }) => {
      if (!mounted || !data.user) return
      if (mode === 'admin') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle()
        if (profile?.role === 'admin') router.replace('/admin/dashboard')
        return
      }
      router.replace('/dashboard')
    })
    return () => {
      mounted = false
    }
  }, [router, mode, supabase])

  const redirectAfterLogin = () => {
    const next = searchParams.get('next')
    router.replace(next || (mode === 'admin' ? '/admin/dashboard' : '/dashboard'))
    router.refresh()
  }

  const handleSignIn = async () => {
    setError('')
    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please fill in all fields')
      return
    }

    setIsSigningIn(true)
    const { data, error: signInError } = await supabase.auth.signInWithPassword(parsed.data)

    if (signInError) {
      setError(signInError.message)
      setIsSigningIn(false)
      return
    }

    if (mode === 'admin') {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle()

      if (profileError || profile?.role !== 'admin') {
        await supabase.auth.signOut()
        setError('This account does not have admin access.')
        setIsSigningIn(false)
        return
      }
    }

    redirectAfterLogin()
  }

  const handleOAuth = async () => {
    setError('')
    setIsSigningIn(true)
    const next = mode === 'admin' ? '/admin/dashboard' : '/dashboard'
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (oauthError) {
      setError(oauthError.message)
      setIsSigningIn(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSigningIn) {
      void handleSignIn()
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center bg-[#0A1F12] p-8">
        <div className="text-center space-y-8">
          <LogoMark />
          <p className="font-serif text-xl italic text-white/80 max-w-xs">
            Your land, finally in safe hands.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-[#0D1A0F] px-6 py-12 min-h-screen">
        <div className="w-full max-w-[400px] space-y-8">
          <h1 className="font-serif text-4xl italic text-[#D4AF94]">Welcome Back.</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              void handleSignIn()
            }}
            className="space-y-6"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="your@email.com"
              disabled={isSigningIn}
              autoComplete="username"
              className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-white placeholder-white/40 focus:border-b-2 focus:border-[#C0392B] focus:outline-none transition-colors disabled:opacity-50"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Password"
                disabled={isSigningIn}
                autoComplete="current-password"
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-white placeholder-white/40 focus:border-b-2 focus:border-[#C0392B] focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-white/60 hover:text-white transition-colors disabled:opacity-50"
                disabled={isSigningIn}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 font-sans text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full bg-[#C0392B] hover:bg-[#A93225] disabled:opacity-50 text-white font-sans text-base font-medium py-3 rounded-sm transition-colors mt-8"
            >
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <button
            type="button"
            onClick={handleOAuth}
            disabled={isSigningIn}
            className="w-full rounded-sm border border-white/20 py-3 font-sans text-base font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            Continue with Google
          </button>

          <p className="font-sans text-sm text-white/70 text-center">
            <Link href="/forgot-password" className="text-white hover:text-[#D4AF94] font-medium transition-colors">
              Forgot password?
            </Link>
          </p>
          <p className="font-sans text-sm text-white/70 text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-white hover:text-[#D4AF94] font-medium transition-colors">
              Sign up →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
