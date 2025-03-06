export interface Ticket {
    _id: string;
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdBy: {username:string};
    createdAt?: string;
    
  }

  export interface TicketCardProps extends Ticket{
    isAdmin: boolean;
    onUpdateStatus?: (id: string, status: Ticket['status']) => void;
  }


  
  export interface AuthResponse {
    token: string;
    user: string;
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