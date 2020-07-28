import get from "lodash/get";

export function isNewId(params: Record<string, string>, path: string) {
  const id = get(params, path, undefined);
  return id && id.toLowerCase() === "new";
}

export default isNewId;
