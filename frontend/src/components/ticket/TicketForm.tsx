import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketSchema, TicketFormData } from "../../schemas/ticketSchema";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ScaleLoader } from "react-spinners";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormMessage } from "../ui/form-message";

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => void;
  onClose: () => void;
}

export const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, onClose }) => {
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
    onClose()
    reset();
  };

  return (
    <div className="w-full">
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <Input {...register("title")} placeholder="Ticket Title" />
        {errors.title && (
          <FormMessage message={errors.title.message}/>
        )}
      </div>
      <div>
        <Textarea {...register("description")} placeholder="Description" />
        {errors.description && (
          <FormMessage message={errors.description.message} />
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 mt-8 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {creating ? (
          <ScaleLoader color="#ffffff" height={15} />
        ) : (
          "Create Ticket"
        )}
      </button>
    </form>
    </div>
  );
};
