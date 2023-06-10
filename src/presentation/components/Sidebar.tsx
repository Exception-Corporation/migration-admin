/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from '@/presentation/hooks/useAuth';

const Sidebar = () => {
  const router = useRouter();

  const { auth } = useAuth();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <div className="div-1-img">
          <img
            className="img-reduce object-none object-center w-24 h-24"
            src="/_next/image?url=%2Flogo.png&w=3840&q=75"
            alt="Logo"
          />{' '}
          <p className="text-white text-2xl font-black">CRM INM System</p>
        </div>
      </div>

      <nav className="mt-10 list-none">
        <li
          className={
            router.pathname === '/' || router.pathname == '/folders'
              ? 'bg-blue-800 p-2'
              : 'p-2'
          }
        >
          <Link href="/">
            <a className="flex text-white">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
              </svg>
              <p className="ml-1 mt--sb">Almacenamiento</p>
            </a>
          </Link>
        </li>
        <li
          className={router.pathname == '/content' ? 'bg-blue-800 p-2' : 'p-2'}
        >
          <Link href="/content">
            <a className="flex text-white">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <p className="ml-1 mt--sb">Mis citas/demandas</p>
            </a>
          </Link>
        </li>
        {auth?.role == 'root' ? (
          <li
            className={router.pathname === '/users' ? 'bg-blue-800 p-2' : 'p-2'}
          >
            <Link href="/users">
              <a className="flex text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <p className="ml-1 mt--sb">Usuarios</p>
              </a>
            </Link>
          </li>
        ) : null}
      </nav>

      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black">Otras Opciones</p>
      </div>
      <nav className="mt-5 list-none">
        <li
          className={
            router.pathname === '/configuration' ? 'bg-blue-800 p-2' : 'p-2'
          }
        >
          <Link href="/configuration">
            <a className="flex text-white">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <p className="ml-1 mt--sb">Configuraciónes</p>
            </a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
