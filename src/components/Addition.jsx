import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Addition = () => {
  const navigate = useNavigate();
  const GotoCreatePage = () => {
    navigate("create");
  };
  return <AdditionButton onClick={GotoCreatePage}>✎</AdditionButton>;
};

export default Addition;

const AdditionButton = styled.button`
  position: sticky;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  font-size: 30px;
  margin-bottom: 30px;
  bottom: 60px;
  background-color: #6592d1;
  border: none;
  color: #fff;
  bottom: 50px;
  right: 80px;
  box-shadow: 0 0 10px gray;
  float: right;
  cursor: pointer;
  &:hover {
    width: 70px;
    height: 70px;
    transition: 0.5s;
  }
`;
