import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { User } from '@/domain/entities/user/user.entity';
import { toast } from 'react-toastify';
import { UserApi } from '@/data/use-cases/user';
import UserUpdate from '@/presentation/components/modals/user-form';
import { GlobalFunctions } from '@/infrastructure/utils/global.functions';

export default function UserTable({
  user,
  load,
  setLoad
}: {
  user: User;
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
      title: '¿Deseas eliminar a este usuario?',
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
          let success: boolean = await UserApi.delete(user.id);

          if (!success) {
            toast.error('Error inesperado, intente nuevamente.');
            return;
          }
          Swal.fire('Eliminado!', 'Usuario eliminado con éxito', 'success');
          setLoad(load + 1);
        } catch (error) {
          toast.error('Error al eliminar el usuario, intente más tarde');
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
            <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {'  '}
          {user.firstname + ' ' + user.lastname}
        </div>
      </td>
      <td className="border px-4 py-2">{user.username}</td>
      <td className="border px-4 py-2">{user.age}</td>
      <td className="border px-4 py-2">{user.email}</td>
      <td className="border px-4 py-2">{user.phone}</td>
      <td className="border px-4 py-2">{user.role}</td>
      <td className="border px-4 py-2">
        {GlobalFunctions.localDate(user.createdAt)}
      </td>
      <td className="border px-4 py-2">
        {GlobalFunctions.localDate(user.updatedAt)}
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
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={openModal}
        >
          Editar
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

      <UserUpdate
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        action="edit"
        load={load}
        setLoad={setLoad}
        user={user}
      />
    </tr>
  );
}
