import { useSelector } from "react-redux";
import {
  isLoaded as _isLoaded,
  isEmpty as _isEmpty,
} from "react-redux-firebase";
import get from "lodash/get";

import AppState from "@models/store";

interface useAuthResult {
  auth: any;
  profile: any;
  logged: boolean;
  role: string;
}

export function useAuth(): useAuthResult {
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const profile = useSelector<AppState, any>((state) => state.firebase.profile);
  const role = useSelector<AppState, string>((state) =>
    get(state, "firebase.profile.role", "users")
  );
  const logged = _isLoaded(auth) && !_isEmpty(auth);

  return {
    auth,
    profile,
    logged,
    role,
  };
}

export default useAuth;
