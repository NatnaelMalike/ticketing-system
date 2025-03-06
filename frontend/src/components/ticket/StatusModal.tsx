import React from 'react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onStatusUpdate: (newStatus: 'Open' | 'In Progress' | 'Closed') => void;
  ticketTitle: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  currentStatus,
  onStatusUpdate,
  ticketTitle
}) => {
  if (!isOpen) return null;

  const statuses: Array<'Open' | 'In Progress' | 'Closed'> = ['Open', 'In Progress', 'Closed'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-center mb-4">Update Ticket Status</h3>
        <p className=" text-gray-600 mb-4">"{ticketTitle}"</p>
        
        <div className="space-y-2">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => {
                onStatusUpdate(status);
                onClose();
              }}
              className={`w-full p-3 rounded-md text-left transition-colors ${
                currentStatus === status
                  ? 'bg-blue-50 text-blue-700 border-2 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 rounded-2xl  text-white cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;