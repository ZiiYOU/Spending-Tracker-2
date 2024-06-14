import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MonthContext } from "../context/selectedMonthContext";
import { AuthContext } from "../context/authContext";
import {
  addSpending,
  updateSpending,
  deleteSpending,
} from "../api/spending.js";
import useSpending from "../customHook/useSpending.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../customHook/useAuth.jsx";

const InputContainer = ({ listId, detailedObj }) => {
  const [date, setDate] = useState(0);
  const [item, setItem] = useState("🎂 식비");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const { selectedMonth, setSelectedMonth } = useContext(MonthContext);
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useAuth();

  const { spending, isPending, isError } = useSpending();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error !!</div>;
  }

  const mutationAdd = useMutation({
    mutationFn: addSpending,
    onSuccess: () => {
      queryClient.invalidateQueries(["spending"]);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateSpending,
    onSuccess: () => {
      queryClient.invalidateQueries(["spending"]);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteSpending,
    onSuccess: () => {
      queryClient.invalidateQueries(["spending"]);
    },
  });

  useEffect(() => {
    if (listId) {
      console.log(detailedObj);
      setDate(detailedObj.date);
      setItem(detailedObj.item);
      setDescription(detailedObj.description);
      setPrice(detailedObj.price);
    }
  }, []);

  const onAddHandler = async (event) => {
    event.preventDefault();

    if (!date) {
      alert("지출한 날짜를 입력해주세요!");
      return;
    }
    if (!description.trim()) {
      alert("지출한 내용에 대해 입력해주세요!");
      return;
    }
    if (!price) {
      alert("지출한 금액을 입력해주세요!");
      return;
    }

    const spendingObj = {
      date: date,
      item: item,
      description: description,
      price: price,
      createdBy: userInfo.nickname,
      userId: userInfo.userId,
    };

    mutationAdd.mutate(spendingObj);

    setSelectedMonth(Number(date.split("-")[1]));
    localStorage.setItem("selected month", Number(date.split("-")[1]));
    navigate("/");
  };

  const onModifyHandler = async (event) => {
    event.preventDefault();

    const ModifyObj = {
      ...detailedObj,
      date: date,
      item: item,
      description: description,
      price: price,
    };

    mutationUpdate.mutate(ModifyObj);

    setSelectedMonth(Number(date.split("-")[1]));
    localStorage.setItem("selected month", Number(date.split("-")[1]));

    navigate("/");
  };

  const onDeleteHandler = async () => {
    if (confirm("이 항목을 삭제하시겠습니까 ?")) {
      mutationDelete.mutate(listId);
      navigate("/");
    }
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <RegisterContainer onSubmit={listId ? onModifyHandler : onAddHandler}>
        <Inputs
          type="date"
          onChange={(event) => {
            setDate(event.target.value);
          }}
          value={date}
        ></Inputs>
        <ItemSelect
          onChange={(event) => {
            setItem(event.target.value);
          }}
          value={item}
        >
          <option>🎂 식비</option>
          <option>✈️ 여행 경비</option>
          <option>🛍️ 쇼핑</option>
          <option>🎁 친구 선물</option>
          <option>✨ 기타</option>
        </ItemSelect>
        <Inputs
          type="text"
          placeholder="내용"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          value={description}
        ></Inputs>
        <Inputs
          type="number"
          placeholder="지출 금액"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          value={price}
        ></Inputs>
        <ButtonContainer>
          <InputButton type="submit">{listId ? "수정" : "등록"}</InputButton>
          <InputButton
            type="button"
            onClick={onDeleteHandler}
            style={{ display: listId ? "" : "none" }}
          >
            삭제
          </InputButton>
          <InputButton type="button" onClick={goBackHandler}>
            뒤로가기
          </InputButton>
        </ButtonContainer>
      </RegisterContainer>
    </>
  );
};

export default InputContainer;
export { RegisterContainer, Inputs, ButtonContainer, InputButton };

const RegisterContainer = styled.form`
  width: 90%;
  max-width: 500px;
  min-width: 350px;
  height: 400px;
  border-radius: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  padding-top: 20px;
`;

const Inputs = styled.input`
  width: 90%;
  max-width: 300px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid #6592d1;
  margin: 10px 0;
  padding: 0 10px;
  box-sizing: border-box;
`;

const ItemSelect = styled.select`
  width: 90%;
  max-width: 300px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid #6592d1;
  margin: 10px 0;
  padding: 0 10px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5%;
`;

const InputButton = styled.button`
  width: 100px;
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
