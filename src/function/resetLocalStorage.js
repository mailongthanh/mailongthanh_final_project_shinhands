export default function resetLocalStorage() {
  localStorage.removeItem("userId");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("username");
}
