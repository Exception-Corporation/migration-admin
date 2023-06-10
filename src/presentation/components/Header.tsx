import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { removeToken } from '@/infrastructure/utils/token';
import useAuth from '@/presentation/hooks/useAuth';

const Header = () => {
  const router = useRouter();

  const { auth: user, setUser } = useAuth();

  const cerrarSesion = () => {
    toast.info('Cerrando sesión...');

    setTimeout(() => {
      removeToken();
      setUser(null);
      router.push('/');
    }, 1000);
  };

  return (
    <div className="sm:flex sm:justify-between mb-6">
      <div className="sign-up rounded shadow-md p-3 sign-hov">
        <p className="mr-2 mb-5 lg:mb-0 title-welcome">
          Usuario: {user?.firstname + ' ' + user?.lastname}{' '}
          <i
            className="em em-desktop_computer"
            // eslint-disable-next-line jsx-a11y/aria-props
            aria-label=""
          ></i>
        </p>
      </div>

      <div>
        <button
          onClick={() => cerrarSesion()}
          type="button"
          className="flex bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md h-8"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <p className="ml-1">Cerrar Sesión</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
