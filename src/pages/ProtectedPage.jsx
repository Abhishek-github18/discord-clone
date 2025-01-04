import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useServer } from '../hooks/useServer';

const ProtectedPage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [servers, setServers] = useState([]);

  useProfile(setUserProfile);

  // fetching the servers associated with the user
  useServer(setServers, userProfile.id);
  
  // need to fetch the channels associated with the servers
  // need to fetch the messages associated with the channels
  // need to fetch the users associated with the messages
  // need to fetch the reactions associated with the messages
  // need to fetch the users associated with the reactions


  return (
    userProfile ? (
      <div>
        <h1>Protected Page</h1>
        <h2>Welcome {userProfile.name}</h2>
        <h2>Your Servers</h2>
        <ul>
         {
          servers.length === 0 ? (
            <li>No servers, Create your server</li>
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
export default ProtectedPage;
