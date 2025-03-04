import { Ticket } from '../../types';

interface TicketListProps {
  tickets: Ticket[];
  isAdmin: boolean;
  onUpdateStatus?: (id: string, status: Ticket['status']) => void;
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, isAdmin, onUpdateStatus }) => {
  return (
    <ul className="space-y-2 mt-4">
      {tickets.map((ticket) => (
        <li key={ticket._id} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
          <div>
            <p className="font-semibold">{ticket.title}</p>
            <p className="text-sm text-gray-600">{ticket.description}</p>
            <p className="text-sm">Status: {ticket.status}</p>
          </div>
          {isAdmin && onUpdateStatus && (
            <select
              value={ticket.status}
              onChange={(e) => onUpdateStatus(ticket._id, e.target.value as Ticket['status'])}
              className="p-1 border rounded-md"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          )}
        </li>
      ))}
    </ul>
  );
};