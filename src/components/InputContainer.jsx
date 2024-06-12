import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { SpendingContext } from "../context/spendingListContext";
import { MonthContext } from "../context/selectedMonthContext";

const InputContainer = ({ listId }) => {
  const { list, setList } = useContext(SpendingContext);
  const [date, setDate] = useState(0);
  const [item, setItem] = useState("🎂 식비");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const { selectedMonth, setSelectedMonth } = useContext(MonthContext);
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

  const AddList = () => {
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

    setList((prev) => [
      ...prev,
      {
        id: uuid(),
        date: date,
        item: item,
        description: description,
        price: price,
      },
    ]);

    const spendingList = [
      ...list,
      {
        id: uuid(),
        date: date,
        item: item,
        description: description,
        price: price,
      },
    ];
    setLocalStorage(spendingList);
    setSelectedMonth(Number(date.split("-")[1]));
    localStorage.setItem("selected month", Number(dateVal.split("-")[1]));
    navigate("/");
  };

  const setLocalStorage = (spending) => {
    localStorage.setItem("spending list", JSON.stringify(spending));
  };

  const ModifyButton = () => {
    const ModifiedList = list.map((li) => {
      if (li.id.toString() === listId.listId.toString()) {
        li = {
          id: listId.listId,
          date: date,
          item: item,
          description: description,
          price: price,
        };
      }
      return li;
    });

    setSelectedMonth(Number(date.split("-")[1]));
    localStorage.setItem("selected month", Number(date.split("-")[1]));
    setList(ModifiedList);
    localStorage.setItem("spending list", JSON.stringify(ModifiedList));

    navigate("/");
  };

  const DeleteButton = () => {
    if (confirm("이 항목을 삭제하시겠습니까 ?")) {
      const DeletedList = list.filter(
        (li) => li.id.toString() !== listId.listId.toString()
      );

      setList(DeletedList);
      localStorage.setItem("spending list", JSON.stringify(DeletedList));
      navigate("/");
    }
  };

  const GoBackButton = () => {
    navigate(-1);
  };

  return (
    <>
      <RegisterContainer onSubmit={listId ? ModifyButton : AddList}>
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
          <InputButton type="submit" onClick={listId ? ModifyButton : AddList}>
            {listId ? "수정" : "등록"}
          </InputButton>
          <InputButton
            type="button"
            onClick={DeleteButton}
            style={{ display: listId ? "" : "none" }}
          >
            삭제
          </InputButton>
          <InputButton type="button" onClick={GoBackButton}>
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
