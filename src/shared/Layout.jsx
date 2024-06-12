import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

  const onClickLogo = () => {
    navigate("/");
  };

  const OnClickSignIn = () => {
    navigate("signIn");
  };

  const OnClickJoin = () => {
    navigate("join");
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsHome(true);
      return;
    }
    setIsHome(false);
  }, [window.location.pathname]);

  return (
    <div>
      <HeaderContainer>
        <div>
          <Logo style={{ display: isHome ? "none" : "" }} onClick={onClickLogo}>
            Spending Tracker.
          </Logo>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <SignInBtn onClick={OnClickSignIn}>로그인</SignInBtn>
          <SignInBtn onClick={OnClickJoin}>회원가입</SignInBtn>
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

const SignInBtn = styled.button`
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
