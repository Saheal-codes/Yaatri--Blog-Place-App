import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";
import axios from "axios";

const UserData = () => {
  const [user, setUser] = useState(null);
  var params = useParams();
  useEffect(() => {
    axios
      .post(`http://localhost:80/users/${params.userId}`)
      .then((response) => {
        setUser(response.data.Userdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.userId]);
  if (!user) {
    return <div>If the page doesn't load, there's no user!</div>;
  }
  return (
    <Card className="user-data">
      <div className="user-data__image">
        <img
          className="image"
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
          src={"http://localhost/public/" + user.user_picture}
          alt={user.user_name}
        />
      </div>
      <div className="user-data__info" style={{ width: "100%" }}>
        <center>
          <h2>@{user.user_username}</h2>
          <h2>{user.user_name}</h2>
          <h3>{user.user_email}</h3>
          <p>{user.about}</p>
        </center>
      </div>
    </Card>
  );
};
export default UserData;
