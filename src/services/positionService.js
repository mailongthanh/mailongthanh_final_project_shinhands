import { Requests } from "./ultis/request";

const { get } = Requests();
export const getListPosition = async () => {
  return get("/position");
};

// const { post } = Requests();
// export const createPosition = async (position) => {
//   const url = "/position/add";
//   return post(url, position);
// };

// const { del } = Requests();
// export const deletePosition = async (id) => {
//   const url = `/position/${id}/delete`;
//   return del(url);
// };
