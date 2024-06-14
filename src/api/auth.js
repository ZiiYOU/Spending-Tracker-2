import axios from "axios";

const Auth_Api = "https://moneyfulpublicpolicy.co.kr";
const Token = localStorage.getItem("accessToken");

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

export const getUser = async () => {
  try {
    const { data } = await axios.get(`${Auth_Api}/user`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const updateUser = async (newUser) => {
  try {
    const { data } = await axios.patch(`${Auth_Api}/profile`, newUser, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    });
    console.log(data);
    alert(data.message);
    return data;
  } catch (error) {
    alert(error.response.data.message);
  }
};
