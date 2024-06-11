import React, { useContext } from "react";
import { SpendingContext } from "../context/spendingListContext";
import { ListBox, IconBox, DateBox, DescriptionBox } from "./List";

const SelectedSpending = ({ listId }) => {
  const { list, setList } = useContext(SpendingContext);

  let detailedList = list.find((li) => li.id === listId.listId);

  return (
    <>
      <ListBox backgroundColor="#fff" cursor="default" fontSize="18px">
        <IconBox>{detailedList.item.split(" ")[0]}</IconBox>
        <div>
          <DateBox>{detailedList.date}</DateBox>
          <DescriptionBox>{detailedList.description}</DescriptionBox>
        </div>
        {`${Number(detailedList.price).toLocaleString()} 원`}
      </ListBox>
    </>
  );
};

export default SelectedSpending;
