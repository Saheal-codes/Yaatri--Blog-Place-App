import React, { useState, useEffect } from "react";
import axios from "axios";

import PlaceList from "../components/PlaceList";

function UserPlaces() {
  const [loading, setloading] = useState(true);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost/userplaces", {
        token: localStorage.getItem("token"),
      })
      .then((response) => {
        setPlaces(response.data);
        setloading(false);
      })
      .catch((err) => {
        console.error(err);
        setloading(false);
      });
  }, []);

  const deleteuserplace = (place_id) => {
    axios
      .delete("http://localhost/deleteplace/" + place_id)
      .then((res) => {
        console.log(res);
        setPlaces(
          places.filter((item) => {
            if (item._id != place_id) {
              return item;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }
  return <PlaceList items={places} removeplaces={deleteuserplace} />;
}

export default UserPlaces;
