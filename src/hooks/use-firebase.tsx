import { useEffect, useState } from "react";
import { database, getNode } from "../services/firebase";
import { onValue, ref } from "firebase/database";

const defaultCallbackData = (value: any) => value;

interface IUseFirebaseProps<T = any> {
  url: string;
  defaultData: T;
}

interface IUseFirebaseResponse<T = any> {
  data: T;
  isLoading: boolean;
}

export const useFirebase = (
  { url, defaultData = [] }: IUseFirebaseProps,
  callbackValue = defaultCallbackData
): IUseFirebaseResponse => {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  const currentRef = ref(database, url);

  const handleGetInitialDataFirstTime = async () => {
    const value = await getNode(url);
    const result = callbackValue(value);

    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    onValue(
      currentRef,
      (snapshot) => {
        const value = callbackValue(snapshot.val());

        setData(value ?? defaultData);
        setIsLoading(false);

        return value;
      },
      () => {
        setIsLoading(false);
      }
    );

    handleGetInitialDataFirstTime();
  }, []);

  return {
    data,
    isLoading,
  };
};
