import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ScrollArea } from "../ui/scroll-area";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/clerk-react";
import CreateServerModal from "./CreateServerModal";


const NavigationSidebar = () => {
  const servers = useSelector((state) => state?.server?.server);
  const [activeServerId, setActiveServerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  return (
    <div className="flex flex-col items-center w-12 h-screen bg-gray-200 dark:bg-[#1E1F22] space-y-4 py-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={() => setIsModalOpen(true)} // Open modal on click
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5865f2] hover:bg-[#4b56c6] dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-200"
            >
              <Plus size={24} color="white" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={-10}
            side="right"
            className="text-white bg-gray-700 dark:bg-gray-300 dark:text-black p-2 rounded-md"
          >
            <p>Create a Server</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="horizontal" className="w-10 dark:bg-gray-400 bg-black" />

      <ScrollArea className="relative flex-grow">
        {servers?.map((server) => (
          <div key={server?.id} className="relative w-full">
            {server?.id === activeServerId && (
              <div
                className="absolute top-0 left-[-12px] w-[4px] h-full bg-black dark:bg-white rounded-lg z-10"
              ></div>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    className={clsx(
                      "flex items-center justify-center w-10 h-10 transition duration-200 hover:rounded-md"
                    )}
                    onClick={() => setActiveServerId(server?.id)}
                  >
                    {server?.icon_url ? (
                      <img
                        src={server?.icon_url}
                        alt={server?.name}
                        className={clsx(
                          "w-full h-full rounded-full hover:rounded-md transition duration-200",
                          server?.id === activeServerId
                            ? "rounded-lg"
                            : "rounded-full"
                        )}
                      />
                    ) : (
                      <span
                        className={clsx(
                          "flex items-center justify-center w-10 h-10 transition duration-200",
                          server?.id === activeServerId
                            ? "bg-[#004e61] rounded-lg dark:bg-[#003a76]"
                            : "bg-gray-800 hover:bg-gray-700 dark:bg-gray-300 dark:hover:bg-gray-400 rounded-full"
                        )}
                      >
                        {server?.name.charAt(0)}
                      </span>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={-10}
                  side="right"
                  className="text-white bg-gray-700 dark:bg-gray-300 dark:text-black p-2 rounded-md"
                >
                  <p>{server?.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </ScrollArea>

      <div className="flex flex-col items-center space-y-4">
        <ModeToggle />
        <UserButton className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-300" />
      </div>

      {/* Include the CreateServerModal */}
      {isModalOpen && (
        <CreateServerModal
          onClose={() => setIsModalOpen(false)} // Pass a function to close the modal
          openModal={isModalOpen} // Pass the state to control modal visibility
        />
      )}
    </div>
  );
};

export default NavigationSidebar;
