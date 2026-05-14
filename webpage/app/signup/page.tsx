'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check, Eye, EyeOff, LocateFixed, ShieldCheck, Sparkles } from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { getSiteUrl } from '@/lib/supabase/env'
import { signupSchema } from '@/lib/validation/auth'

const propertyGoals = [
  { value: 'owner_monitoring', label: 'Owner monitoring an existing asset' },
  { value: 'buyer_research', label: 'Evaluating a property purchase' },
  { value: 'verified_resale', label: 'Preparing a verified sale or listing' },
  { value: 'family_office', label: 'Managing a family property portfolio' },
] as const

const referralSources = [
  { value: 'search', label: 'Search engine' },
  { value: 'social', label: 'Social media' },
  { value: 'friend_family', label: 'Family or professional referral' },
  { value: 'field_team', label: 'PlotKare field team' },
  { value: 'event', label: 'Event or community group' },
  { value: 'other', label: 'Other trusted source' },
] as const

type SignupFormData = {
  fullName: string
  email: string
  phone: string
  addressLine: string
  city: string
  postalCode: string
  customerCategory: (typeof propertyGoals)[number]['value'] | ''
  referralSource: (typeof referralSources)[number]['value'] | ''
  latitude?: number
  longitude?: number
  locationPermission: 'not_requested' | 'granted' | 'denied'
  password: string
  confirmPassword: string
}

const initialFormData: SignupFormData = {
  fullName: '',
  email: '',
  phone: '',
  addressLine: '',
  city: '',
  postalCode: '',
  customerCategory: '',
  referralSource: '',
  locationPermission: 'not_requested',
  password: '',
  confirmPassword: '',
}

function normalizeFieldValue(name: string, value: string) {
  if (name === 'postalCode') return value.replace(/\D/g, '').slice(0, 6)
  if (name === 'phone') return value.replace(/[^\d+\s-]/g, '').slice(0, 20)
  return value
}

function passwordChecks(password: string) {
  return [
    { label: '10 or more characters', valid: password.length >= 10 },
    { label: 'Uppercase and lowercase letters', valid: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: 'At least one number', valid: /[0-9]/.test(password) },
    { label: 'At least one special character', valid: /[^A-Za-z0-9]/.test(password) },
  ]
}

export default function SignupPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()
  const [nextPath, setNextPath] = useState('/dashboard')
  const [intent, setIntent] = useState('')
  const [formData, setFormData] = useState<SignupFormData>(initialFormData)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')

  const checks = useMemo(() => passwordChecks(formData.password), [formData.password])
  const strength = checks.filter((item) => item.valid).length

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: normalizeFieldValue(name, value),
    }))
  }

  const useCurrentLocation = () => {
    setError('')
    if (!navigator.geolocation) {
      setError('Location access is not supported in this browser.')
      return
    }

    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          locationPermission: 'granted',
        }))
        setLocating(false)
      },
      () => {
        setFormData((prev) => ({ ...prev, locationPermission: 'denied' }))
        setError('Location permission was not granted. You can continue by entering your address manually.')
        setLocating(false)
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setError('')

    const parsed = signupSchema.safeParse({
      ...formData,
      customerCategory: formData.customerCategory || undefined,
      referralSource: formData.referralSource || undefined,
    })

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please complete all required details.')
      return
    }

    setSubmitting(true)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        data: {
          full_name: parsed.data.fullName,
          phone: parsed.data.phone,
          address_line: parsed.data.addressLine,
          city: parsed.data.city,
          postal_code: parsed.data.postalCode,
          customer_category: parsed.data.customerCategory,
          referral_source: parsed.data.referralSource,
          latitude: parsed.data.latitude,
          longitude: parsed.data.longitude,
          location_permission: formData.locationPermission,
        },
      },
    })
    setSubmitting(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      router.replace(nextPath)
      router.refresh()
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#0D1A0F] lg:grid-cols-[0.85fr_1.15fr]">
      <div className="hidden flex-col justify-between bg-[#0A1F12] p-10 lg:flex">
        <Link href="/" aria-label="PlotKare home">
          <LogoMark />
        </Link>
        <div className="max-w-md space-y-7">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#D4AF94]/80">
            Owner onboarding
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight text-white">
            Build your property command room.
          </h1>
          <p className="font-sans text-base leading-8 text-white/65">
            Share the details our team needs to prepare inspections, documents, support, and advisor-led next steps for
            your property journey.
          </p>
        </div>
        <div className="grid gap-3 text-white/70">
          {['Encrypted auth through Supabase', 'Advisor-led property setup', 'Private dashboard after signup'].map(
            (item) => (
              <div key={item} className="flex items-center gap-3 font-sans text-sm">
                <ShieldCheck className="h-4 w-4 text-[#D4AF94]" />
                {item}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-8 lg:p-10">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#D4AF94]/80">PlotKare access</p>
              <h1 className="mt-3 font-serif text-4xl font-semibold italic text-[#D4AF94] sm:text-5xl">
                Create Account.
              </h1>
              <p className="mt-3 max-w-xl font-sans text-sm leading-6 text-white/60">
                A few details help us personalize your dashboard, verify service coverage, and guide the right property
                workflow from day one.
              </p>
            </div>
            <div className="hidden rounded-full border border-white/10 bg-white/5 p-3 text-[#D4AF94] sm:block">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>

          {intent === 'add-property' ? (
            <p className="mb-6 rounded-xl border border-[#D4AF94]/20 bg-[#D4AF94]/10 px-4 py-3 font-sans text-sm leading-relaxed text-white/70">
              Create your owner account first. After signup, your dashboard will guide plot details, documents, and
              inspection setup.
            </p>
          ) : null}

          {submitted ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C0392B]">
                  <Check size={32} className="text-white" />
                </div>
              </div>
              <div>
                <p className="font-sans text-lg font-medium text-white">Account Created</p>
                <p className="mt-2 font-sans text-sm text-white/60">
                  Your access has been created. Sign in to continue to the PlotKare dashboard.
                </p>
                <button
                  type="button"
                  onClick={() => router.push(`/login?next=${encodeURIComponent(nextPath)}`)}
                  className="mt-6 w-full rounded-md bg-[#C0392B] py-3 font-sans text-base font-medium text-white transition-colors hover:bg-[#A93225]"
                >
                  Go to Sign In
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">Full name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Aaditya Rao"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 font-sans text-white placeholder-white/30 outline-none transition-colors focus:border-[#D4AF94] focus:bg-white/[0.06]"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 font-sans text-white placeholder-white/30 outline-none transition-colors focus:border-[#D4AF94] focus:bg-white/[0.06]"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 font-sans text-white placeholder-white/30 outline-none transition-colors focus:border-[#D4AF94] focus:bg-white/[0.06]"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">PIN code</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    autoComplete="postal-code"
                    placeholder="530003"
                    maxLength={6}
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 font-sans text-white placeholder-white/30 outline-none transition-colors focus:border-[#D4AF94] focus:bg-white/[0.06]"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-[1.4fr_0.8fr]">
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">Address</span>
                  <input
                    type="text"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    autoComplete="street-address"
                    placeholder="Flat, street, locality"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 font-sans text-white placeholder-white/30 outline-none transition-colors focus:border-[#D4AF94] focus:bg-white/[0.06]"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">City</span>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    placeholder="Visakhapatnam"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 font-sans text-white placeholder-white/30 outline-none transition-colors focus:border-[#D4AF94] focus:bg-white/[0.06]"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">
                    Primary property goal
                  </span>
                  <select
                    name="customerCategory"
                    value={formData.customerCategory}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-white/10 bg-[#10251A] px-4 py-3 font-sans text-white outline-none transition-colors focus:border-[#D4AF94]"
                  >
                    <option value="">Select one</option>
                    {propertyGoals.map((goal) => (
                      <option key={goal.value} value={goal.value}>
                        {goal.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">
                    How you discovered us
                  </span>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-white/10 bg-[#10251A] px-4 py-3 font-sans text-white outline-none transition-colors focus:border-[#D4AF94]"
                  >
                    <option value="">Select source</option>
                    {referralSources.map((source) => (
                      <option key={source.value} value={source.value}>
                        {source.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">Service location</p>
                    <p className="mt-1 font-sans text-sm text-white/60">
                      Optional GPS helps the team confirm nearby coverage faster.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    disabled={locating}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#D4AF94]/30 px-4 py-2 font-sans text-sm font-medium text-[#D4AF94] transition-colors hover:bg-[#D4AF94]/10 disabled:opacity-60"
                  >
                    <LocateFixed className="h-4 w-4" />
                    {locating ? 'Locating...' : 'Use current location'}
                  </button>
                </div>
                {formData.latitude && formData.longitude ? (
                  <p className="mt-3 font-mono text-xs text-emerald-200/80">
                    Location added: {formData.latitude}, {formData.longitude}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">Password</span>
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      className="w-full rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 pr-12 font-sans text-white placeholder-white/30 outline-none transition-colors focus:border-[#D4AF94] focus:bg-white/[0.06]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-white/60 transition-colors hover:text-white"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </label>

                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">Confirm password</span>
                  <div className="relative mt-2">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      placeholder="Repeat password"
                      className="w-full rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 pr-12 font-sans text-white placeholder-white/30 outline-none transition-colors focus:border-[#D4AF94] focus:bg-white/[0.06]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-white/60 transition-colors hover:text-white"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </label>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#C0392B] transition-all"
                    style={{ width: `${(strength / checks.length) * 100}%` }}
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {checks.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 font-sans text-xs ${
                        item.valid ? 'text-emerald-200' : 'text-white/45'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {error && <p className="rounded-md border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm text-red-200">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-[#C0392B] py-4 font-sans text-base font-semibold text-white transition-colors hover:bg-[#A93225] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Creating secure account...' : 'Create Account'}
              </button>
            </form>
          )}

          <p className="mt-7 font-sans text-sm text-white/70">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-white transition-colors hover:text-[#D4AF94]">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
