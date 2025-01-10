import supabase from "../utils/supabaseClient";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export const useServer = (setServers) => {

  const userProfile = useSelector((state) => state?.user?.user);

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

      setServers(servers);
    };

    getServer();
  }, [userProfile, setServers]);
}