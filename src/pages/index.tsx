import type { NextPage } from 'next';
import Layout from '@/presentation/layouts/Layout';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GlobalFunctions } from '@/infrastructure/utils/global.functions';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">
          Administración General
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
              <p className="ml-1">Total Citas: 0</p>
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
              <p className="ml-1"> Total Demandas: 0</p>
            </div>
          </h4>
        </div>
        <p
          onClick={() => {}}
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
          onClick={() => {}}
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
              placeholder="Buscador (Nombre, Tipo, Actualización)"
              onChange={() => {}}
              autoComplete="off"
            />
          </form>
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/6 py-2">Nombre</th>
                <th className="w-1/6 py-2">Tipo</th>
                <th className="w-1/6 py-2">Email</th>
                <th className="w-1/6 py-2">Teléfono</th>
                <th className="w-1/6 py-2">Ultima actualización</th>
                <th className="w-1/6 py-2">Acciónes</th>
              </tr>
            </thead>

            <tbody className="bg-white"></tbody>
          </table>
        </div>
        <div className="div-paginator">
          <ul className="pagination">
            <li onClick={() => {}}>
              <a>«</a>
            </li>
            {GlobalFunctions.numberToArray(1).map((_cpage, index) => (
              <li key={index} onClick={() => {}}>
                <a className={index + 1 == 1 ? 'active' : ''}>{index + 1}</a>
              </li>
            ))}
            <li onClick={() => {}}>
              <a>»</a>
            </li>
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
