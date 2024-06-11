import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <LayoutStyle>
        <Header />
        {children}
      </LayoutStyle>
    </>
  );
};

export default Layout;

const Header = () => {
  const navigate = useNavigate();

  const OnClickHeader = () => {
    navigate("/");
  };

  const OnClickSignIn = () => {
    navigate("signIn");
  };

  const OnClickJoin = () => {
    navigate("join");
  };

  return (
    <>
      <ButtonContainer>
        <SignInBtn onClick={OnClickSignIn}>로그인</SignInBtn>
        <SignInBtn onClick={OnClickJoin}>회원가입</SignInBtn>
      </ButtonContainer>
      <HeaderStyle onClick={OnClickHeader}>Spending Tracker.</HeaderStyle>
    </>
  );
};

const LayoutStyle = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #f5f7f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
`;

const HeaderStyle = styled.div`
  width: 200px;
  color: #202632;
  font-size: 38px;
  font-weight: 700;
  margin-top: 8px;
  margin-right: 480px;
  cursor: pointer;
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
`;

const ButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 2% 7%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
