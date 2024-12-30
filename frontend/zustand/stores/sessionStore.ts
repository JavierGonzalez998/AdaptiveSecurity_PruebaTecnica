import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";

export type SessionState = {
  session: Record<string, string> | null;
};

export type SessionActions = {
    setSession: (session: Record<string, string>) => void;
    removeSession: () => void;
};

export type SessionStore = SessionState & SessionActions;

export const defaultInitState: SessionState = {
  session: null,
};

export const createSessionStore = (
  initState: SessionState = defaultInitState
) => {
  return createStore<SessionStore>()(
    persist(
      (set) => ({
        ...initState,
        setSession: (session) => set({ session }),
        removeSession: () => set({ session: null }),
      }),
      {
        name: "session-storage", // Nombre de la clave en localStorage
        storage: createJSONStorage(() => sessionStorage) // Cambia a sessionStorage si lo prefieres
      }
    )
  );
};

