import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Header from '@/presentation/components/Header';
import Sidebar from '@/presentation/components/Sidebar';
import useAuth from '@/presentation/hooks/useAuth';

export default function Layout({
  children
}: {
  children: Array<ReactElement> | ReactElement;
}) {
  //To get the path: /login || /app
  const router = useRouter();

  const { auth } = useAuth();

  return (
    <>
      <Head>
        <title>CRM - System Management</title>
      </Head>

      {((router.pathname === '/login' || router.pathname === '/new-account') &&
        !auth) ||
      !auth ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="sm:flex min-h-screen">
            <Sidebar />

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
