import supabase from "../../utils/supabaseClient";

/**
 * Fetch servers owned by the given user ID.
 * @param {string} ownerId - The ID of the server owner.
 * @returns {Promise<object[]>} - The list of servers.
 */
export const getServers = async (ownerId) => {
  if (!ownerId) return [];

  const { data: servers, error } = await supabase
    .from("servers")
    .select("*")
    .eq("owner_id", ownerId);

  if (error) {
    console.error("Error fetching servers:", error);
    throw error; // Let the caller handle the error
  }

  return servers;
};
