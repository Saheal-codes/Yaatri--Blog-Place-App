import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Userdata from "./user/components/Userdata";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import axios from "axios";
import NewComponent from "./user/pages/places";

const App = () => {
  const [authenticate, setauthenticate] = useState({
    authenticate: false,
    user: false,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:80/verify/", { token: token })
        .then((res) => {
          console.log(res);
          setauthenticate({ authenticate: true, user: res.data.userdoc });
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // login ? : check credentials
  }, []);

  let routes;

  const login = (user) => {
    setauthenticate({ authenticate: true, user });
  };

  const logout = () => {
    setauthenticate({ authenticate: false, user: false });
    localStorage.removeItem("token");
  };

  if (authenticate.authenticate) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/users/:userId" element={<Userdata />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/places" element={<NewComponent />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth login={login}></Auth>} />
        <Route path="/users/:userId" element={<Userdata />} />
        <Route path="*" element={<Navigate to={"/auth"} />} />
      </Routes>
    );
  }

  return (
    // <AuthContext.Provider
    // value={{ login,logout,user:authenticate.user, loginisvalid:authenticate.authenticate }}
    // >

    <Router>
      <MainNavigation
        logout={logout}
        user={authenticate.user}
        loginisvalid={authenticate.authenticate}
      />
      <main>{routes}</main>
    </Router>
    // </AuthContext.Provider>
  );
};

export default App;
