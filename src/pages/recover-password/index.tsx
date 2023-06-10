/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Layout from '@/presentation/layouts/Layout';
import { UserApi } from '@/data/use-cases/user';
import Link from '@/presentation/components/Link';
import ShowMessage from '@/presentation/components/error-message';
import { decodeToken } from '@/infrastructure/utils/token';

const RecoverPassword: NextPage = () => {
  // routing
  const router = useRouter();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | number>(0);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const queryParms = router.asPath.split('?')[1].split('&');
    const token = queryParms
      .find((param) => param.split('=')[0] == 'token')
      ?.split('=')[1];

    if (!token) {
      toast.error(
        'Enlace Invalido, el token a expirado o no se encuentra en los parámetros'
      );
    }

    const data: any = decodeToken(token!);

    const currentDate = new Date().getTime() / 1000;

    if (
      data?.role !== 'standard' ||
      data?.action !== 'get-password' ||
      !data.id ||
      !data.exp ||
      currentDate > data.exp
    ) {
      toast.error(
        'Enlace Invalido, el token a expirado o no se encuentra en los parámetros'
      );

      setTimeout(() => {
        router.push('/');
      }, 1500);
    }

    setToken(token!);

    setId(data.id);
  }, [router]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().required('El password es obligatorio'),
      confirmPassword: Yup.string()
        .required('El password de confirmación es obligatorio')
        .oneOf([Yup.ref('password'), null], 'Los passwords no son iguales')
    }),
    onSubmit: async (values) => {
      const { password } = values;

      try {
        const success = await UserApi.update(
          {
            id: Number(id),
            password
          },
          token
        );

        if (!success) {
          toast.error('Error inesperado, intente nuevamente.');
          return;
        }

        toast.success('Contraseña generada con éxito.');

        // Redirecto to the panel
        setTimeout(() => {
          setMessage(undefined);
          router.push('/');
        }, 1000);
      } catch (error: any) {
        toast.error('Error inesperado, intente nuevamente.');
        setMessage(error.toString());

        setTimeout(() => {
          setMessage(undefined);
        }, 2000);
      }
    }
  });

  return (
    <>
      <Layout>
        <div className="div-1-img mt-8">
          <img
            className="sign-logo object-none object-center w-24 h-24"
            src="/_next/image?url=%2Flogo.png&w=3840&q=75"
            alt="Logo"
          />
        </div>
        <h1 className="sign-title text-center text-2xl text-white font-normal">
          Genera tu nueva contraseña en CRM INM System
        </h1>

        {message ? <ShowMessage value={message} /> : <></>}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              {/* PASSWORD */}

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

              {/* CONFIRM-PASSWORD */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirmar password
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="Password de confirmación Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
              </div>

              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.confirmPassword}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
                value="Actualizar"
              />
            </form>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <div className="sign-up rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <p className="p-create">
                Already have an account? <Link to="/">Sign in →</Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RecoverPassword;
