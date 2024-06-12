import React, { useState } from "react";
import { RegisterContainer, Inputs } from "../components/InputContainer";
import { PageBtnBox, PageBtn } from "./SignIn";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";

const Join = () => {
  const [user, setUser] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const [confirmPw, setConfirmPw] = useState("");

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/signIn");
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const JoinHandler = async (event) => {
    event.preventDefault();
    if (!user.nickname) {
      alert("닉네임을 입력해주세요 !");
      return;
    }
    if (10 < user.nickname.length) {
      alert("닉네임은 10글자 이내로 입력해주세요.");
      return;
    }
    if (!user.id) {
      alert("아이디를 입력해주세요 !");
      return;
    }
    if (user.id.length < 4 || 10 < user.id.length) {
      alert("아이디는 4글자 이상 10글자 이내로 입력해주세요.");
      return;
    }
    if (!user.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (user.password.length < 4 || 15 < user.password.length) {
      alert("비밀번호는 4글자 이상 15글자 이내로 입력해주세요.");
      return;
    }
    if (user.password !== confirmPw) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    const response = await signUp(user);
    if (response.success) {
      alert(response.message);
      navigate("/signIn");
    }

    setUser({ id: "", password: "", nickname: "" });
    setConfirmPw("");
  };

  return (
    <JoinContainer>
      <JoinTitle>Join Us 🎉</JoinTitle>
      <RegisterContainer onSubmit={JoinHandler}>
        <Inputs
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={user.nickname}
          name="nickname"
          onChange={onChangeHandler}
        />
        <Inputs
          type="text"
          placeholder="아이디를 입력해주세요."
          value={user.id}
          name="id"
          onChange={onChangeHandler}
        />
        <Inputs
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={user.password}
          name="password"
          onChange={onChangeHandler}
        />
        <Inputs
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요."
          value={confirmPw}
          onChange={(e) => {
            setConfirmPw(e.target.value);
          }}
        />
        <JoinButton type="submit">회원 가입하기</JoinButton>

        <PageBtnBox>
          <PageBtn
            type="button"
            onClick={navigateHandler}
          >{`로그인 >`}</PageBtn>
        </PageBtnBox>
      </RegisterContainer>
    </JoinContainer>
  );
};

export default Join;

const JoinContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f7f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const JoinTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #202632;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 40px;
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
