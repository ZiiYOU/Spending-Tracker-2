import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { SpendingContext } from "../context/spendingListContext";
import { MonthContext } from "../context/selectedMonthContext";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const InputContainer = ({ listId }) => {
  const { list, setList } = useContext(SpendingContext);
  const [date, setDate] = useState(0);
  const [item, setItem] = useState("🎂 식비");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const { selectedMonth, setSelectedMonth } = useContext(MonthContext);
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (listId) {
      const ModifyList = list.filter((li) => li.id === listId.listId);
      console.log(ModifyList);
      setDate(ModifyList[0].date);
      setItem(ModifyList[0].item);
      setDescription(ModifyList[0].description);
      setPrice(ModifyList[0].price);
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
      id: uuid(),
      date: date,
      item: item,
      description: description,
      price: price,
      createdBy: userInfo.nickname,
      userId: userInfo.userId,
    };

    setList((prev) => [...prev, spendingObj]);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/spending",
        spendingObj
      );
      alert("성공..");
      console.log(data);
    } catch (error) {
      console.log("error =>", error);
    }

    setSelectedMonth(Number(date.split("-")[1]));
    localStorage.setItem("selected month", Number(date.split("-")[1]));
    navigate("/");
  };

  const onModifyHandler = async (event) => {
    event.preventDefault();

    const ModifiedList = list.map((li) => {
      if (li.id.toString() === listId.listId.toString()) {
        li = {
          id: listId.listId,
          date: date,
          item: item,
          description: description,
          price: price,
          createdBy: li.nickname,
          userId: li.userId,
        };
      }
      return li;
    });

    const ModifiedObj = ModifiedList.filter(
      (obj) => obj.id.toString() === listId.listId.toString()
    );

    try {
      await axios.patch(
        `http://localhost:4000/spending/${listId.listId}`,
        ...ModifiedObj
      );
      alert("성공!");
    } catch (error) {
      console.log("error =>", error);
    }

    setSelectedMonth(Number(date.split("-")[1]));
    localStorage.setItem("selected month", Number(date.split("-")[1]));
    setList(ModifiedList);

    navigate("/");
  };

  const onDeleteHandler = async () => {
    if (confirm("이 항목을 삭제하시겠습니까 ?")) {
      const DeletedList = list.filter(
        (li) => li.id.toString() !== listId.listId.toString()
      );

      try {
        await axios.delete(`http://localhost:4000/spending/${listId.listId}`);
        alert("성공!");
      } catch (error) {
        console.log("error =>", error);
      }

      setList(DeletedList);
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
