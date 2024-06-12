import React from "react";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SpendingContext } from "../context/spendingListContext";

const List = ({ filteredList }) => {
  const { list, setList } = useContext(SpendingContext);
  const navigate = useNavigate();

  const GotoDetailedPage = (id) => {
    navigate(`detailed/${id}`);
  };

  const GetSpendingList = () => {
    const getSpendingList = JSON.parse(localStorage.getItem("spending list"));
    if (getSpendingList) {
      setList(getSpendingList);
    }
  };

  useEffect(() => {
    GetSpendingList();
  }, []);

  return (
    <>
      <ListContainer>
        <ListInner>
          {filteredList.map((li) => {
            return (
              <ListBox
                key={li.id}
                onClick={() => GotoDetailedPage(li.id)}
                backgroundColor="#f5f7f8"
                cursor="pointer"
                fontSize="20px"
              >
                <IconBox>{li.item.split(" ")[0]}</IconBox>
                <div
                  style={{
                    width: "85%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexShrink: 0.8,
                    }}
                  >
                    <DateBox>{li.date}</DateBox>
                    <DescriptionBox>{li.description}</DescriptionBox>
                  </div>

                  <div
                    style={{ whiteSpace: "nowrap", flexShrink: 1 }}
                  >{`${Number(li.price).toLocaleString()} 원`}</div>
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
export { ListBox, IconBox, DateBox, DescriptionBox };

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
  background-color: ${(props) => props.backgroundColor};
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
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
  font-size: 20px;
  margin-left: 10px;
`;

const DateBox = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 8px;
  flex-shrink: 1;
`;

const DescriptionBox = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-height: 410px;
  padding: 2px 0;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  margin-right: 10px;
  flex-shrink: 0.8;
`;
