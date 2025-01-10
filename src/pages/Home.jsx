import { useProfile } from "../hooks/useProfile";
import InitialModal from "../components/custom/InitialModal";
import { useSelector } from "react-redux";
import { useServer } from "../hooks/useServer";

const Home = () => {
  // const [userProfile, setUserProfile] = useState({});
  // const [servers, setServers] = useState([]);

  useProfile();

  const userProfile = useSelector((state) => state?.user?.user);

  useServer();

  const servers = useSelector((state) => state?.server?.server);

  return userProfile ? (
    <div>
      <h1>Protected Page</h1>
      <h2>Welcome {userProfile.name}</h2>
      <h2>Your Servers</h2>
      <ul>
        {!servers || servers.length === 0 ? (
          <InitialModal />
        ) : (
          servers.map((server) => <li key={server?.id}>{server?.name}</li>)
        )}
      </ul>
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};
export default Home;
