import React, { useContext, useEffect } from "react";
import { SpendingContext } from "../context/spendingListContext";
import { ListBox, IconBox, DateBox, DescriptionBox, NicknameBox } from "./List";
import useSpending from "../customHook/useSpending";

const SelectedSpending = ({ listId }) => {
  const { list, setList } = useContext(SpendingContext);

  useSpending();

  console.log(list);
  let detailedList = list.find((li) => li.id === listId.listId);

  return (
    <>
      {list.length && (
        <>
          <ListBox backgroundColor="#fff" cursor="default" fontSize="18px">
            <IconBox>{detailedList.item.split(" ")[0]}</IconBox>
            <div
              style={{
                width: "85%",
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
                  <DateBox>{detailedList.date}</DateBox>
                  <NicknameBox>✍🏻 {detailedList.createdBy}</NicknameBox>
                </div>

                <DescriptionBox>{detailedList.description}</DescriptionBox>
              </div>
              {`${Number(detailedList.price).toLocaleString()} 원`}
            </div>
          </ListBox>
        </>
      )}
    </>
  );
};

export default SelectedSpending;
