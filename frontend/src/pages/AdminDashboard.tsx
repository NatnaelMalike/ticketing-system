import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { fetchTickets, updateTicketStatus } from '../store/ticketSlice';
import { logout } from '../store/authSlice';
import { TicketList } from '../components/ticket/TicketList';
import { Ticket } from '../types';
import { PuffLoader } from 'react-spinners';

export const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const {tickets, error, loading} = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    if (token) dispatch(fetchTickets() as any);
  }, [token, dispatch]);

  const handleUpdateStatus = (id: string, status: Ticket['status']) => {
    dispatch(updateTicketStatus(id, status) as any);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!token) return <Navigate to="/" />;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <PuffLoader color='#ff0000' loading={loading}/>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!loading && !error &&<TicketList tickets={tickets} isAdmin={true} onUpdateStatus={handleUpdateStatus} />}
    </div>
  );
};