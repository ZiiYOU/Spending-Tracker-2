import React from "react";
import {
  RegisterContainer,
  Inputs,
  ButtonContainer,
  InputButton,
} from "../components/InputContainer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignIn = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/join");
  };

  return (
    <div style={{ padding: "14vh 0 20vh" }}>
      <SignInTitle>Log In ✨ </SignInTitle>
      <SignInContainer>
        <Inputs placeholder="아이디를 입력해주세요." />
        <Inputs placeholder="비밀번호를 입력해주세요." />
        <ButtonContainer>
          <InputButton>로그인</InputButton>
        </ButtonContainer>
        <PageBtnBox>
          <PageBtn onClick={navigateHandler}>{`회원가입 >`} </PageBtn>
        </PageBtnBox>
      </SignInContainer>
    </div>
  );
};

export default SignIn;
export { PageBtnBox, PageBtn };

const SignInTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #202632;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10%;
`;

const SignInContainer = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 50px;
  background-color: #fff;
  padding: 25px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const PageBtnBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 3%;
  margin-right: 10%;
`;

const PageBtn = styled.button`
  width: 30%;
  height: 25px;
  border-color: transparent;
  background-color: transparent;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
    text-decoration: underline;
    transition: 0.5s;
  }
`;
