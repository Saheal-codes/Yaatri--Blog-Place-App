import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const [users, setusers] = useState([]);
  useEffect(fetchusers, []);
  function fetchusers() {
    axios
      .post("http://localhost/users", { token: localStorage.getItem("token") })
      .then((response) => {
        console.log(response);
        setusers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return <UsersList items={users} />;
};

export default Users;
