import React from "react";
import {
  RegisterContainer,
  Inputs,
  ButtonContainer,
} from "../components/InputContainer";
import { PageBtnBox, PageBtn } from "./SignIn";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/signIn");
  };

  return (
    <div style={{ padding: "7.5vh 0 10vh" }}>
      <JoinTitle>Join Us 🎉</JoinTitle>
      <RegisterContainer>
        <Inputs placeholder="닉네임을 입력해주세요." />
        <Inputs placeholder="아이디를 입력해주세요." />
        <Inputs placeholder="비밀번호를 입력해주세요." />
        <Inputs placeholder="비밀번호를 한번 더 입력해주세요." />
        <ButtonContainer>
          <JoinButton>회원 가입하기</JoinButton>
        </ButtonContainer>
        <PageBtnBox>
          <PageBtn onClick={navigateHandler}>{`로그인 >`}</PageBtn>
        </PageBtnBox>
      </RegisterContainer>
    </div>
  );
};

export default Join;

const JoinTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #202632;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10%;
`;

const JoinButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 15px;
  box-sizing: border-box;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  background-color: #6592d1;
  color: #fff;
  &:hover {
    background-color: #eeecec;
    color: black;
    transition: 0.5s;
  }
`;
