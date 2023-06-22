import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Cita } from '@/domain/entities/cita/cita.entity';
import { toast } from 'react-toastify';
import { CitaApi } from '@/data/use-cases/citas';
import CitaUpdated from '@/presentation/components/modals/citas-form';

export default function CitaTable({
  cita,
  load,
  setLoad
}: {
  cita: Cita;
  load: number;
  setLoad: (n: number) => void;
}) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
          setLoad(load + 1);
        } catch (error) {
          toast.error('Error al eliminar el registro, intente más tarde');
        }
      }
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2 text-left">
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
      <td className="border px-4 py-2">{cita.name}</td>
      <td className="border px-4 py-2">{cita.email}</td>
      <td className="border px-4 py-2">{cita.phoneNumber}</td>
      <td className="border px-4 py-2">{cita.status}</td>
      <td className="border px-4 py-2">
        {new Date(cita.createdAt).toString()}
      </td>
      <td className="border px-4 py-2">
        {new Date(cita.updatedAt).toString()}
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmDeleteAction()}
        >
          Eliminar
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 ml-2"
          >
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
        <button
          type="button"
          className="mt-2 flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={openModal}
        >
          Tomar
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
      </td>

      <CitaUpdated
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        action="edit"
        load={load}
        setLoad={setLoad}
        cita={cita}
      />
    </tr>
  );
}