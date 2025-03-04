export interface Ticket {
    _id: string;
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdBy: string;
    createdAt?: string;
  }
  
  export interface AuthResponse {
    token: string;
  }
  
  export interface UserCredentials {
    username: string;
    password: string;
    confirmPassword?: string;
    role?: 'user' | 'admin' | undefined;
    remember?: boolean;
  }