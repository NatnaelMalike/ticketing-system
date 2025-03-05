import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { fetchTickets, createNewTicket } from '../store/ticketSlice';
import { logout } from '../store/authSlice';
import { TicketForm } from '../components/ticket/TicketForm';
import { TicketList } from '../components/ticket/TicketList';
import { TicketFormData } from '../schemas/ticketSchema';
import { PuffLoader } from 'react-spinners';

export const UserDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const {tickets, loading, error} = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    if (token) dispatch(fetchTickets() as any);
  }, [token, dispatch]);

  const handleCreateTicket = (data: TicketFormData) => {
    dispatch(createNewTicket(data) as any);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!token) return <Navigate to="/" />;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <TicketForm onSubmit={handleCreateTicket} />
      <PuffLoader color='#ff0000' loading={loading}/>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!loading && !error &&<TicketList tickets={tickets} isAdmin={false} />}
    </div>
  );
};