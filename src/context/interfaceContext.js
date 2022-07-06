import { createContext, useContext, useState } from "react";

export const InterfaceContext = createContext();

export const useInterfaceContext = () => {
   return useContext(InterfaceContext)
}

export const InterfaceContextProvider = ({ children }) => {
   const [sidebarShowStatus,setSidebarShowStatus] = useState(false);

   const SidebarMenuClick = ()=>{
      setSidebarShowStatus(!sidebarShowStatus);
   }

   const contextValue = {
      sidebarShowStatus,
      SidebarMenuClick,
   }
   return <InterfaceContext.Provider value={contextValue}>{children}</InterfaceContext.Provider>
}