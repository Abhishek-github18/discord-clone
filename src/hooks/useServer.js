import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServers } from "./utils/getServers";
import { setServer } from "../utils/redux/slices/serverSlice";

export const useServer = () => {
  const userProfile = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServers = async () => {
      try {
        if (!userProfile) return;

        const servers = await getServers(userProfile.id); // Call the reusable function
        dispatch(setServer(servers));
      } catch (error) {
        console.error("Error in useServer hook:", error);
      }
    };

    fetchServers();
  }, [userProfile, dispatch]);
};
