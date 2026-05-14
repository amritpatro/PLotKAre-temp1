import { z } from 'zod'

export const emailSchema = z.string().trim().email('Enter a valid email address')

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Enter your password'),
})

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Enter your full name')
      .max(80, 'Name is too long')
      .regex(/^[A-Za-z][A-Za-z\s.'-]*$/, 'Name can only include letters, spaces, periods, apostrophes, and hyphens'),
    email: emailSchema,
    phone: z
      .string()
      .trim()
      .min(8, 'Enter a valid phone number')
      .max(20, 'Phone number is too long')
      .regex(/^\+?[0-9\s-]{8,20}$/, 'Phone can only include digits, spaces, hyphens, and an optional +'),
    addressLine: z
      .string()
      .trim()
      .min(6, 'Enter your address')
      .max(180, 'Address is too long')
      .regex(/^[A-Za-z0-9\s,./#-]+$/, 'Address can only include letters, numbers, spaces, comma, dot, slash, #, and hyphen'),
    city: z
      .string()
      .trim()
      .min(2, 'Enter your city')
      .max(80, 'City is too long')
      .regex(/^[A-Za-z\s.'-]+$/, 'City can only include letters and spaces'),
    postalCode: z
      .string()
      .trim()
      .regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6 digit PIN code'),
    customerCategory: z.enum(['owner_monitoring', 'buyer_research', 'verified_resale', 'family_office'], {
      required_error: 'Select your property goal',
    }),
    referralSource: z.enum(['search', 'social', 'friend_family', 'field_team', 'event', 'other'], {
      required_error: 'Select how you discovered PlotKare',
    }),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    password: z
      .string()
      .min(10, 'Password must be at least 10 characters')
      .max(72, 'Password is too long')
      .regex(/[a-z]/, 'Password needs one lowercase letter')
      .regex(/[A-Z]/, 'Password needs one uppercase letter')
      .regex(/[0-9]/, 'Password needs one number')
      .regex(/[^A-Za-z0-9]/, 'Password needs one special character'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const resetPasswordSchema = z.object({
  email: emailSchema,
})

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
