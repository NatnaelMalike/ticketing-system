import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";
import { fetchTickets, createNewTicket } from "../store/ticketSlice";

import Navbar from "../components/layout/Navbar";
import GenericTicketList from "../components/ticket/GenericTicketList";
import { MoonLoader } from "react-spinners";
import TicketModal from "../components/ticket/AddTicketBtn";
import { TicketFormData } from "../schemas/ticketSchema";
import { logout } from "../store/authSlice";

export const UserDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { tickets, loading, error } = useSelector(
    (state: RootState) => state.tickets
  );

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
    <div className="min-h-[100vh] bg-white py-8 w-full sm:w-11/12 md:w-10/12 lg:w-4/5 rounded-lg mx-auto relative max-w-7xl flex">
      {loading && (
        <MoonLoader
          color="#1b9ad8"
          className="text-center justify-self-center"
        />
      )}
      {!loading && !error && (
        <GenericTicketList Status="All" tickets={tickets} isAdmin={true} />
      )}
      <Navbar modal={setIsModalOpen} logout={handleLogout} isUser={true} user={user} />
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
};
