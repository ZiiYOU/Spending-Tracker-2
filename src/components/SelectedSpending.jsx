import React, { useContext, useEffect } from "react";
import { ListBox, IconBox, DateBox, DescriptionBox, NicknameBox } from "./List";
import useSpending from "../customHook/useSpending";

const SelectedSpending = ({ detailedObj }) => {
  const { spending, isPending, isError } = useSpending();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error !!</div>;
  }
  console.log(spending);

  return (
    <>
      {detailedObj && (
        <>
          <ListBox backgroundColor="#fff" cursor="default" fontSize="18px">
            <IconBox>{detailedObj.item.split(" ")[0]}</IconBox>
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
                  <DateBox>{detailedObj.date}</DateBox>
                  <NicknameBox>✍🏻 {detailedObj.createdBy}</NicknameBox>
                </div>

                <DescriptionBox>{detailedObj.description}</DescriptionBox>
              </div>
              {`${Number(detailedObj.price).toLocaleString()} 원`}
            </div>
          </ListBox>
        </>
      )}
    </>
  );
};

export default SelectedSpending;
