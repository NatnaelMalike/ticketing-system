import { useState } from "react";
import DropDown from "../DropDown";
import {BiSad} from "react-icons/bi";
import { Ticket } from "../../types";
import TicketCard from "./TicketCard";

interface Props {
Status: string
  tickets: Ticket[];
  isAdmin: boolean;
  onUpdateStatus?: (id: string, status: Ticket["status"]) => void;
}

function GenericTicketList({Status ,tickets, isAdmin, onUpdateStatus}: Props) {
  const [status, setStatus] = useState<string>(Status);

  const filteredTasks = tickets.filter((ticket) => {
    if (status === "All") {
        return ticket
    } else {
        return  ticket.status === status;
    }
});


  return (
    <div className="bg-white appear-animation pb-12 sm:py-8 text-gray-600 overflow-x-hidden  px-4 sm:px-8 h-full w-full">
      <div className="flex flex-col flex-wrap sm:flex-row justify-between gap-6 items-center">
        <h1 className="sm:text-left text-2xl font-semibold">Tickets</h1>
        <div className="flex gap-2">
          <DropDown
            className="z-10 rounded-full w-[10rem]"
            values={["Open", "In Progress", "Closed"]}
            onChange={(value) => {
              setStatus(value);
            }}
            placeholder="Category"
          ></DropDown>
        
        </div>
      </div>

      <div className="mt-8 mb-20 space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((ticket, index) => {
            return (
              <div className="z-10" key={index} style={{}}>
                <TicketCard key={ticket._id}
          _id={ticket._id}
          title={ticket.title}
          description={ticket.description}
          status={ticket.status}
          createdBy={ticket.createdBy}
          createdAt={ticket.createdAt}
          isAdmin={isAdmin}
          onUpdateStatus={onUpdateStatus} />
              </div>
            );
          })
        ) : (
          <div className="flex gap-2 justify-center h-[50vh] items-center text-2xl text-gray-400">
            <BiSad className="inline-block"></BiSad>
            No Tickets
          </div>
        )}
      </div>
    </div>
  );
}

export default GenericTicketList;
