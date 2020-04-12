import { useParams } from "react-router-dom";

import { RouteParams } from "../models/route";

export function useId(path: string = "id"): RouteParams {
  const params = useParams() as any;
  let id = params[path];
  const isNew = id && id.toLowerCase() === "new";
  id = isNew ? undefined : isNew;

  return { id, isNew, params };
}

export default useId;
