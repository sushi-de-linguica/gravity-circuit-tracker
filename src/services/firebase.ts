import { getDatabase, ref, set, get, remove } from "firebase/database";
import "firebase/database";
import { merge } from "lodash";

export const database = getDatabase();

export const setNode = async (path: string, data: any) => {
  try {
    const currentRef = ref(database, path);
    const result = await set(currentRef, data);
    console.log("[setNode]", result);
    return result;
  } catch (error) {
    console.error("Erro ao atualizar nó:", error);
    throw error;
  }
};

export const getNode = async (path: string) => {
  try {
    const currentRef = ref(database, path);
    const snapshot = await get(currentRef);
    const result = snapshot.val();

    return result;
  } catch (error) {
    console.error("Erro ao obter nó:", error);
    throw error;
  }
};

export const appendDataToNode = async (
  path: string,
  data: any,
  defaultData: any
) => {
  try {
    const currentRef = ref(database, path);
    let currentData = await getNode(path);

    if (!currentData) {
      currentData = defaultData;
    }

    const mergedData = merge(currentData, data);

    const result = await set(currentRef, mergedData);

    return result;
  } catch (error) {
    console.error("Erro ao atualizar nó:", error);
    throw error;
  }
};

export const removeNode = async (path: string) => {
  try {
    const currentRef = ref(database, path);
    const result = await remove(currentRef);
    console.log("[removeNode]", result);
    return result;
  } catch (error) {
    console.error("Erro ao remover nó:", error);
    throw error;
  }
};
