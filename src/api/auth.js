import axios from "axios";

const Auth_Api = "https://moneyfulpublicpolicy.co.kr";

const signUp = async (info) => {
  try {
    const { data } = await axios.post(`${Auth_Api}/register`, info);
    return data;
  } catch (error) {
    console.log("error =>", error);
    alert(error.response.data.message);
  }
};

const logIn = async (info) => {
  try {
    const { data } = await axios.post(`${Auth_Api}/login`, info);
    return data;
  } catch (error) {
    console.log("error =>", error);
    alert(error.response.data.message);
  }
};

export { signUp, logIn };
