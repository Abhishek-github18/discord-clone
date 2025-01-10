import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"; // Import Tooltip and Separator from ShadCN
import { Separator } from "../ui/separator"; // Import Tooltip and Separator from ShadCN
import { Plus } from "lucide-react"; // Import the `Plus` icon from Lucide
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // For navigation
import clsx from "clsx"; // For conditional styling

const NavigationSidebar = () => {
  const servers = useSelector((state) => state?.server?.server); // Fetch servers from Redux

  return (
    <div className="flex flex-col items-center w-16 h-screen bg-gray-900 space-y-4 py-4">
      {/* + Button */}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-200">
              <Plus size={24} color="white" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={-10}
            className="text-white bg-gray-700 p-2 rounded-md"
          >
            <p>Create a Server</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Separator */}
      <Separator orientation="horizontal" className="w-10" />

      {/* Server List */}
      {servers?.map((server) => (
        <TooltipProvider key={server?.id}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                to={`/server/${server?.id}`}
                className={clsx(
                  "flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 transition duration-200"
                )}
              >
                {/* Fallback to server name's first letter if no icon */}
                {server?.icon_url ? (
                  <img
                    src={server?.icon_url}
                    alt={server?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span className="text-white text-lg font-bold">
                    {server?.name.charAt(0)}
                  </span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={-10}
              className="text-white bg-gray-700 p-2 rounded-md"
            >
              <p>{server?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default NavigationSidebar;
