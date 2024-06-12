import React, { useState } from "react";
import { Inputs, InputButton } from "../components/InputContainer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logIn } from "../api/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/join");
  };

  const [idPw, setIdPw] = useState({
    id: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setIdPw({ ...idPw, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!idPw.id) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!idPw.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    console.log(idPw);
    const response = await logIn(idPw);

    console.log(response.accessToken);
    localStorage.setItem("accessToken", response.accessToken);

    navigate("/");
  };

  return (
    <Container>
      <SignInTitle>Log In ✨ </SignInTitle>
      <SignInContainer onSubmit={onSubmitHandler}>
        <Inputs
          type="text"
          name="id"
          value={idPw.id}
          onChange={onChangeHandler}
          placeholder="아이디를 입력해주세요."
        />
        <Inputs
          type="password"
          name="password"
          value={idPw.password}
          onChange={onChangeHandler}
          placeholder="비밀번호를 입력해주세요."
        />
        <InputButton type="submit">로그인</InputButton>

        <PageBtnBox>
          <PageBtn onClick={navigateHandler}>{`회원가입 >`} </PageBtn>
        </PageBtnBox>
      </SignInContainer>
    </Container>
  );
};

export default SignIn;
export { PageBtnBox, PageBtn };

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f7f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignInTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #202632;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const SignInContainer = styled.form`
  width: 90%;
  max-width: 500px;
  height: 90%;
  max-height: 300px;
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
