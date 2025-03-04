// src/lib/authUtils.ts
import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  id: string;
  role: 'user' | 'admin';
}

export const getRoleFromToken = (token: string | null): 'user' | 'admin' | null => {
  if (!token) return null;
  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error('Invalid token:', error);
    return null; 
  }
};