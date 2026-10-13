import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, LayoutGrid } from 'lucide-react';
import type { LoginCredentials } from '../types';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [ssoMessage, setSsoMessage] = useState('');

  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberSession: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginCredentials, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name as keyof LoginCredentials]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof LoginCredentials, string>> = {};
    if (!formData.email.trim()) next.email = 'Este campo es requerido.';
    if (!formData.password) next.password = 'Este campo es requerido.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      navigate('/');
    }
  };

  const handleSso = () => {
    setSsoMessage('SSO en configuración — contacta a IT para activar el acceso corporativo.');
    setTimeout(() => setSsoMessage(''), 4000);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Logo + Title */}
      <div className="flex flex-col items-center gap-3 text-center">
        <img src="/favicon.png" alt="Nexus" className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
        </img>
        <div>
          <h1 className="text-xl font-semibold text-[#131b2e]">Iniciar Sesión</h1>
          <p className="text-[13px] text-[#3f4850] mt-0.5">Accede a tu cuenta de Nexus Manufacturing</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {/* Email / ID */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-[#131b2e]">
            Correo electrónico o ID de usuario
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ej. carlos.mendoza@nexusmfg.com"
            className={`h-9 px-3 rounded border text-[13px] text-[#131b2e] placeholder:text-[#94a3b8] bg-white outline-none transition-colors
              ${errors.email
                ? 'border-[#ba1a1a] focus:border-[#ba1a1a] ring-1 ring-[#ba1a1a]/20'
                : 'border-[#bfc7d2] focus:border-[#006194] focus:ring-1 focus:ring-[#006194]/20'
              }`}
          />
          {errors.email && (
            <p className="text-[11px] text-[#ba1a1a]">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-medium text-[#131b2e]">Contraseña</label>
            <a href="#" className="text-[12px] text-[#006194] hover:underline">
              ¿Olvidaste la contraseña?
            </a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Introduce tu contraseña"
              className={`w-full h-9 px-3 pr-9 rounded border text-[13px] text-[#131b2e] placeholder:text-[#94a3b8] bg-white outline-none transition-colors
                ${errors.password
                  ? 'border-[#ba1a1a] focus:border-[#ba1a1a] ring-1 ring-[#ba1a1a]/20'
                  : 'border-[#bfc7d2] focus:border-[#006194] focus:ring-1 focus:ring-[#006194]/20'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#131b2e] transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-[#ba1a1a]">{errors.password}</p>
          )}
        </div>

        {/* Remember session */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            name="rememberSession"
            checked={formData.rememberSession}
            onChange={handleChange}
            className="w-4 h-4 rounded border-[#bfc7d2] accent-[#006194]"
          />
          <span className="text-[12px] text-[#475569]">Recordar sesión</span>
        </label>

        {/* Primary button */}
        <button
          type="submit"
          className="w-full h-9 flex items-center justify-center gap-2 bg-[#006194] hover:bg-[#004b73] text-white rounded text-[14px] font-medium transition-colors"
        >
          Acceder
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-px bg-[#e2e8f0]" />
        <span className="text-[#707881] text-[12px]">•</span>
        <div className="flex-1 h-px bg-[#e2e8f0]" />
      </div>

      {/* SSO button */}
      <div className="w-full flex flex-col gap-2">
        <button
          type="button"
          onClick={handleSso}
          className="w-full h-9 flex items-center justify-center gap-2 bg-white border border-[#bfc7d2] hover:bg-[#f2f3ff] text-[#131b2e] rounded text-[13px] font-medium transition-colors"
        >
          <LayoutGrid className="w-4 h-4 text-[#475569]" />
          Continuar con SSO Corporativo
        </button>
        {ssoMessage && (
          <p className="text-[11px] text-[#3f4850] text-center bg-[#eaedff] border border-[#bfc7d2] rounded px-3 py-2">
            {ssoMessage}
          </p>
        )}
      </div>

      {/* Support link */}
      <p className="text-[12px] text-[#475569] text-center">
        ¿Necesitas acceso o asistencia?{' '}
        <a href="/support" className="text-[#006194] hover:underline font-medium">
          Contactar a Soporte
        </a>
      </p>
    </div>
  );
};
