import { useState, useEffect } from "react";

export function useTitle(value: string): { title: string; setTitle: Function } {
  const [title, setTitle] = useState<string>(value);
  useEffect(() => {
    document.title = title;
  }, [title]);
  return { title, setTitle };
}

export default useTitle;
