import axios from "axios";
import { useContext, useEffect } from "react";
import { SpendingContext } from "../context/spendingListContext";

const useSpending = () => {
  const { list, setList } = useContext(SpendingContext);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/spending");
        if (data.length) {
          setList(data);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return;
};

export default useSpending;
