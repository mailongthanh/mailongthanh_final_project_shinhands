import { Requests } from "./ultis/request";

// const BASE_URL = "http://localhost:8000/v1/user/";

const { get } = Requests();
export const getListUser = async () => {
  return get("/user");
};

const { del } = Requests();
export const deleteUser = async (id) => {
  const url = `/user/${id}/delete`;
  return del(url);
};

const { put } = Requests();
export const updateUser = async (id, data) => {
  const url = `/user/${id}/update`;
  return put(url, data);
};

// deleteUser(userID) {
//   return axios.delete(`${BASE_URL}${userID}/delete`, { headers });
// }

// updateUser(userID, newData) {
//   return axios.put(`${BASE_URL}${userID}/update`, newData, { headers });
// }
