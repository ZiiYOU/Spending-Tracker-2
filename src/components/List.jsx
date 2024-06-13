import React from "react";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SpendingContext } from "../context/spendingListContext";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import useSpending from "../customHook/useSpending";

const List = ({ filteredList }) => {
  const { list, setList } = useContext(SpendingContext);
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useSpending();

  const GotoDetailedPage = (id, userId) => {
    if (userId === userInfo.userId) {
      navigate(`detailed/${id}`);
    }
  };

  return (
    <>
      <ListContainer>
        <ListInner>
          {filteredList.map((li) => {
            return (
              <ListBox
                key={li.id}
                onClick={() => GotoDetailedPage(li.id, li.userId)}
                backgroundColor="#f5f7f8"
                cursor="pointer"
                fontSize="20px"
              >
                <IconBox>{li.item.split(" ")[0]}</IconBox>
                <div
                  style={{
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        position: "absolute",
                        top: "10px",
                      }}
                    >
                      <DateBox>{li.date}</DateBox>
                      <NicknameBox>✍🏻 {li.createdBy}</NicknameBox>
                    </div>
                    <DescriptionBox>{li.description}</DescriptionBox>
                  </div>
                  {`${Number(li.price).toLocaleString()} 원`}
                </div>
              </ListBox>
            );
          })}
        </ListInner>
      </ListContainer>
    </>
  );
};

export default List;
export { ListBox, IconBox, DateBox, DescriptionBox, NicknameBox };

const ListContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 750px;
  height: 500px;
  background-color: #fff;
  border-radius: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 40px 0;
  margin-bottom: 50px;
`;

const ListInner = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
`;

const ListBox = styled.div`
  width: 90%;
  max-width: 650px;
  min-width: 300px;
  height: 80px;
  min-height: 80px;
  max-height: 100px;
  position: relative;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;
  padding: 0 20px;
  box-shadow: 5px 5px 10px gray;
  margin-bottom: 15px;
  color: #202632;
  font-size: 18px;
  font-weight: 600;
  cursor: ${(props) => props.cursor};
  overflow-x: hidden;
  &:hover {
    font-size: ${(props) => props.fontSize};
    transition: 0.5s;
  }
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-left: 10px;
`;

const DateBox = styled.div`
  font-size: 14px;
  color: #aaa;
  padding-right: 5px;
  display: flex;
  align-items: center;
`;

const NicknameBox = styled.div`
  font-size: 14px;
  color: #aaa;
  padding-left: 10px;
  border-left: 1.5px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionBox = styled.div`
  width: 100%;
  max-height: 410px;
  overflow-y: hidden;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  margin-right: 10px;
`;
