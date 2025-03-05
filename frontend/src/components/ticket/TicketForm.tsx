import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTicketSchema, TicketFormData } from '../../schemas/ticketSchema';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ScaleLoader } from 'react-spinners';

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => void;
}

export const TicketForm: React.FC<TicketFormProps> = ({ onSubmit }) => {
  const { creating } = useSelector((state: RootState) => state.tickets);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TicketFormData>({
    resolver: zodResolver(createTicketSchema),
  });

  const handleFormSubmit = (data: TicketFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <input
          {...register('title')}
          placeholder="Ticket Title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <textarea
          {...register('description')}
          placeholder="Description"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {creating ? (
           <ScaleLoader
             color="#ffffff"
             height={15}
           />
          ) : (
            "Create Ticket"
          )}
      </button>
    </form>
  );
};