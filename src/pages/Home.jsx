import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useServer } from '../hooks/useServer';
import InitialModal from '../components/custom/InitialModal';
import { useSelector } from 'react-redux';

const Home = () => {
  // const [userProfile, setUserProfile] = useState({});
  const [servers, setServers] = useState([]);

  useProfile();

  const userProfile = useSelector((state) => state?.user?.user);

  // fetching the servers associated with the user
  useServer(setServers);  

  return (
    userProfile ? (
      <div>
        <h1>Protected Page</h1>
        <h2>Welcome {userProfile.name}</h2>
        <h2>Your Servers</h2>
        <ul>
         {
          servers.length === 0 ? (
            <InitialModal />
          ) : (
            servers.map((server) => (
              <li key={server?.id}>{server?.name}</li>
            ))
          )
        }
        </ul>
      </div>
    ) : (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  )
 
}
export default Home;
