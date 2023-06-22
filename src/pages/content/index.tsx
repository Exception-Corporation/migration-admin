import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '@/presentation/layouts/Layout';
import { Cita } from '@/domain/entities/cita/cita.entity';
import { CitaApi } from '@/data/use-cases/citas';
import CitaTable from '@/presentation/components/CitasTable';
import { GlobalFunctions } from '@/infrastructure/utils/global.functions';
import CitasCreate from '@/presentation/components/modals/citas-form';
import useAuth from '@/presentation/hooks/useAuth';

const Content: NextPage = () => {
  const { auth } = useAuth();

  const [citas, setCitas] = useState<Array<Cita>>([]);
  const [origialCitas, setOriginalCitas] = useState<Array<Cita>>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [totalCitas, setTotalCitas] = useState<number>(0);
  const [totalDemands, setTotalDemands] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [load, setLoad] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const { forms, totalPages, totalCitas, totalDemands } =
          await CitaApi.getAll(page, size, '', auth!.id);

        setTotalPages(totalPages);
        setTotalCitas(totalCitas);
        setTotalDemands(totalDemands);

        setCitas(forms);
        setOriginalCitas(forms);
      } catch (error: any) {
        toast.error(`Error interno: ${error.toString()}`);
      }
    })();
  }, [page, load, size, auth]);

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
      setCitas(origialCitas);
      return;
    }

    setSize(100000);
    setPage(1);

    setCitas(
      origialCitas.filter(
        (cita) =>
          cita.status.toLowerCase().includes(st.toLowerCase()) ||
          st.toLowerCase().includes(cita.type.toLowerCase()) ||
          cita.type.toLowerCase().includes(st.toLowerCase()) ||
          cita.email.toLowerCase().includes(st.toLowerCase()) ||
          cita.name.toLowerCase().includes(st.toLowerCase()) ||
          cita.phoneNumber.toLowerCase().includes(st.toLowerCase()) ||
          cita.createdAt.toLowerCase().includes(st.toLowerCase()) ||
          cita.updatedAt.toLowerCase().includes(st.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">
          Mis citas/demandas
        </h1>
        <div className="flex">
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
              <p className="ml-1">Total Citas: {totalCitas}</p>
            </div>
          </h4>
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
              <p className="ml-1"> Total Demandas: {totalDemands}</p>
            </div>
          </h4>
        </div>
        <p
          onClick={openModal}
          className="mr-10 bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold lg:w-auto text-center cursor-pointer"
        >
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
              <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p className="ml-1">Cita</p>
          </div>
        </p>
        <p
          onClick={openModal}
          className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold lg:w-auto text-center cursor-pointer"
        >
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
              <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p className="ml-1">Demanda</p>
          </div>
        </p>

        <div className="overflow-x-scroll">
          <form>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="searchTo"
              type="text"
              placeholder="Buscador (Nombre, Email, Teléfono, Tipo, Status)"
              onChange={searching}
              autoComplete="off"
            />
          </form>
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/8 py-2">Tipo</th>
                <th className="w-1/8 py-2">Nombre</th>
                <th className="w-1/8 py-2">Email</th>
                <th className="w-1/8 py-2">Teléfono</th>
                <th className="w-1/8 py-2">Estatus</th>
                <th className="w-1/8 py-2">Registrada</th>
                <th className="w-1/8 py-2">Ultima actualización</th>
                <th className="w-1/8 py-2">Acciónes</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {citas.map((cita) => (
                <CitaTable
                  key={cita.id}
                  cita={cita}
                  load={load}
                  setLoad={setLoad}
                  owner={true}
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

      <CitasCreate
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        action="register"
        load={load}
        setLoad={setLoad}
      />
    </div>
  );
};

export default Content;
