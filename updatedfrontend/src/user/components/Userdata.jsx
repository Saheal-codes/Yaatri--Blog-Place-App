import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";
import axios from "axios";

// import { useMatch } from 'reat-router-dom';

const UserData = () => {
  // const params = useMatch()
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
    return <div>Loading...</div>;
  }
  return (
    <Card className="user-data">
      <div className="user-data__avatar">
        <img
          src={"http://localhost/public/" + user.user_picture}
          alt={user.user_name}
        />
      </div>
      <div className="user-data__info">
        <h2>{user.user_name}</h2>
        <h3>{user.user_email}</h3>
        <p>{user.about}</p>
      </div>
    </Card>
  );
};
export default UserData;
