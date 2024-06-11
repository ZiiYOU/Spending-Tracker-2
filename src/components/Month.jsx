import React, { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { MonthContext } from "../context/selectedMonthContext";

const Month = () => {
  const MonthList = [
    { id: 1, name: "1 월" },
    { id: 2, name: "2 월" },
    { id: 3, name: "3 월" },
    { id: 4, name: "4 월" },
    { id: 5, name: "5 월" },
    { id: 6, name: "6 월" },
    { id: 7, name: "7 월" },
    { id: 8, name: "8 월" },
    { id: 9, name: "9 월" },
    { id: 10, name: "10 월" },
    { id: 11, name: "11 월" },
    { id: 12, name: "12 월" },
  ];

  const { selectedMonth, setSelectedMonth } = useContext(MonthContext);

  const OnClickMonth = (event) => {
    setSelectedMonth(Number(event.target.id));
    localStorage.setItem("selected month", event.target.id);
  };

  useEffect(() => {
    const GetSelectedMonth = JSON.parse(localStorage.getItem("selected month"));
    if (!GetSelectedMonth) {
      setSelectedMonth(1);
      return;
    }
    setSelectedMonth(GetSelectedMonth);
  }, []);

  return (
    <>
      <MonthContainer>
        {MonthList.map((month) => {
          return (
            <MonthBox
              key={month.id}
              id={month.id}
              onClick={OnClickMonth}
              backgroundColor={selectedMonth === month.id ? "#6592d1" : "#fff"}
              color={selectedMonth === month.id ? "#fff" : "#202632"}
            >
              {month.name}
            </MonthBox>
          );
        })}
      </MonthContainer>
    </>
  );
};

export default Month;

const MonthContainer = styled.div`
  width: 750px;
  height: 250px;
  background-color: #fff;
  border-radius: 50px;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 40px 40px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const MonthBox = styled.div`
  width: 95px;
  height: 60px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #6592d1;
  border-radius: 20px;
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    background: #6592d1;
    color: white;
    transition: 0.5s;
  }
`;
