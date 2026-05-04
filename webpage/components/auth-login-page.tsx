'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogoMark } from '@/components/logo'
import { Eye, EyeOff } from 'lucide-react'
import {
  ADMIN_CREDENTIALS,
  readAdminAuth,
  writeAdminAuth,
} from '@/lib/admin-auth'

type AuthLoginMode = 'user' | 'admin'

export function AuthLoginPage({ mode }: { mode: AuthLoginMode }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mode === 'user') {
      if (localStorage.getItem('plotkare_auth') === 'true') {
        router.replace('/dashboard')
      }
    } else if (readAdminAuth()) {
      router.replace('/admin/dashboard')
    }
  }, [router, mode])

  const handleSignIn = () => {
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsSigningIn(true)

    if (mode === 'admin') {
      const ok =
        email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
      if (ok) {
        writeAdminAuth()
        setTimeout(() => {
          router.replace('/admin/dashboard')
        }, 600)
        return
      }
      setTimeout(() => {
        setError('Invalid credentials')
        setIsSigningIn(false)
      }, 600)
      return
    }

    if (email === 'temp@temp.temp' && password === 'temp') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('plotkare_auth', 'true')
        localStorage.setItem('plotkare_session_email', email)
      }
      setTimeout(() => {
        router.replace('/dashboard')
      }, 600)
    } else {
      setTimeout(() => {
        setError('Invalid credentials')
        setIsSigningIn(false)
      }, 600)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSigningIn) {
      handleSignIn()
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
              handleSignIn()
            }}
            className="space-y-6"
          >
            <div>
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
            </div>

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
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 font-sans text-sm">{error}</p>}

            <button
              type="button"
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="w-full bg-[#C0392B] hover:bg-[#A93225] disabled:opacity-50 text-white font-sans text-base font-medium py-3 rounded-sm transition-colors mt-8"
            >
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="font-sans text-sm text-red-500 text-center">
            Use temp@temp.temp and password temp
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
