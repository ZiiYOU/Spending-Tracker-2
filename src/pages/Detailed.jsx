import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SelectedSpending from "../components/SelectedSpending";
import InputContainer from "../components/InputContainer";

const SpendingBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Detailed = () => {
  const listId = useParams();
  return (
    <>
      <SpendingBox>
        <SelectedSpending listId={listId} />
        <InputContainer listId={listId} />
      </SpendingBox>
    </>
  );
};

export default Detailed;
