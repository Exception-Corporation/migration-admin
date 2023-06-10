/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Layout from '@/presentation/layouts/Layout';
import { UserApi } from '@/data/use-cases/user';
import Link from '@/presentation/components/Link';
import ShowMessage from '@/presentation/components/error-message';

const NewAccount: NextPage = () => {
  // routing
  const router = useRouter();

  const [message, setMessage] = useState<string | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      age: 0,
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es válido')
        .required('El email no puede ir vacio'),
      password: Yup.string().required('El password es obligatorio'),
      confirmPassword: Yup.string()
        .required('El password de confirmación es obligatorio')
        .oneOf([Yup.ref('password'), null], 'Los passwords no son iguales'),
      lastName: Yup.string().required('Los apellidos son obligatorios'),
      firstName: Yup.string().required('El nombre es obligatorio'),
      username: Yup.string().required('El nombre de usuario es obligatorio'),
      age: Yup.number()
        .required('La edad es obligatorio')
        .min(18, 'La edad minima son 18 años')
    }),
    onSubmit: async (values) => {
      const { email, password, username, firstName, lastName, age, phone } =
        values;

      try {
        const success = await UserApi.create({
          email,
          password,
          username,
          firstname: firstName,
          lastname: lastName,
          age,
          phone
        });

        if (!success) {
          toast.error('Error inesperado, intente nuevamente.');
          return;
        }

        toast.success('Te has registrado con éxito.');

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
        <h1 className="sign-title text-center text-2xl text-white font-light">
          Sign up to CRM
        </h1>

        {message ? <ShowMessage value={message} /> : <></>}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              {/* FIRSTNAME */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  Nombre
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="Nombre"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
              </div>

              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.firstName}</p>
                </div>
              ) : null}

              {/* LASTNAME */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Apellidos
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="lastname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
              </div>

              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.lastName}</p>
                </div>
              ) : null}

              {/* USERNAME */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Nombre de usuario
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </div>

              {formik.touched.username && formik.errors.username ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.username}</p>
                </div>
              ) : null}

              {/* AGE */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Edad
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="age"
                  type="number"
                  placeholder="0"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                />
              </div>

              {formik.touched.age && formik.errors.age ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.age}</p>
                </div>
              ) : null}

              {/* PHONE */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Numero de celular
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="0"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              </div>

              {formik.touched.phone && formik.errors.phone ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.phone}</p>
                </div>
              ) : null}

              {/* EMAIL */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
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
                value="Registrate"
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

export default NewAccount;
