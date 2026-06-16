// ─────────────────────────────────────────────
//  features/auth/hooks/useLoginForm.ts
//  Lógica del formulario de login separada
//  de la pantalla (clean code)
// ─────────────────────────────────────────────
import { useState } from 'react';
import { router } from 'expo-router';
import { Routes } from '@/shared/constants/routes';
import { useTranslation } from 'react-i18next';

const EMAIL_REGEX            = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMAIL_ALLOWED_REGEX    = /^[A-Za-z0-9._%+\-@]+$/;
const PASSWORD_ALLOWED_REGEX = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-+=]+$/;

interface LoginForm {
  email: string;
  password: string;
  accepted: boolean;
}

interface LoginErrors {
  email: string;
  password: string;
  policy: string;
}

const initialForm: LoginForm = {
  email: '',
  password: '',
  accepted: false,
};

const initialErrors: LoginErrors = {
  email: '',
  password: '',
  policy: '',
};

export function useLoginForm() {
  const { t } = useTranslation();

  const [form, setForm] = useState<LoginForm>(initialForm);
  const [errors, setErrors] = useState<LoginErrors>(initialErrors);

  const setField = <K extends keyof LoginForm>(
    key: K,
    value: LoginForm[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = (): LoginErrors => {
    const e = { ...initialErrors };
    const cleanEmail = form.email.trim();

    // Validar email
    if (!cleanEmail)
      e.email = t('login.errors.emptyField');
    else if (/\s/.test(form.email))
      e.email = t('login.errors.noSpaces');
    else if (!EMAIL_ALLOWED_REGEX.test(cleanEmail))
      e.email = t('login.errors.invalidCharacters');
    else if (!cleanEmail.includes('@'))
      e.email = t('login.errors.missingAt');
    else if (!EMAIL_REGEX.test(cleanEmail))
      e.email = t('login.errors.invalidEmailFormat');

    // Validar contraseña
    if (!form.password)
      e.password = t('login.errors.emptyField');
    else if (/\s/.test(form.password))
      e.password = t('login.errors.noSpaces');
    else if (!PASSWORD_ALLOWED_REGEX.test(form.password))
      e.password = t('login.errors.invalidCharacters');
    else if (form.password.length < 6)
      e.password = t('login.errors.minPassword');
    else if (form.password.length > 20)
      e.password = t('login.errors.maxPassword');

    // Validar política
    if (!form.accepted)
      e.policy = t('login.errors.acceptPrivacy');

    // Validar credenciales mock
    if (!e.email && !e.password && !e.policy) {
      if (cleanEmail !== 'admin@test.com')
        e.email = t('login.errors.emailNotFound');
      else if (form.password !== '123456')
        e.password = t('login.errors.wrongPassword');
    }

    return e;
  };

  const handleSubmit = () => {
    const nextErrors = validate();

    setErrors(nextErrors);

    if (
      nextErrors.email ||
      nextErrors.password ||
      nextErrors.policy
    ) {
      return;
    }

    router.replace(Routes.ADMIN.DASHBOARD as any);
  };

  return {
    form,
    errors,
    setField,
    handleSubmit,
  };
}