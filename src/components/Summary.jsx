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
          <Focus>{` 💸 ${sumPrice.toLocaleString()}`} </Focus>원 입니다.
        </SummaryRight>
      </SummaryContainer>
    </>
  );
};

export default Summary;

const SummaryContainer = styled.div`
  width: 750px;
  height: 130px;
  border-radius: 30px;
  margin: 30px 0;
  box-sizing: border-box;
  padding: 0 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Focus = styled.span`
  font-size: 35px;
`;

const SummaryLeft = styled.div`
  color: #202632;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const SummaryRight = styled.div`
  color: #202632;
  font-size: 25px;
  font-weight: 700;
  margin-left: 200px;
`;
