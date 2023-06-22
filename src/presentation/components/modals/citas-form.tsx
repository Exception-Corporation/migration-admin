import { useState } from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import modalConfig from '@/presentation/components/modal';
import ShowMessage from '@/presentation/components/error-message';
import { CitaApi } from '@/data/use-cases/citas';
import Swal from 'sweetalert2';
import { Cita } from '@/domain/entities/cita/cita.entity';
import useAuth from '@/presentation/hooks/useAuth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CitaForm = ({
  modalIsOpen,
  closeModal,
  action,
  load,
  setLoad,
  cita
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  action: 'register' | 'edit';
  load: number;
  setLoad: (n: number) => void;
  cita?: Cita;
}) => {
  const { auth } = useAuth();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | null>(
    cita?.startDate ? new Date(cita?.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    cita?.endDate ? new Date(cita?.endDate) : null
  );

  const [reason, setReason] = useState<string>(cita?.reason || '');

  const handleReasonDataChange = (event: any) => {
    setReason(event.target.value);
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  const messages = {
    title: action == 'register' ? 'Nuevo Registro' : 'Actualizar Registro',
    success:
      action == 'register'
        ? 'Registro creado exitosamente'
        : 'Registro actualizado correctamente',
    successTitle: action == 'register' ? 'Creado' : 'Actualizado'
  };

  const formik = useFormik({
    initialValues: {
      status: cita?.status || 'pending',
      confirm: cita?.confirm || '',
      name: cita?.name || '',
      email: cita?.email || '',
      phoneNumber: cita?.phoneNumber || '',
      type: cita?.type || 'cita'
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El formato del email es incorrecto')
        .required('El email no puede ir vacio'),
      name: Yup.string().required('El nombre es obligatorio'),
      phoneNumber: Yup.string().required('El teléfono es obligatorio')
    }),
    onSubmit: async (values, { resetForm }) => {
      const { confirm, status, name, email, phoneNumber, type }: any = values;

      if (!startDate || !endDate) {
        toast.error('El rango de fechas es obligatorio.');
        return;
      }

      if (!reason) {
        toast.error('Indique la razón de la demanda.');
        return;
      }

      try {
        let success: boolean =
          action == 'register'
            ? await CitaApi.create({
                status,
                name,
                email,
                phoneNumber,
                reason,
                startDate: startDate!.toISOString(),
                endDate: endDate!.toISOString(),
                type
              })
            : await CitaApi.update(
                {
                  id: cita!.id,
                  confirm,
                  status,
                  name,
                  email,
                  phoneNumber,
                  reason,
                  startDate: startDate!.toISOString(),
                  endDate: endDate!.toISOString(),
                  type
                },
                auth!.username
              );

        if (!success) {
          toast.error('Error inesperado, intente nuevamente.');
          return;
        }

        Swal.fire(messages.successTitle, messages.success, 'success');
        resetForm();
        setLoad(load + 1);
        closeModal();
      } catch (error: any) {
        console.info(error);
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
      contentLabel="Cita Modal"
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
            {/* NAME */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre Completo
              </label>

              <input
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>

            {formik.touched.name && formik.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}

            {/* EMAIL */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo Electrónico
              </label>

              <input
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="example@example.com"
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

            {/* PHONE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Número Celular
              </label>

              <input
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                placeholder="+00000"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
            </div>

            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.phoneNumber}</p>
              </div>
            ) : null}

            {/* REASON */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="reason"
              >
                Motivo
              </label>

              <textarea
                className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="reason"
                placeholder="reason"
                value={reason}
                onChange={handleReasonDataChange}
              />
            </div>

            <div className=" mb-4 flex space-x-4">
              <div className="w-2/2">
                <label className="block text-sm font-medium text-gray-700 mb-6 mt-4">
                  Seleccione un rango de fechas para asignación de cita.
                </label>
              </div>
            </div>

            {/* START_DATE */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startDate"
                >
                  Fecha Inicial
                </label>

                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="endDate"
                >
                  Fecha Final
                </label>

                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* STATUS */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Estatus
              </label>

              <select
                className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
                value={formik.values.status}
                id="status"
                onChange={formik.handleChange}
              >
                <option value="pending">PENDIENTE</option>
                <option value="rejected">RECHAZADA</option>
                <option value="finish">FINALIZADA</option>
              </select>
            </div>

            {/* TYPE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                Tipo de Registro
              </label>

              <select
                className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
                value={formik.values.type}
                id="type"
                onChange={formik.handleChange}
              >
                <option value="cita">CITA</option>
                <option value="demand">DEMANDA</option>
              </select>
            </div>

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

export default CitaForm;
