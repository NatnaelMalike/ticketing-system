export interface Ticket {
    _id: string;
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    userId: string;
    createdAt?: string;
  }
  
  export interface AuthResponse {
    token: string;
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
    role?: 'user' | 'admin';
  }