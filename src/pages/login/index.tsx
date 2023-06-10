/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Layout from '@/presentation/layouts/Layout';
import useAuth from '@/presentation/hooks/useAuth';
import { decodeToken, setToken } from '@/infrastructure/utils/token';
import { UserApi } from '@/data/use-cases/user';
import Link from '@/presentation/components/Link';
import ShowMessage from '@/presentation/components/error-message';
import GetPassword from '@/presentation/components/modals/get-password';

const Login: NextPage = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('El email o username no puede ir vacio'),
      password: Yup.string().required('El password es obligatorio')
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const access_token = await UserApi.login(email, password);

        setMessage('Autenticando...');
        toast.success('Iniciando sesión...');

        // Storage in local the token
        setTimeout(() => {
          setToken(access_token);
          setUser(decodeToken(access_token));
        }, 1000);

        // Redirecto to the panel (UNNECESSARY BY THE _app.tsx RENDER)
        /*setTimeout(() => {
          setMessage(undefined);
          router.push('/');
        }, 1000);*/
      } catch (error: any) {
        toast.error('Error inesperado, intente nuevamente.');
        setMessage(error.toString());

        setTimeout(() => {
          setMessage(undefined);
        }, 2000);
      }
    }
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Layout>
        <div className="div-1-img">
          <img
            className="sign-logo object-none object-center w-24 h-24"
            src="/_next/image?url=%2Flogo.png&w=3840&q=75"
            alt="Logo"
          />
        </div>
        <h1 className="sign-title text-center text-2xl text-white font-light">
          Sign in to CRM
        </h1>

        {message ? <ShowMessage value={message} /> : <></>}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email OR Username
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email o Nombre de usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
                value="Iniciar Sesión"
              />
            </form>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <div className="sign-up rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <p className="p-create">
                Did you forget your password?{' '}
                <a onClick={openModal}>click here</a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <div className="sign-up rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <p className="p-create">
                New to CRM ? <Link to="/new-account">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
      <GetPassword modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default Login;
