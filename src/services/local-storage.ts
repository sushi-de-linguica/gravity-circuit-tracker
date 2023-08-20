import { UPDATE_EVENT_KEY } from "../hooks/use-local-storage";

export const setItem = (key: string, data: any) => {
  try {
    localStorage.setItem(key, data);
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_KEY));
  } catch (error) {
    console.error("Erro ao atualizar nó:", error);
    throw error;
  }
};

export const getItem = (key: string) => {
  try {
    const value = localStorage.getItem(key);

    return value;
  } catch (error) {
    console.error("Erro ao obter nó:", error);
    throw error;
  }
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_KEY));
  } catch (error) {
    console.error("Erro ao remover nó:", error);
    throw error;
  }
};
