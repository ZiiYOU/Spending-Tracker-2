import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../api/auth";
import { AuthContext } from "../context/authContext";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
    </>
  );
};

export default Layout;

const Header = () => {
  const navigate = useNavigate();
  const [isHome, setIsHome] = useState(false);
  const { userInfo, setUserInfo, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const onClickLogo = () => {
    navigate("/");
  };

  const OnClickSignIn = () => {
    navigate("signIn");
  };

  const onLogoutHandler = () => {
    logOut();
    setIsAuthenticated(false);
    navigate("signIn");
  };

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUserInfo(userLocalStorage);
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsHome(true);
      return;
    }
    setIsHome(false);
  }, [window.location.pathname]);

  console.log(userInfo);

  return (
    <div>
      <HeaderContainer>
        <div>
          <Logo style={{ display: isHome ? "none" : "" }} onClick={onClickLogo}>
            Spending Tracker.
          </Logo>
        </div>

        <div
          style={{
            display: isAuthenticated ? "flex" : "none",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AvatarBox>
            <img
              src={
                userInfo?.avatar
                  ? userInfo?.avatar
                  : "/public/icons8-male-user-50.png"
              }
              style={{
                width: "24px",
                position: "absolute",
                objectFit: "cover",
              }}
            />
          </AvatarBox>
          <HeaderBtn>{`${userInfo?.nickname} 님`} </HeaderBtn>
          <HeaderBtn onClick={OnClickSignIn}>내 프로필</HeaderBtn>
          <HeaderBtn onClick={onLogoutHandler}>로그아웃</HeaderBtn>
        </div>
      </HeaderContainer>
    </div>
  );
};

const LayoutStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f7f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
`;

const HeaderContainer = styled.div`
  width: 100vw;
  height: 8vh;
  box-sizing: border-box;
  padding: 2% 7vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 9;
  background-color: #f5f7f8;
  top: 0;
  /* box-shadow: 0 0 10px 0 grey; */
`;

const Logo = styled.button`
  width: 200px;
  color: #202632;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  background-color: transparent;
  outline: none;
  border: none;
`;

const AvatarBox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
`;

const HeaderBtn = styled.button`
  width: 70px;
  height: 18px;
  background-color: transparent;
  box-sizing: border-box;
  border-color: transparent;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: black;
    transition: 0.5s;
  }
`;
