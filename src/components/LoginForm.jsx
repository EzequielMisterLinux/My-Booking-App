import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../api/ApiAccommodations';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      sessionStorage.setItem('token', response.token);
      localStorage.setItem("userlogged", data.email);
      Swal.fire({
        title: '¡Éxito!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar',
      });
      navigate('/dashboard');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo iniciar sesión. Por favor, verifica tus credenciales.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Iniciar Sesión</h2>
          <p className="text-gray-600 text-sm">Ingresa tus credenciales para acceder al sistema</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register('email', { required: 'Este campo es obligatorio' })}
              className="w-full py-2 pl-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="correo@ejemplo.com"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register('password', { required: 'Este campo es obligatorio' })}
                className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12m6 0a9 9 0 1 1-18 0 9 9 0 1 1 18 0zM9.88 9.88a4 4 0 1 1 5.657 5.657 4 4 0 0 1-5.657-5.657z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.27 4.27l15.46 15.46M9.88 9.88a4 4 0 1 1 5.657 5.657M12 3.2a9 9 0 1 0 0 17.6a9 9 0 1 0 0-17.6z" />
                  </svg>
                )}
              </div>
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-800 text-white py-2 px-4 rounded-md hover:bg-sky-800/75 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            ¿Necesitas ayuda?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Contacta soporte
            </a>
          </p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Este es un sistema seguro. Tus datos están protegidos.
        </div>
      </div>
    </div>
  );
};
