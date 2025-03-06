import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";
import { fetchTickets, updateTicketStatus } from "../store/ticketSlice";
import { logout } from "../store/authSlice";
import { Ticket } from "../types";
import { MoonLoader } from "react-spinners";
import Navbar from "../components/layout/Navbar";
import GenericTicketList from "../components/ticket/GenericTicketList";

export const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { tickets, error, loading } = useSelector(
    (state: RootState) => state.tickets
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) dispatch(fetchTickets() as any);
  }, [token, dispatch]);

  const handleUpdateStatus = (id: string, status: Ticket["status"]) => {
    dispatch(updateTicketStatus(id, status) as any);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!token) return <Navigate to="/" />;

  return (
    <div className="min-h-[100vh] bg-white py-8 w-full sm:w-11/12 md:w-10/12 lg:w-4/5 rounded-lg mx-auto relative max-w-7xl flex">
      {loading && (
        <MoonLoader
          color="#1b9ad8"
          className="text-center justify-self-center"
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && (
        <GenericTicketList
          Status="All"
          tickets={tickets}
          isAdmin={true}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
      <Navbar modal={setIsModalOpen} logout={handleLogout} isUser={false} user={user}/>
    </div>
  );
};
