import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/SignUp";
import NotFound from "../pages/user/NotFound";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/home/*", component: Home },
  { path: "/signup", component: SignUp },
  { path: "*", component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
