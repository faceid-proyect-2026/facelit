// ─────────────────────────────────────────────
//  features/auth/hooks/useLoginForm.ts
//  Lógica del formulario de login separada
//  de la pantalla (clean code)
// ─────────────────────────────────────────────
import { useState } from 'react';
import { router } from 'expo-router';
import { Routes } from '@/shared/constants/routes';

const EMAIL_REGEX           = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMAIL_ALLOWED_REGEX   = /^[A-Za-z0-9._%+\-@]+$/;
const PASSWORD_ALLOWED_REGEX = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-+=]+$/;

interface LoginForm {
  email:    string;
  password: string;
  accepted: boolean;
}

interface LoginErrors {
  email:    string;
  password: string;
  policy:   string;
}

const initialForm: LoginForm = {
  email:    '',
  password: '',
  accepted: false,
};

const initialErrors: LoginErrors = {
  email:    '',
  password: '',
  policy:   '',
};

export function useLoginForm() {
  const [form, setForm]     = useState<LoginForm>(initialForm);
  const [errors, setErrors] = useState<LoginErrors>(initialErrors);

  const setField = <K extends keyof LoginForm>(key: K, value: LoginForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = (): LoginErrors => {
    const e = { ...initialErrors };
    const cleanEmail = form.email.trim();

    // Validar email
    if (!cleanEmail)
      e.email = 'Campo vacío';
    else if (/\s/.test(form.email))
      e.email = 'No se permiten espacios';
    else if (!EMAIL_ALLOWED_REGEX.test(cleanEmail))
      e.email = 'Caracteres no permitidos';
    else if (!cleanEmail.includes('@'))
      e.email = 'Correo inválido (falta @)';
    else if (!EMAIL_REGEX.test(cleanEmail))
      e.email = 'Formato de correo inválido';

    // Validar contraseña
    if (!form.password)
      e.password = 'Campo vacío';
    else if (/\s/.test(form.password))
      e.password = 'No se permiten espacios';
    else if (!PASSWORD_ALLOWED_REGEX.test(form.password))
      e.password = 'Caracteres no permitidos';
    else if (form.password.length < 6)
      e.password = 'Mínimo 6 caracteres';
    else if (form.password.length > 20)
      e.password = 'Máximo 20 caracteres';

    // Validar política
    if (!form.accepted)
      e.policy = 'Debes aceptar el aviso de privacidad';

    // Validar credenciales mock
    if (!e.email && !e.password && !e.policy) {
      if (cleanEmail !== 'admin@test.com')
        e.email = 'Correo electrónico no registrado';
      else if (form.password !== '123456')
        e.password = 'Contraseña incorrecta';
    }

    return e;
  };

  const handleSubmit = () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password || nextErrors.policy) return;
    router.replace(Routes.ADMIN.DASHBOARD as any);
  };

  return { form, errors, setField, handleSubmit };
}