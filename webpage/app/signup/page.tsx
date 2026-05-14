'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogoMark } from '@/components/logo'
import { Eye, EyeOff, Check } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { getSiteUrl } from '@/lib/supabase/env'
import { signupSchema } from '@/lib/validation/auth'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()
  const [nextPath, setNextPath] = useState('/dashboard')
  const [intent, setIntent] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const next = params.get('next')
    if (next?.startsWith('/')) setNextPath(next)
    setIntent(params.get('intent') ?? '')
  }, [])

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && data.user) router.replace(nextPath)
    })
    return () => {
      mounted = false
    }
  }, [nextPath, router, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const parsed = signupSchema.safeParse(formData)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please complete all fields.')
      return
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        data: {
          full_name: parsed.data.fullName,
          phone: parsed.data.phone,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Panel - Desktop Only */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-[#0A1F12] p-8">
        <div className="text-center space-y-8">
          <LogoMark />
          <p className="font-serif text-xl italic text-white/80 max-w-xs">
            Your land, finally in safe hands.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col items-center justify-center bg-[#0D1A0F] px-6 py-12 min-h-screen">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Heading */}
          <h1 className="font-serif text-4xl italic text-[#D4AF94]">
            Create Account.
          </h1>
          {intent === 'add-property' ? (
            <p className="font-sans text-sm leading-relaxed text-white/60">
              Create your owner account first. After verification, you can add plot location, size, facing,
              documents, and inspection details from the dashboard.
            </p>
          ) : null}

          {submitted ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-[#C0392B] rounded-full flex items-center justify-center">
                  <Check size={32} className="text-white" />
                </div>
              </div>
              <div>
                <p className="font-sans text-white text-lg font-medium">Account Created!</p>
                <p className="font-sans text-white/60 text-sm mt-2">
                  Check your email to verify your account, then sign in.
                </p>
                <button
                  type="button"
                  onClick={() => router.push(`/login?next=${encodeURIComponent(nextPath)}`)}
                  className="mt-6 w-full rounded-sm bg-[#C0392B] py-3 font-sans text-base font-medium text-white transition-colors hover:bg-[#A93225]"
                >
                  Go to Sign In
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-white placeholder-white/40 focus:border-b-2 focus:border-[#C0392B] focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-white placeholder-white/40 focus:border-b-2 focus:border-[#C0392B] focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Include country code (e.g. +1 …)"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-white placeholder-white/40 focus:border-b-2 focus:border-[#C0392B] focus:outline-none transition-colors"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-white placeholder-white/40 focus:border-b-2 focus:border-[#C0392B] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-white/60 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-white placeholder-white/40 focus:border-b-2 focus:border-[#C0392B] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-3 text-white/60 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-[#FF6B6B] font-sans text-sm">{error}</p>
              )}

              {/* Create Account Button */}
              <button
                type="submit"
                className="w-full bg-[#C0392B] hover:bg-[#A93225] text-white font-sans text-base font-medium py-3 rounded-sm transition-colors mt-8"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Sign In Link */}
          <p className="font-sans text-sm text-white/70">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:text-[#D4AF94] font-medium transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
