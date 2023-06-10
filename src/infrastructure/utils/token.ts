import jwtDecode from 'jwt-decode';
import { TOKEN } from '@/infrastructure/utils/constans';
import { User } from '@/domain/entities/user/user.entity';

export function setToken(token: string, tokenName?: string) {
  localStorage.setItem(tokenName || TOKEN, token);
}

export function getToken(tokenName?: string) {
  return localStorage.getItem(tokenName || TOKEN);
}

export function decodeToken(token: string): User {
  return jwtDecode(token);
}

export function removeToken(tokenName?: string) {
  localStorage.removeItem(tokenName || TOKEN);
}
