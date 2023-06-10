/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Layout from '@/presentation/layouts/Layout';
import { UserApi } from '@/data/use-cases/user';
import useAuth from '@/presentation/hooks/useAuth';
import { User } from '@/domain/entities/user/user.entity';
import { setToken } from '@/infrastructure/utils/token';

const Configuration: NextPage = () => {
  const { auth, setUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: auth!.firstname,
      lastName: auth!.lastname,
      username: auth!.username,
      email: auth!.email,
      age: auth!.age,
      role: auth!.role,
      phone: auth!.phone,
      verifyPassword: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es válido')
        .required('El email no puede ir vacio'),
      verifyPassword: Yup.string().required(
        'El password de verificación de identidad es obligatorio'
      ),
      password: Yup.string(),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Los passwords no son iguales'
      ),
      lastName: Yup.string().required('Los apellidos son obligatorios'),
      firstName: Yup.string().required('El nombre es obligatorio'),
      username: Yup.string().required('El nombre de usuario es obligatorio'),
      age: Yup.number()
        .required('La edad es obligatorio')
        .min(18, 'La edad minima son 18 años')
    }),
    onSubmit: async (values) => {
      const {
        email,
        password,
        username,
        firstName,
        lastName,
        age,
        verifyPassword,
        role,
        phone
      } = values;

      try {
        const success = await UserApi.updateOwner({
          id: auth!.id,
          email,
          password,
          username,
          firstname: firstName,
          lastname: lastName,
          verifyPassword,
          age,
          role,
          phone
        });

        setUser(
          new User(
            auth!.id,
            firstName,
            lastName,
            username,
            phone,
            email,
            age,
            role,
            password,
            true,
            auth!.createdAt,
            auth!.updatedAt
          ),
          false
        );

        const token = await UserApi.login(email, password || verifyPassword);

        setToken(token);

        if (!success) {
          toast.error('Error inesperado, intente nuevamente.');
          return;
        }

        toast.success('Actualización exitosa.');

        // Redirecto to the panel
      } catch (error: any) {
        toast.error(
          `Error inesperado, ${error.toString()} ... Intente nuevamente.`
        );
      }
    }
  });

  return (
    <>
      <Layout>
        <div className="w-full sign-up rounded shadow-xl p-3">
          <h1 className="config-title text-center text-4xl font-normal">
            Configuración de tu cuenta{' '}
            <i className="em em-memo" aria-label="MEMO"></i>
          </h1>
        </div>

        <div className="flex justify-center mt-5">
          <div className="w-full">
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

              {/* ROLE */}
              {auth!.role == 'root' ? (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
                    Rol
                  </label>

                  <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
                    value={formik.values.role}
                    id="role"
                    onChange={formik.handleChange}
                  >
                    <option value="standard">STANDARD (ESTANDARD)</option>
                    <option value="visitor">VISITOR (VISITANTE)</option>
                    <option value="root">ROOT (ADMINISTRADOR)</option>
                  </select>
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

              {/* VERIFY PASSWORD */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="verifyPassword"
                >
                  Password de verificación
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="verifyPassword"
                  type="password"
                  placeholder="Password de verificación"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.verifyPassword}
                />
              </div>

              {formik.touched.verifyPassword && formik.errors.verifyPassword ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.verifyPassword}</p>
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
                value="Actualizar"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Configuration;
