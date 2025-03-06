import { LogOut, Plus, User } from "lucide-react";
interface Props {
  modal: (x: boolean) => void;
  logout: () => void;
  isUser: boolean;
  user: string
}

function Navbar({ modal, logout, isUser, user }: Props) {
  return (
    <nav className="bg-white sm:px-0 sm:h-full px-6 w-full sm:w-min fixed sm:sticky sm:top-12 left-0 bottom-0 z-10">
      <ul className="flex h-full py-4 gap-8 sm:flex-col justify-between sm:justify-start text-gray-500 sticky top-12">
        <div className="gap-2 flex items-center">
          <User className="text-blue-500"/>
          <span >{user}</span>
        </div>
      {isUser &&  <button
          onClick={() => modal(true)}
          className="cursor-pointer flex gap-2 items-center whitespace-nowrap
        hover:text-blue-500 
        "
        >
          <Plus />
          <p className="hidden sm:block">Add Ticket</p> 
        </button>}
        <button
          onClick={() => logout()}
          className="cursor-pointer flex gap-2 items-center
        hover:text-blue-500 
        "
        >
          <LogOut color="red" />
         <p >Logout</p> 
        </button>
      </ul>
    </nav>
  );
}

export default Navbar;
