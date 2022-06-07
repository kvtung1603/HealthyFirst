import { useQuery } from "react-query";

import { getProfile } from "api/profile";
import { PROFILE } from "constants/profile";

const useProfile = (enabled = false) => {
  const { data: profile, refetch: refetchProfile } = useQuery(
    PROFILE,
    async () => {
      const response = await getProfile();

      return response.data;
    },

    { enabled }
  );

  return { profile, refetchProfile };
};

export default useProfile;
