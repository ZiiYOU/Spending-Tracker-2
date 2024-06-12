import React from "react";
import InputContainer from "../components/InputContainer";
import styled from "styled-components";

const Create = () => {
  return (
    <>
      <Container>
        <InputContainer />
      </Container>
    </>
  );
};

export default Create;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f7f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
