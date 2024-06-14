import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { getUser } from "../api/auth";

const useAuth = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    getUser().then(({ id, nickname, avatar, success }) => {
      console.log({ id, nickname, avatar, success });
      if (success) {
        setUserInfo({ id, nickname, avatar });
      }
    });
  }, []);
};

export default useAuth;
