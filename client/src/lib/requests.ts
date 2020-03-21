import { GET, POST, API_PATH, COOKIE_TOKEN } from "../constants";
import { setCookie, getCookie } from "./cookie";
const axios = require("axios");

const addAuthHeaders = (
  url: string,
  type = GET,
  credentials = getCookie(COOKIE_TOKEN)
) => {
  const request = {
    method: type,
    url: url,
    headers: {
      Authorization: `Bearer ${credentials}`
    }
  };
  return request;
};

export const diagnostic = async () => {
  const res = await axios(addAuthHeaders(`${API_PATH}/diagnostic`, GET));
  return res.data;
};

export const searchTimezones = async (searchString: string) => {
  const res = await axios(
    addAuthHeaders(
      `${API_PATH}/searchTimezones?searchString=${searchString}`,
      POST
    )
  );
  return res.data;
};

export const authenticate = async (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);
  try {
    const res = await axios({
      method: POST,
      url: `${API_PATH}/login`,
      headers: {
        Authorization: `Basic ${token}`
      }
    });
    if (COOKIE_TOKEN) {
      setCookie(COOKIE_TOKEN, res.data.jwt, 7);
    }
    return res.data;
  } catch (e) {
    return false;
  }
};
