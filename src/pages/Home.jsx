import React, { useEffect } from "react";
import styled from "styled-components";
import Month from "../components/Month";
import Summary from "../components/Summary";
import List from "../components/List";
import Addition from "../components/Addition";
import { useContext } from "react";
import { SpendingContext } from "../context/spendingListContext";
import { MonthContext } from "../context/selectedMonthContext";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  height: auto;
`;

const Inner = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoStyle = styled.div`
  width: 150px;
  color: #202632;
  font-size: 38px;
  font-weight: 700;
  margin-top: 70px;
  margin-left: 20vw;
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  background-color: #f5f7f8;
  @media screen and (max-width: 1080px) {
    margin-left: 10vw;
  }
`;

const Home = () => {
  const { list, setList } = useContext(SpendingContext);
  const { selectedMonth, setSelectedMonth } = useContext(MonthContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("signIn");
    }
  }, []);

  let filteredList = [];
  if (list.length !== 0) {
    filteredList = list.filter(
      (li) => Number(selectedMonth) === Number(li.date.split("-")[1])
    );
  }

  return (
    <Container>
      <LogoStyle>Spending Tracker.</LogoStyle>
      <Inner>
        <Month />
        <Summary filteredList={filteredList} />
        <List filteredList={filteredList} />
      </Inner>
      <Addition />
    </Container>
  );
};

export default Home;
