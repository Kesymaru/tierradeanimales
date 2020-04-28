import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useFirestoreConnect,
  isLoaded as _isLoaded,
  isEmpty as _isEmpty,
} from "react-redux-firebase";
import get from "lodash/get";

import AppState from "@core/models/store";
import useId from "./useId";

export function useData<T>(path: string, initData: T) {
  console.log("load path", path);

  const { isNew, id } = useId();
  useFirestoreConnect({
    collection: path,
    doc: id,
  });
  const _data = useSelector<AppState, T>((state) => {
    if (id) return get(state, `firestore.data.${path}.${id}`, initData);
    return get(state, `firestore.ordered.${path}`, initData);
  });
  const [data, setData] = useState<T>(initData);
  const isLoaded = _isLoaded(_data);
  const isEmpty = _isEmpty(_data);

  useEffect(() => {
    if (!isNew && isLoaded && !isEmpty) setData(_data);
  }, [isNew, isLoaded, isEmpty, _data]);

  function resetData() {
    setData(id ? _data : initData);
  }

  return {
    isNew,
    isLoaded,
    isEmpty,
    id,
    data,
    setData,
    resetData,
  };
}

export default useData;