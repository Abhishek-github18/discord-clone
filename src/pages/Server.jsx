import { useParams } from "react-router-dom";
import ServerSideBar from "../components/custom/ServerSideBar";
import { useEffect } from "react";
import supabase from "../utils/supabaseClient";
import {useDispatch} from 'react-redux'
import { setChannels } from "../utils/redux/slices/channelSlice";
import { setSelectedServerDetails } from "../utils/redux/slices/serverSlice";
const Server = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // details about that particular server and also members and channels associated to that server

  const fetchServerDetails = async () => {
    const { data: serverDetails, error: serverError } = await supabase
      .from("servers")
      .select("*")
      .eq("id", params.serverId);

      if(serverDetails){
        dispatch(setSelectedServerDetails(serverDetails));
      }

    console.log({
      serverDetails,
    });
    if(serverError){
        console.erro(serverError);
    }

    const {data: channels, error: channelError} = await supabase.from('channels').select('*').eq('server_id', params.serverId);

    if(channels){
      dispatch(setChannels(channels));
        console.log(channels);
    }

    const {data: memberDetails, error: memberError} = await supabase.from('members').select('*').eq('server_id', params.serverId);

    if(memberDetails){
        console.log(memberDetails);
    }


  };

  useEffect(() => {
    fetchServerDetails();
  }, [params]);

  return (
    <div className="ml-16">
      <div className="server-sidebar hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed">
        <ServerSideBar />
      </div>
      <main className="h-full md:pl-60">
        Welcome ! to the server id - {params.serverId}
      </main>
    </div>
  );
};

export default Server;
