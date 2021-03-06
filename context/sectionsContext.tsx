import React, { useState, useContext } from "react";
import { display_info } from "../interfaces/interfaces";

export type SectionsContext = [
    display_info[] | null,
    React.Dispatch<React.SetStateAction<display_info[] | null>>
];

export const AppContext = React.createContext<SectionsContext>([
[    {    mode:'string', 
          colorLine:'string', 
          Line:'string',
          direction:'string',
          label:'string', 
          duration:0}],
    () => null,
  ]);

export function AppWrapper({ children }:any) {
    const [sectionsState, setSectionsState] = useState<display_info[] | null>([{
        mode:'string', 
        colorLine:'string', 
        Line:'string',
        direction:'string',
        label:'string', 
        duration:0
      }]);
  return (
    <AppContext.Provider value={[sectionsState, setSectionsState]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
