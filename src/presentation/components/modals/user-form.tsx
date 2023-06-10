import { useState } from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import modalConfig from '@/presentation/components/modal';
import ShowMessage from '@/presentation/components/error-message';
import { UserApi } from '@/data/use-cases/user';
import Swal from 'sweetalert2';
import { User } from '@/domain/entities/user/user.entity';

const UserForm = ({
  modalIsOpen,
  closeModal,
  action,
  load,
  setLoad,
  user
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  action: 'register' | 'edit';
  load: number;
  setLoad: (n: number) => void;
  user?: User;
}) => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  const messages = {
    title:
      action == 'register' ? 'Registrar nuevo usuario' : 'Actualizar usuario',
    success:
      action == 'register'
        ? 'Usuario registrado exitosamente'
        : 'Usuario actualizado correctamente',
    successTitle: action == 'register' ? 'Creado' : 'Actualizado'
  };

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstname || '',
      lastName: user?.lastname || '',
      username: user?.username || '',
      email: user?.email || '',
      age: user?.age || 0,
      role: user?.role || 'standard',
      phone: user?.phone || '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es válido')
        .required('El email no puede ir vacio'),
      password: user
        ? Yup.string()
        : Yup.string().required('El password es obligatorio'),
      confirmPassword: user
        ? Yup.string()
        : Yup.string()
            .required('El password de confirmación es obligatorio')
            .oneOf([Yup.ref('password'), null], 'Los passwords no son iguales'),
      lastName: Yup.string().required('Los apellidos son obligatorios'),
      firstName: Yup.string().required('El nombre es obligatorio'),
      username: Yup.string().required('El nombre de usuario es obligatorio'),
      age: Yup.number()
        .required('La edad es obligatorio')
        .min(18, 'La edad minima son 18 años')
    }),
    onSubmit: async (values, { resetForm }) => {
      const {
        email,
        password,
        username,
        firstName,
        lastName,
        age,
        role,
        phone
      } = values;

      try {
        let success: boolean =
          action == 'register'
            ? await UserApi.create({
                email,
                password,
                username,
                firstname: firstName,
                lastname: lastName,
                age,
                role,
                phone
              })
            : await UserApi.update({
                id: user!.id,
                email,
                password,
                username,
                firstname: firstName,
                lastname: lastName,
                age,
                role,
                phone
              });

        if (!success) {
          toast.error('Error inesperado, intente nuevamente.');
          return;
        }

        Swal.fire(messages.successTitle, messages.success, 'success');
        resetForm();
        setLoad(load + 1);
        closeModal();
      } catch (error: any) {
        toast.error(
          'Error inesperado, intente nuevamente. código:' + error.toString()
        );
        setMessage(error.toString());

        setTimeout(() => {
          setMessage(undefined);
        }, 2000);
      }
    }
  });

  return (
    <Modal
      isOpen={modalIsOpen}
      //onAfterOpen={}
      onRequestClose={closeModal}
      style={modalConfig}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {message ? <ShowMessage value={message} /> : <></>}
      <h1 className="register-h1">
        {messages.title} <i className="em em-memo" aria-label="MEMO"></i>
      </h1>
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
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

            {/* ROLE */}
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

            {/* PASSWORD */}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>

              <input
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Password de confirmación Usuario"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>

            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.confirmPassword}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
              value="Enviar"
            />
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UserForm;
