import axios from "axios";

export const getSpending = async () => {
  try {
    const response = await axios.get("http://localhost:4000/spending");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addSpending = async (spendingObj) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/spending",
      spendingObj
    );
    alert("성공..");
  } catch (error) {
    console.log("error =>", error);
  }
};

export const updateSpending = async (ModifyObj) => {
  const { id, ...rest } = ModifyObj;
  try {
    const { data } = await axios.patch(
      `http://localhost:4000/spending/${id}`,
      rest
    );
    alert("성공!");
  } catch (error) {
    console.log("error =>", error);
  }
};

export const deleteSpending = async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:4000/spending/${id}`);
    alert("성공!");
  } catch (error) {
    console.log("error =>", error);
  }
};
