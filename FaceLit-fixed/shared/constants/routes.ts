// ─────────────────────────────────────────────
//  shared/constants/routes.ts
//  Rutas centralizadas — nunca escribir strings
//  de rutas directamente en los componentes
// ─────────────────────────────────────────────

export const Routes = {
  // Landing
  LANDING: '/' as const,

  // Auth — Módulo 1
  AUTH: {
    LOGIN:                  '/auth/login',
    REGISTER:               '/auth/register',
    EMAIL_VALIDATION:       '/auth/email-validation',
    EMAIL_VALIDATED:        '/auth/email-validated-success',
    PASSWORD_RECOVERY:      '/auth/password-recovery',
    VERIFY_IDENTITY:        '/auth/verify-identity',
    NEW_PASSWORD:           '/auth/new-password',
    PASSWORD_RESET_DONE:    '/auth/password-reset-done',
    REGISTRATION_SUCCESS:   '/auth/registration-success',
    TEENAGER_REGISTRATION:  '/auth/teenager-registration',
    MINOR_CONSENT:          '/auth/minor-consent',
    RIGHTS:                 '/auth/rights',
    PRIVACY_NOTICE:         '/auth/privacy-notice',
  },

  // Admin — Módulo 2
  ADMIN: {
    DASHBOARD:    '/admin',
    ENVIRONMENTS: '/admin/environments',
    SCHEDULES:    '/admin/schedules',
    ACADEMIC:     '/admin/academic',
    PROFILE:      '/admin/profile',
    REPORTS:      '/admin/reports',
    ATTENDANCE:   '/admin/attendance',
  },
} as const;