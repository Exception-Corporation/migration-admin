import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '@/presentation/layouts/Layout';
import { User } from '@/domain/entities/user/user.entity';
import { UserApi } from '@/data/use-cases/user';
import UserTable from '@/presentation/components/UserTable';
import { GlobalFunctions } from '@/infrastructure/utils/global.functions';
import UserCreate from '@/presentation/components/modals/user-form';

const Users: NextPage = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [origialUsers, setOriginalUsers] = useState<Array<User>>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [load, setLoad] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const { users, totalPages, totalUsers } = await UserApi.getAll(
          page,
          size,
          ''
        );

        setTotalPages(totalPages);
        setTotalUsers(totalUsers);

        setUsers(users);
        setOriginalUsers(users);
      } catch (error: any) {
        toast.error(`Error interno: ${error.toString()}`);
      }
    })();
  }, [page, load, size]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const incrementPage = (n: number) => {
    if (n > 0 && n <= totalPages) setPage(n);
  };

  const searching = (e: { target: { value: string } }) => {
    const st = e.target.value;

    if (!st || st?.trim() == '') {
      setSize(5);
      setPage(1);
      setUsers(origialUsers);
      return;
    }

    setSize(100000);
    setPage(1);

    setUsers(
      origialUsers.filter(
        (user) =>
          user.updatedAt.toLowerCase().includes(st.toLowerCase()) ||
          user.firstname.toLowerCase().includes(st.toLowerCase()) ||
          `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
            st.toLowerCase()
          ) ||
          user.lastname.toLowerCase().includes(st.toLowerCase()) ||
          user.email.toLowerCase().includes(st.toLowerCase()) ||
          user.createdAt.toLowerCase().includes(st.toLowerCase()) ||
          user.username.toLowerCase().includes(st.toLowerCase()) ||
          user.role.toLowerCase().includes(st.toLowerCase()) ||
          user.age == Number(st)
      )
    );
  };

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Usuarios</h1>
        <h4 className="sign-up rounded shadow-md p-3 sign-hov w-1/2">
          <div className="flex">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="ml-1">Total: {totalUsers}</p>
          </div>
        </h4>
        <p
          onClick={openModal}
          className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center cursor-pointer"
        >
          <div className="flex">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            <p className="ml-1">Usuario</p>
          </div>
        </p>

        <div className="overflow-x-scroll">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="Buscador (Nombre, Usuario, Edad, Email, Rool, Registro, Actualización)"
            onChange={searching}
          />
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/9 py-2">Nombre</th>
                <th className="w-1/9 py-2">Usuario</th>
                <th className="w-1/9 py-2">Edad</th>
                <th className="w-1/9 py-2">email</th>
                <th className="w-1/9 py-2">celular</th>
                <th className="w-1/9 py-2">Rol</th>
                <th className="w-1/9 py-2">Registro</th>
                <th className="w-1/9 py-2">Actualización</th>
                <th className="w-1/9 py-2">Eliminar</th>
                <th className="w-1/9 py-2">Editar</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {users.map((user) => (
                <UserTable
                  key={user.id}
                  user={user}
                  load={load}
                  setLoad={setLoad}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="div-paginator">
          <ul className="pagination">
            <li onClick={() => incrementPage(page - 1)}>
              <a>«</a>
            </li>
            {GlobalFunctions.numberToArray(totalPages).map((_cpage, index) => (
              <li key={index} onClick={() => incrementPage(index + 1)}>
                <a className={index + 1 == page ? 'active' : ''}>{index + 1}</a>
              </li>
            ))}
            <li onClick={() => incrementPage(page + 1)}>
              <a>»</a>
            </li>
          </ul>
        </div>
      </Layout>
      <UserCreate
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        action="register"
        load={load}
        setLoad={setLoad}
      />
    </div>
  );
};

export default Users;
