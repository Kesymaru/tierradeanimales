import { useParams } from "react-router-dom";

export function useId(
  field: string = "id"
): { isNew: boolean; id: string | undefined } {
  const params = useParams() as any;
  const id = params[field];
  const isNew = id && id.toLowerCase() === "new";

  return { isNew, id };
}

export default useId;
