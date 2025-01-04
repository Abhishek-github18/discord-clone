import { useUser } from "@clerk/clerk-react";
import supabase from "../utils/supabaseClient";
import { useEffect } from "react";

export const useProfile = (setUserProfile) => {
  const { isSignedIn, user, isLoaded } = useUser();
//   const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getOrCreateProfile = async () => {
      if (!isSignedIn && isLoaded) {
        window.location.href = '/sign-in';
        return;
      }

      if (isSignedIn && user) {
        // console.log("User signed in:", user);

        // Fetch profile
        const { data: profiles, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('userid', user.id);

        if (fetchError) {
          console.error(fetchError);
          return;
        }

        if (profiles.length === 0) {
          // Create profile if not exists
          const { data: profile, error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                userid: user.id,
                name: user.fullName,
                imageurl: user.imageUrl,
                email: user.emailAddresses[0]?.emailAddress,
              },
            ])
            .select()
            .single();

          if (insertError) {
            console.error(insertError);
          } else {
            setUserProfile(profile); // Update state with new profile
          }
        } else {
            setUserProfile(profiles[0]); // Update state with fetched profile
        }
      }
    };

    getOrCreateProfile();
  }, [isSignedIn, isLoaded, user]);
};
