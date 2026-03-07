import { useAuthCallback } from "@/hook/useAuth";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynced = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (isSignedIn && user && !hasSynced.current) {
        hasSynced.current = true;
        syncUser(undefined, {
          onSuccess: () => {
            console.log("User synced successfully");
          },
          onError: (error) => {
            console.log("User sync failed", error);
          },
        });
      }
      if (!isSignedIn && hasSynced.current) {
        hasSynced.current = false;
      }
    }, [isSignedIn, user, syncUser]),
  );

  return null;
};

export default AuthSync;
