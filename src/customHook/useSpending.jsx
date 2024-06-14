import axios from "axios";
import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSpending } from "../api/spending";

const useSpending = () => {
  useEffect(() => {
    (async () => {
      await getSpending();
    })();
  }, []);

  const {
    data: spending,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["spending"],
    queryFn: getSpending,
  });

  return { spending, isPending, isError };
};

export default useSpending;
