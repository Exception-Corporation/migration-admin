import { useState } from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import modalConfig from '@/presentation/components/modal';
import LoadMessage from '@/presentation/components/load-message';
import { UserApi } from '@/data/use-cases/user';
import Swal from 'sweetalert2';

const GetPassword = ({
  modalIsOpen,
  closeModal
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
}) => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es válido')
        .required('El email no puede ir vacio')
    }),
    onSubmit: async (values, { resetForm }) => {
      const { email } = values;
      setMessage('Espere unos segundos...');
      try {
        let success: boolean = await UserApi.getPassword(email);
        setMessage(undefined);

        if (!success) {
          toast.error('Error inesperado, intente nuevamente.');
          return;
        }

        Swal.fire(
          'Enviado',
          'Te hemos enviado un correo para recuperar tu contraseña',
          'success'
        );
        closeModal();
        resetForm();
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
      {message ? <LoadMessage value={message} /> : <></>}
      <h1 className="register-h1">
        Recuperar contraseña <i className="em em-memo" aria-label="MEMO"></i>
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
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

export default GetPassword;
