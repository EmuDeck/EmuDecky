import { createContext } from "react";

interface GlobalContextType {
  statePage: any;
  setStatePage: (value: any) => void;
}

export const GlobalContext = createContext<GlobalContextType>(null as any);
