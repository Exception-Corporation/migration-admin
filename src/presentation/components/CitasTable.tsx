import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Transition } from '@headlessui/react';
import { Cita } from '@/domain/entities/cita/cita.entity';
import { toast } from 'react-toastify';
import { CitaApi } from '@/data/use-cases/citas';
import CitaUpdated from '@/presentation/components/modals/citas-form';
import CitaDetail from '@/presentation/components/modals/cita-detail';
import useAuth from '@/presentation/hooks/useAuth';
import { HistoryCita } from '@/domain/entities/cita/history.cita.entity';
import { GlobalFunctions } from '@/infrastructure/utils/global.functions';

declare const document: any;

export default function CitaTable({
  cita,
  load,
  setLoad,
  owner,
  sendMessage
}: {
  cita: Cita;
  load: number;
  setLoad: (n: number) => void;
  owner?: boolean;
  sendMessage: (s: string) => void;
}) {
  const { auth } = useAuth();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [detailIsOpen, setDetailOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryCita[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);

  // confirm date
  const min = cita.startDate.slice(0, 16);
  const max = cita.endDate.slice(0, 16);

  useEffect(() => {
    (async () => {
      try {
        const historyFound = await CitaApi.getHistoryById(cita.id);
        setHistory(historyFound);
      } catch (error) {
        setHistory([]);
      }
    })();
  }, [cita]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openDetail = () => {
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
  };

  // Elimina un cliente
  const confirmDeleteAction = () => {
    Swal.fire({
      title: '¿Deseas eliminar este registro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then(async (result) => {
      if (result.value) {
        try {
          let success: boolean = await CitaApi.delete(cita.id);

          if (!success) {
            toast.error('Error inesperado, intente nuevamente.');
            return;
          }
          Swal.fire('Eliminado!', 'Registro eliminado con éxito', 'success');
          sendMessage(`Registro con id: ${cita.id} eliminado`);
          setLoad(load + 1);
        } catch (error) {
          toast.error('Error al eliminar el registro, intente más tarde');
        }
      }
    });
  };

  const takeRecord = () => {
    Swal.fire({
      title: '¿Deseas asignarte este registro?',
      text: 'Se te asignará este registro y tú serás el único con acceso a éste.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Tomar',
      cancelButtonText: 'No, Cancelar'
    }).then(async (result) => {
      if (result.value) {
        try {
          let success: boolean = await CitaApi.update(
            {
              id: cita.id,
              userId: auth!.id
            },
            auth!.username
          );

          if (!success) {
            toast.error('Error inesperado, intente nuevamente.');
            return;
          }

          Swal.fire('Asiganda!', 'Registro asignado con éxito', 'success');
          sendMessage(
            `Registro con id: ${cita.id} asignado a: ${auth!.username}`
          );
          setLoad(load + 1);
        } catch (error) {
          toast.error('Error al asignar el registro, intente más tarde');
        }
      }
    });
  };

  const remove = () => {
    Swal.fire({
      title: '¿Deseas desasignarte este registro?',
      text: 'Este registro volverá a general, conservando todos los cambios actuales.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Desasignar',
      cancelButtonText: 'No, Cancelar'
    }).then(async (result) => {
      if (result.value) {
        try {
          let success: boolean = await CitaApi.update(
            {
              id: cita.id,
              userId: null
            },
            auth!.username
          );

          if (!success) {
            toast.error('Error inesperado, intente nuevamente.');
            return;
          }
          Swal.fire(
            'Desasignado!',
            'Registro desasignado con éxito',
            'success'
          );
          sendMessage(`Registro con id: ${cita.id} desasignado`);
          setLoad(load + 1);
        } catch (error) {
          toast.error('Error al desasignar el registro, intente más tarde');
        }
      }
    });
  };

  const confirmForm = () => {
    Swal.fire({
      title: 'Confirmar la cita',
      icon: 'info',
      html: `
      <label for="datetimepicker" class="block mb-2 text-gray-700">
        Seleccione una fecha y hora para confirmar la cita
        (Se le hará llegar el aviso por correo a la persona).
      </label>
      <input 
        id="datetimepicker" 
        type="datetime-local" 
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
    `,
      showCancelButton: true,
      didOpen: () => {
        const input = document.getElementById('datetimepicker');
        input.setAttribute('min', min);
        input.setAttribute('max', max);
      },
      preConfirm: async () => {
        const selectedDateTime =
          document.getElementById('datetimepicker').value;

        try {
          let success: boolean = await CitaApi.update(
            {
              id: cita.id,
              confirm: new Date(selectedDateTime).toISOString()
            },
            auth!.username
          );

          if (!success) {
            toast.error('Error inesperado, intente nuevamente.');
            return;
          }
          Swal.fire('Confirmada!', 'Cita confirmada con éxito', 'success');
          setLoad(load + 1);
        } catch (error) {
          toast.error('Error al confirmar la cita, intente más tarde');
        }
      }
    });
  };

  return (
    <tr className="border-green-600	">
      <td
        className="border px-4 py-2 text-left cursor-pointer"
        onClick={openDetail}
      >
        <div className="flex">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 mt-1 mr-1"
          >
            <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
          </svg>
          {'  '}
          {cita.type == 'demand' ? 'demanda' : cita.type}
        </div>
      </td>
      <td className="border px-4 py-2 cursor-pointer" onClick={openDetail}>
        {cita.name}
      </td>
      <td className="border px-4 py-2 cursor-pointer" onClick={openDetail}>
        {cita.email}
      </td>
      <td className="border px-4 py-2 cursor-pointer" onClick={openDetail}>
        {cita.phoneNumber}
      </td>
      <td className="border px-4 py-2 cursor-pointer" onClick={openDetail}>
        {
          { pending: 'PENDIENTE', finish: 'FINALIZADA', rejected: 'RECHAZADA' }[
            cita.status
          ]
        }
      </td>
      <td className="border px-4 py-2 cursor-pointer" onClick={openDetail}>
        {GlobalFunctions.localDate(cita.createdAt)}
      </td>
      <td className="border px-4 py-2 cursor-pointer" onClick={openDetail}>
        {GlobalFunctions.localDate(cita.updatedAt)}
      </td>
      <td className="border px-4 py-2">
        <div className="relative">
          <button
            type="button"
            className="flex justify-center items-center bg-blue-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => setShowActions(!showActions)}
          >
            Acciones
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4 ml-2"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <Transition
            show={showActions}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute z-10 right-0 mt-2 w-48 bg-white rounded shadow-lg"
          >
            <ul className="py-2">
              {auth!.role !== 'visitor' ? (
                <>
                  <li>
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 w-full text-xs uppercase font-bold text-red-800 hover:bg-red-100"
                      onClick={() => confirmDeleteAction()}
                    >
                      <span className="mr-2">Eliminar</span>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                  </li>
                  {owner ? (
                    <>
                      <li>
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 w-full text-xs uppercase font-bold text-green-600 hover:bg-green-100"
                          onClick={openModal}
                        >
                          <span className="mr-2">Actualizar</span>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                          >
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 w-full text-xs uppercase font-bold text-yellow-700 hover:bg-blue-100"
                          onClick={confirmForm}
                        >
                          <span className="mr-2">Confirmar</span>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                          >
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 w-full text-xs uppercase font-bold text-blue-600 hover:bg-blue-100"
                          onClick={remove}
                        >
                          <span className="mr-2">Desasignar</span>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                          >
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 w-full text-xs uppercase font-bold text-blue-600 hover:bg-blue-100"
                        onClick={takeRecord}
                      >
                        <span className="mr-2">Tomar</span>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                    </li>
                  )}
                </>
              ) : (
                <li>
                  <button
                    type="button"
                    className="flex items-center px-4 py-2 w-full text-xs uppercase font-bold text-blue-600 hover:bg-blue-100"
                    onClick={openDetail}
                  >
                    <span className="mr-2">Detalles</span>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                </li>
              )}
            </ul>
          </Transition>
        </div>
      </td>
      <CitaUpdated
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        action="edit"
        load={load}
        setLoad={setLoad}
        cita={cita}
        owner={owner}
      />
      <CitaDetail
        modalIsOpen={detailIsOpen}
        closeModal={closeDetail}
        cita={cita}
        historyCita={history}
      />
    </tr>
  );
}
