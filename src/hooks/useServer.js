import supabase from "../utils/supabaseClient";
import { useEffect } from "react";

export const useServer = (setServers, id) => {
  useEffect(() => {
    const getServer = async () => {
      if (!id) return;

      const { data: servers, error } = await supabase
        .from("servers")
        .select("*")
        .eq("owner_id", id);

      if (error) {
        console.error(error);
        return;
      }

      setServers(servers);
    };

    getServer();
  }, [id, setServers]);
}