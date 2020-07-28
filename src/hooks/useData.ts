import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useFirestoreConnect,
  useFirestore,
  isLoaded as _isLoaded,
  isEmpty as _isEmpty,
} from "react-redux-firebase";
import get from "lodash/get";

import AppState from "@models/store";
import useId from "./useId";

interface useDataResult<T> {
  isNew: boolean;
  isLoaded: boolean;
  isEmpty: boolean;
  id: string | undefined;
  data: T;
  setData: Function;
  resetData: Function;
  saveOrUpdate: () => Promise<saveOrUpdateResult<T>>;
}

interface saveOrUpdateResult<T> {
  data: T;
  id: string | undefined;
  path: string;
  isNew: boolean;
}

export function useData<T>(path: string, initData: T): useDataResult<T> {
  const { isNew, id } = useId();
  const firestore = useFirestore();
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

  async function saveOrUpdate(): Promise<saveOrUpdateResult<T>> {
    console.log("save or update", isNew, id, data);

    try {
      if (isNew) {
        firestore.add(path, data);
      } else firestore.update(`${path}/${id}`, data);
    } catch (err) {
      console.log("Error: save or update", err);
    }

    return {
      data,
      id,
      path,
      isNew,
    };
  }

  return {
    isNew,
    isLoaded,
    isEmpty,
    id,
    data,
    setData,
    resetData,
    saveOrUpdate,
  } as useDataResult<T>;
}

export default useData;
