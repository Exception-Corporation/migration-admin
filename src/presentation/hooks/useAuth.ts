import { useContext } from 'react';
import AuthContext from '@/infrastructure/reducer/context/auth.context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
