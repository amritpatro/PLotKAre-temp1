'use client'

import { useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardTopBar } from '@/components/dashboard-topbar'

export default function SettingsPage() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [fullName] = useState('Ravi Kumar')
  const [email] = useState('temp@temp.temp')
  const [phone] = useState('+91 98765 43210')
  const [city] = useState('Visakhapatnam')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showForgotMsg, setShowForgotMsg] = useState(false)
  const [twoFa, setTwoFa] = useState(false)

  const [reportMonthly, setReportMonthly] = useState(true)
  const [encroachAlert, setEncroachAlert] = useState(true)
  const [valueUpdates, setValueUpdates] = useState(true)
  const [paymentRemind, setPaymentRemind] = useState(true)
  const [amenityRec, setAmenityRec] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const strength = useMemo(() => {
    const p = newPassword
    if (!p) return 0
    let s = Math.min(p.length * 10, 40)
    if (/[A-Z]/.test(p)) s += 15
    if (/[0-9]/.test(p)) s += 15
    if (/[^A-Za-z0-9]/.test(p)) s += 15
    return Math.min(100, s)
  }, [newPassword])

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardTopBar title="Settings" />
        <div className="px-8 pb-12 pt-24">
          <div className="mx-auto max-w-3xl">
            <Tabs defaultValue="account" className="w-full gap-6">
              <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-xl border border-[#E5E7EB] bg-white p-1 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                <TabsTrigger
                  value="account"
                  className="rounded-lg px-4 py-2 font-sans text-sm text-[#6B7280] data-[state=active]:bg-[#FFF1F2] data-[state=active]:text-[#C0392B]"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="rounded-lg px-4 py-2 font-sans text-sm text-[#6B7280] data-[state=active]:bg-[#FFF1F2] data-[state=active]:text-[#C0392B]"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="rounded-lg px-4 py-2 font-sans text-sm text-[#6B7280] data-[state=active]:bg-[#FFF1F2] data-[state=active]:text-[#C0392B]"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="rounded-lg px-4 py-2 font-sans text-sm text-[#6B7280] data-[state=active]:bg-[#FFF1F2] data-[state=active]:text-[#C0392B]"
                >
                  Billing
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="account"
                className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              >
                <h2 className="font-serif text-xl font-bold text-[#1F2937]">Account</h2>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="font-mono text-xs text-[#6B7280]">Full Name</label>
                    <input
                      readOnly
                      value={fullName}
                      className="mt-1 w-full rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3 font-sans text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-[#6B7280]">Email</label>
                    <input
                      readOnly
                      value={email}
                      className="mt-1 w-full rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3 font-sans text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-[#6B7280]">Phone</label>
                    <input
                      readOnly
                      value={phone}
                      className="mt-1 w-full rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3 font-sans text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-[#6B7280]">City</label>
                    <input
                      readOnly
                      value={city}
                      className="mt-1 w-full rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3 font-sans text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="rounded-lg border border-[#E5E7EB] px-4 py-2 font-sans text-sm text-[#1F2937] hover:bg-[#F9FAFB]"
                    >
                      Upload profile photo
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.success('Changes saved')}
                    className="rounded-lg bg-[#C0392B] px-6 py-3 font-sans text-sm font-semibold text-white hover:opacity-95"
                  >
                    Save Changes
                  </button>
                </div>
              </TabsContent>

              <TabsContent
                value="security"
                className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              >
                <h2 className="font-serif text-xl font-bold text-[#1F2937]">Security</h2>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="font-mono text-xs text-[#6B7280]">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 font-mono text-[#1F2937] outline-none focus:ring-2 focus:ring-[#C0392B]/25"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-[#6B7280]">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 font-mono text-[#1F2937] outline-none focus:ring-2 focus:ring-[#C0392B]/25"
                    />
                    <Progress value={strength} className="mt-2 h-2 bg-[#F3F4F6]" />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-[#6B7280]">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 font-mono text-[#1F2937] outline-none focus:ring-2 focus:ring-[#C0392B]/25"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.success('Password updated')}
                    className="rounded-lg bg-[#C0392B] px-6 py-3 font-sans text-sm font-semibold text-white hover:opacity-95"
                  >
                    Change Password
                  </button>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowForgotMsg(true)}
                      className="font-sans text-sm text-[#C0392B] underline-offset-4 hover:underline"
                    >
                      Forgot Password
                    </button>
                    {showForgotMsg && (
                      <p className="mt-2 font-sans text-sm text-[#6B7280]">
                        A reset link will be sent to your email.
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-6">
                    <span className="font-sans text-sm text-[#1F2937]">Two-factor authentication</span>
                    <Switch
                      checked={twoFa}
                      onCheckedChange={setTwoFa}
                      className="data-[state=checked]:bg-[#16A34A] data-[state=unchecked]:bg-[#E5E7EB]"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="notifications"
                className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              >
                <h2 className="font-serif text-xl font-bold text-[#1F2937]">Notifications</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-[#1F2937]">Monthly Inspection Reports</span>
                    <Switch
                      checked={reportMonthly}
                      onCheckedChange={setReportMonthly}
                      className="data-[state=checked]:bg-[#16A34A] data-[state=unchecked]:bg-[#E5E7EB]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-[#1F2937]">Encroachment Alerts</span>
                    <Switch
                      checked={encroachAlert}
                      onCheckedChange={setEncroachAlert}
                      className="data-[state=checked]:bg-[#16A34A] data-[state=unchecked]:bg-[#E5E7EB]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-[#1F2937]">Value Updates</span>
                    <Switch
                      checked={valueUpdates}
                      onCheckedChange={setValueUpdates}
                      className="data-[state=checked]:bg-[#16A34A] data-[state=unchecked]:bg-[#E5E7EB]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-[#1F2937]">Payment Reminders</span>
                    <Switch
                      checked={paymentRemind}
                      onCheckedChange={setPaymentRemind}
                      className="data-[state=checked]:bg-[#16A34A] data-[state=unchecked]:bg-[#E5E7EB]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-[#1F2937]">New Amenity Recommendations</span>
                    <Switch
                      checked={amenityRec}
                      onCheckedChange={setAmenityRec}
                      className="data-[state=checked]:bg-[#16A34A] data-[state=unchecked]:bg-[#E5E7EB]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-[#1F2937]">Marketing Emails</span>
                    <Switch
                      checked={marketing}
                      onCheckedChange={setMarketing}
                      className="data-[state=checked]:bg-[#16A34A] data-[state=unchecked]:bg-[#E5E7EB]"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="billing"
                className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              >
                <h2 className="font-serif text-xl font-bold text-[#1F2937]">Billing</h2>
                <div className="mt-6 space-y-6 font-sans text-sm text-[#6B7280]">
                  <div>
                    <p className="font-mono text-xs text-[#9CA3AF]">Current plan</p>
                    <p className="mt-1 text-lg font-semibold text-[#1F2937]">Standard Plan</p>
                    <p className="mt-1 font-mono text-[#F59E0B]">₹1,999 per month — renewing 1 June 2025</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = '/dashboard/payments'
                    }}
                    className="rounded-lg bg-[#C0392B] px-6 py-3 font-sans text-sm font-semibold text-white hover:opacity-95"
                  >
                    Upgrade to Premium
                  </button>
                  <div className="border-t border-[#E5E7EB] pt-6">
                    <p className="font-mono text-xs text-[#9CA3AF]">Payment method</p>
                    <p className="mt-2 text-[#1F2937]">Visa ending 4242</p>
                    <button
                      type="button"
                      className="mt-3 rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F9FAFB]"
                    >
                      Update Card
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.success('Preparing receipts download…')}
                    className="rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F9FAFB]"
                  >
                    Download all receipts
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
