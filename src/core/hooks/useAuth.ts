import { useSelector } from "react-redux";
import {
  isLoaded as _isLoaded,
  isEmpty as _isEmpty,
} from "react-redux-firebase";

import AppState from "@core/models/store";

interface useAuthResult {
  auth: any;
  logged: boolean;
}

export function useAuth(): useAuthResult {
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const logged = _isLoaded(auth) && !_isEmpty(auth);

  return {
    auth,
    logged,
  };
}

export default useAuth;
