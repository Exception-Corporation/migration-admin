import '../../styles/globals.scss';
import '../../styles/loading.scss';
import '../../styles/personal.scss';
import '../../styles/emojis.scss';
import './login/styles.scss';
import './users/styles.scss';
import { useEffect, useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import AuthContext from '@/infrastructure/reducer/context/auth.context';
import {
  decodeToken,
  getToken,
  removeToken
} from '@/infrastructure/utils/token';
import { User } from '@/domain/entities/user/user.entity';
import Login from '@/pages/login';
import NewAccount from '@/pages//new-account';
import Home from '@/pages';
import Loading from '@/presentation/components/Loading';
import RecoverPassword from '@/pages/recover-password';
import SeoHead from '@/presentation/components/SeoHead';
import config from '@/infrastructure/config';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  // routing
  const router = useRouter();

  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [load, setLoad] = useState<number>(0);

  useEffect(() => {
    const token = getToken();

    const currentDate = new Date().getTime() / 1000;

    if (token) {
      const user = decodeToken(token);
      if (
        user.firstname &&
        user.lastname &&
        user.email &&
        user.username &&
        user.age &&
        currentDate < (user as any)?.exp
      )
        setAuth(user);
    } else {
      setAuth(null);
    }

    const socket = new WebSocket(config.api.websocket.url);

    setWebSocket(socket);

    if (socket)
      socket.onmessage = async (event) => {
        toast.info(await event.data.text());
        setLoad(load + 1);
      };

    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  const sendMessage = (message: string) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(message);
    }
  };

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user: User | null, status: boolean = true) => {
    setLoading(status);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setAuth(user);
  };
  /*
    A function that saves data or functions the first time and each time the variable is rendered
     compares the new data with the current ones, if there are changes the function is updated and the
     component, otherwise the component is not rendered and the function values are not updated
  */
  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth]
  );

  const verifyAuth = (validateNew: boolean) =>
    !validateNew
      ? router.pathname == '/login' || router.pathname == '/'
      : router.pathname == '/login' ||
        router.pathname == '/new-account' ||
        router.pathname == '/recover-password';

  if (loading) return <Loading />;

  return (
    <>
      <SeoHead />
      <AuthContext.Provider value={authData}>
        {auth == undefined || auth == null ? (
          verifyAuth(false) ? (
            <Login />
          ) : router.pathname == '/recover-password' ? (
            <RecoverPassword />
          ) : (
            <NewAccount />
          )
        ) : verifyAuth(true) ? (
          <Home {...({ ...pageProps, sendMessage, autoload: load } as any)} />
        ) : (
          <Component
            {...({ ...pageProps, sendMessage, autoload: load } as any)}
          />
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </>
  );
}

export default MyApp;

declare module 'react' {
  // eslint-disable-next-line no-undef
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    custom?: string;
    disabled?: boolean;
  }
}
