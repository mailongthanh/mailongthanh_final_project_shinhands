import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import resetLocalStorage from "./function/resetLocalStorage";

function App() {
  const { accessToken, userId, isAdmin, username } = useSelector(
    (state) => state.auth
  );

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
    }

    if (
      localStorage.getItem("accessToken") === "" ||
      localStorage.getItem("userId") === ""
    ) {
      resetLocalStorage();
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
