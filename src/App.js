import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const { accessToken, userId, isAdmin, username } = useSelector(
    (state) => state.auth
  );

  const [token, setToken] = useState();

  useEffect(() => {
    if (
      !localStorage.getItem("accessToken") ||
      !localStorage.getItem("userId")
    ) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);

      if (isAdmin) {
        localStorage.setItem("isAdmin", "admin");
      } else localStorage.setItem("isAdmin", "user");

      setToken(localStorage.getItem("accessToken"));
    }

    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, [accessToken, userId]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route key={index} path={route.path} element={<Page />}></Route>
            );
          })}

          {token &&
            privateRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route key={index} path={route.path} element={<Page />}></Route>
              );
            })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
