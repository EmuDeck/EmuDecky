import { createContext, useContext, useState, FC } from "react";

// interface GlobalContextType {
//   statePage: any;
//   setStatePage: (value: any) => void;
// }

interface GlobalContext {
  statePage: any;
  setStatePage: (value: any) => void;
}

interface GlobalContextProvider {
  children: any;
  emuDeckState: any;
}

export const GlobalContext = createContext<GlobalContext>(null as any);

export const GlobalState = () => useContext(GlobalContext);

// interface Props {
//   emuDeckState: EmuDeckState;
// }

export const GlobalContextProvider: FC<GlobalContextProvider> = ({ children, emuDeckState }) => {
  const [publicEmuDeckState] = useState<GlobalContext>({
    ...emuDeckState,
  });

  // useEffect(() => {
  //   function onUpdate() {
  //     setPublicEmuDeckState({ ...emuDeckState });
  //   }
  // }, []);

  return <GlobalContext.Provider value={{ ...publicEmuDeckState }}>{children}</GlobalContext.Provider>;
};
