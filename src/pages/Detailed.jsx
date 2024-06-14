import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SelectedSpending from "../components/SelectedSpending";
import InputContainer from "../components/InputContainer";
import useSpending from "../customHook/useSpending";

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

  const { spending, isPending, isError } = useSpending();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error !!</div>;
  }

  let detailedObj = spending.find((obj) => obj.id === listId.listId);

  return (
    <>
      <SpendingBox>
        <SelectedSpending detailedObj={detailedObj} />
        <InputContainer listId={listId.listId} detailedObj={detailedObj} />
      </SpendingBox>
    </>
  );
};

export default Detailed;
