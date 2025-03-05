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
    loading: boolean;
    error: string | null
  }
  
  export interface UserCredentials {
    username: string;
    password: string;
    confirmPassword?: string;
    role?: 'user' | 'admin' | undefined;
    remember?: boolean;
  }