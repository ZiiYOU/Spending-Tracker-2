import { createContext } from "react";
import { useState } from "react";

export const MonthContext = createContext();

const MonthProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  return (
    <>
      <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
        {children}
      </MonthContext.Provider>
    </>
  );
};

export default MonthProvider;
