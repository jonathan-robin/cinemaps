import React, { useState, createContext, useContext } from "react";
import { display_info } from "../interfaces/interfaces";

export type SectionsContext = [
    display_info[],
    React.Dispatch<React.SetStateAction<display_info[]>>
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
    const [sectionsState, setSectionsState] = useState<display_info[]>([{
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

// export const _SectionsContext = React.createContext<SectionsContext>([
//   {    mode:'string', 
//         colorLine:'string', 
//         Line:'string',
//         direction:'string',
//         label:'string', 
//         duration:0},
//   () => null,
// ]);

// export const sectionsProvider: any = (props: any) => {
//   const [sectionsState, setSectionsState] = useState<display_info>({
//     mode:'string', 
//     colorLine:'string', 
//     Line:'string',
//     direction:'string',
//     label:'string', 
//     duration:0
//   });

//   return (
//     <_SectionsContext.Provider value={[sectionsState, setSectionsState]}>
//       {props.children}
//     </_SectionsContext.Provider>
//   );
// };