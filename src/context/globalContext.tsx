import { createContext, useContext, useState } from "react";

// interface GlobalContextType {
//   statePage: any;
//   setStatePage: (value: any) => void;
// }

interface GlobalContext {
  statePage: any;
  setStatePage: (value: any) => void;
}

export const GlobalContext = createContext<GlobalContext>(null as any);

export const GlobalState = () => useContext(GlobalContext);

// interface Props {
//   emuchievementsState: EmuchievementsState;
// }

export const GlobalContextProvider = ({ children, emuchievementsState }) => {
  const [publicEmuchievementsState, setPublicEmuchievementsState] = useState<GlobalContext>({
    ...emuchievementsState,
  });

  // useEffect(() => {
  //   function onUpdate() {
  //     setPublicEmuchievementsState({ ...emuchievementsState });
  //   }
  // }, []);

  return <GlobalContext.Provider value={{ ...publicEmuchievementsState }}>{children}</GlobalContext.Provider>;
};
