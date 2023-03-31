import { Requests } from "./ultis/request";

const { get } = Requests();
export const getListEmployee = async () => {
  return get("/employee");
};

export const getEmployeeByDepartment = async (id) => {
  const url = `/employee/${id}/getByDepartment`;
  return get(url);
};

const { post } = Requests();
export const createEmployee = async (employee) => {
  const url = "/employee/add";
  return post(url, employee);
};

const { del } = Requests();
export const deleteEmployee = async (id) => {
  const url = `/employee/${id}/delete`;
  return del(url);
};

const { put } = Requests();
export const updateEmployee = async (id, data) => {
  const url = `/employee/${id}/update`;
  return put(url, data);
};
