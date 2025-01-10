import supabase from "../utils/supabaseClient";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setServer } from "../utils/redux/slices/serverSlice";

export const useServer = (setServers) => {

  const userProfile = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getServer = async () => {
      if (!userProfile) return;

      const { data: servers, error } = await supabase
        .from("servers")
        .select("*")
        .eq("owner_id", userProfile.id);

      if (error) {
        console.error(error);
        return;
      }

      dispatch(setServer(servers));
      // setServers(servers);
    };

    getServer();
  }, [userProfile, setServers]);
}