import { Requests } from "./ultis/request";

const { post } = Requests();
export const createAccount = async (user) => {
  const url = "/auth/register";
  return post(url, user);
};

export const loginAccount = async (user) => {
  const url = "/auth/login";
  return post(url, user);
};

export const logoutAccount = async (user) => {
  const url = "/auth/logout";
  return post(url, user);
};
