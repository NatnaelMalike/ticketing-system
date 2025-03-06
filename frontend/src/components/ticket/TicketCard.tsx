import { useState } from "react";
import { Tag, Clock, User, Pencil } from "lucide-react";
import { TicketCardProps } from "../../types";
import StatusModal from "./StatusModal";

const statusColors = {
  Open: "bg-green-100 text-green-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Closed: "bg-gray-100 text-gray-800",
};

const TicketCard = ({
  _id,
  title,
  description,
  status,
  createdBy,
  isAdmin,
  createdAt,
  onUpdateStatus,
}: TicketCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-4">
              <Tag className="h-5 w-5 text-blue-500" />
              {title}
            </h3>
            <p className="text-gray-500 text-sm text-justify">
              {description}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
        {isAdmin && onUpdateStatus && (
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex gap-2 mr-2 cursor-pointer"
            >
              <Pencil className="text-blue-500" /> Edit Status
            </button>
          </div>
        )}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-blue-100">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">{createdAt}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <User className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">{createdBy.username}</span>
          </div>
        </div>
      </div>
      {isAdmin && onUpdateStatus && (
        <StatusModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentStatus={status}
          onStatusUpdate={(newStatus) => onUpdateStatus(_id, newStatus)}
          ticketTitle={title}
        />
      )}
    </>
  );
};

export default TicketCard;
