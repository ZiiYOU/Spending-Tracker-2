import React from "react";
import styled from "styled-components";
import Month from "../components/Month";
import Summary from "../components/Summary";
import List from "../components/List";
import Addition from "../components/Addition";
import { useContext } from "react";
import { SpendingContext } from "../context/spendingListContext";
import { MonthContext } from "../context/selectedMonthContext";

const Sticky = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Inner = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Home = () => {
  const { list, setList } = useContext(SpendingContext);
  const { selectedMonth, setSelectedMonth } = useContext(MonthContext);

  let filteredList = [];
  if (list.length !== 0) {
    filteredList = list.filter(
      (li) => Number(selectedMonth) === Number(li.date.split("-")[1])
    );
  }

  return (
    <Sticky>
      <Inner>
        <Month />
        <Summary filteredList={filteredList} />
        <List filteredList={filteredList} />
      </Inner>
      <Addition />
    </Sticky>
  );
};

export default Home;
