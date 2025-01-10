import { useProfile } from "../hooks/useProfile";
import InitialModal from "../components/custom/InitialModal";
import { useSelector } from "react-redux";
import { useServer } from "../hooks/useServer";
import NavigationSidebar from "../components/custom/Navigation-Sidebar";

const Home = () => {
  // const [userProfile, setUserProfile] = useState({});
  // const [servers, setServers] = useState([]);

  useProfile();

  const userProfile = useSelector((state) => state?.user?.user);

  useServer();

  const servers = useSelector((state) => state?.server?.server);

  return userProfile ? (
    <div className="flex h-screen">
      {/* Sidebar */}
      <NavigationSidebar />

      {/* Main Content */}
      <div className="flex-grow p-6 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {userProfile.name}</h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Your Servers</h2>
        <ul className="mt-2 space-y-2">
          {servers?.length > 0 ? (
            servers.map((server) => (
              <li key={server?.id} className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow">
                {server?.name}
              </li>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No servers found. Create one using the "+" button!</p>
          )}
        </ul>
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Loading...</h1>
    </div>
  );
};

export default Home;
