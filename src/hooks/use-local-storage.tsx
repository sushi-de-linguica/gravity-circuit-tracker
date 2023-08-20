import { useEffect, useState } from "react";
import { getItem, removeItem, setItem } from "../services/local-storage";

const defaultCallbackData = (value: any) => value;

interface IUseLocalStorageProps<T = any> {
  url: string;
  defaultData: T;
}

interface IUseLocalStorageResponse<T = any> {
  data: T;
  isLoading: boolean;
  actions: {
    setNode: (path: string, value: any) => string | undefined | Promise<void>;
    getNode: (path: string) => string | undefined | Promise<string>;
    removeNode: (path: string) => void;
  };
}

export const UPDATE_EVENT_KEY = "UPDATE";

export const useLocalStorage = (
  { url, defaultData = [] }: IUseLocalStorageProps,
  callbackValue = defaultCallbackData
): IUseLocalStorageResponse => {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  const updatedLocalStorageData = () => {
    const value = getItem(url);
    if (!value) {
      setData(defaultData);
      return;
    }

    try {
      const newValue = callbackValue(JSON.parse(value));
      setData(newValue);
    } catch (err) {
      console.error("error when try parse value");
    }
  };

  useEffect(() => {
    updatedLocalStorageData();
    setIsLoading(false);

    window.addEventListener(UPDATE_EVENT_KEY, updatedLocalStorageData);

    return () => {
      window.removeEventListener(UPDATE_EVENT_KEY, updatedLocalStorageData);
    };
  }, []);

  return {
    data,
    isLoading,
    actions: {
      setNode: (key, value) => setItem(key, JSON.stringify(value)),
      getNode: getItem,
      removeNode: removeItem,
    },
  };
};
