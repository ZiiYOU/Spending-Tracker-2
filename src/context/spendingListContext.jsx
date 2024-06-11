import { createContext } from "react";
import { useState } from "react";

export const SpendingContext = createContext();

const SpendingProvider = ({ children }) => {
  const [list, setList] = useState([]);
  return (
    <>
      <SpendingContext.Provider value={{ list, setList }}>
        {children}
      </SpendingContext.Provider>
    </>
  );
};

export default SpendingProvider;
