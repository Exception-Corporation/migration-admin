import { createContext } from 'react';
import { User } from '@/domain/entities/user/user.entity';

const AuthContext = createContext<{
  auth: User | null;
  logout: () => void;
  setUser: (user: User | null, status?: boolean) => void;
}>({
  auth: null,
  logout: () => {},
  setUser: (_user: User | null, status: boolean = true) => {}
});

export default AuthContext;
