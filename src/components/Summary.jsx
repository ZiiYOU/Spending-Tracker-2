import React, { useContext } from "react";
import styled from "styled-components";
import { MonthContext } from "../context/selectedMonthContext";

const Summary = ({ filteredList }) => {
  const { selectedMonth, setSelectedMonth } = useContext(MonthContext);
  let sumPrice = 0;
  filteredList.map((fl) => {
    sumPrice += Number(fl.price);
  });
  return (
    <>
      <SummaryContainer>
        <SummaryLeft>
          <Focus>{`" ${selectedMonth} 월 "`}</Focus> 한 달 동안 지출한
        </SummaryLeft>
        <SummaryRight>
          총 금액은
          <Focus>{` 💸 ${sumPrice.toLocaleString()}`} </Focus> 원 입니다.
        </SummaryRight>
      </SummaryContainer>
    </>
  );
};

export default Summary;

const SummaryContainer = styled.div`
  width: 99%;
  min-width: 350px;
  max-width: 750px;
  height: 130px;
  border-radius: 30px;
  margin: 30px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  @media screen and (max-width: 450px) {
    padding: 0;
  }
`;

const Focus = styled.span`
  font-size: 35px;
  padding: 0 3%;
`;

const SummaryLeft = styled.div`
  color: #202632;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 20px;
  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;

const SummaryRight = styled.div`
  color: #202632;
  font-size: 25px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;
