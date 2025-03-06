import React from 'react';
import { TicketForm } from './TicketForm';
import { TicketFormData } from '../../schemas/ticketSchema';
import { CircleX } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onSubmit: (data: TicketFormData)=> void
  onClose: () => void;

}

const TicketModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit

}) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white relative rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-center mb-4 mt-2">Create New Ticket</h3>
        <TicketForm onSubmit={onSubmit} onClose={onClose}  />
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500  cursor-pointer"
          >
            <CircleX />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;