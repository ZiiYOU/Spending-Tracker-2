import axios from "axios";

const Auth_Api = "https://moneyfulpublicpolicy.co.kr";

export const signUp = async (info) => {
  try {
    const { data } = await axios.post(`${Auth_Api}/register`, info);
    return data;
  } catch (error) {
    console.log("error =>", error);
    alert(error.response.data.message);
  }
};

export const logIn = async (info) => {
  try {
    const { data } = await axios.post(`${Auth_Api}/login`, info);
    localStorage.setItem("accessToken", data.accessToken);
    console.log(data);
    return data;
  } catch (error) {
    console.log("error =>", error);
    alert(error.response.data.message);
  }
};

export const logOut = () => {
  localStorage.removeItem("accessToken");
};
