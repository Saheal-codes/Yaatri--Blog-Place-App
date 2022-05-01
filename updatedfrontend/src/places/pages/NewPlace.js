import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css";
import axios from "axios";
import { validate } from "../../helper";

const NewPlace = (props) => {
  let schema = yup.object().shape({
    name: yup.string().required(),
    place: yup.string().required(),
    location: yup.string().required(),
    address: yup.string().required(),
  });

  const [file, setfile] = useState(null);

  const placeSubmitHandler = (value, { isValid }) => {
    // if (!isValid){
    //   return
    // }
    console.log(value);
    var newplacedata = new FormData();
    newplacedata.append("place_name", value.name);
    newplacedata.append("location_name", value.location);
    newplacedata.append("location_address", value.place);
    newplacedata.append("image", file);
    newplacedata.append("token", localStorage.getItem("token"));
    axios
      .post("http://localhost/addnewplace", newplacedata)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    // send this to the backend!
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      place: "",
      location: "",
    },
    validate: () => {
      validate(schema);
    },

    onSubmit: placeSubmitHandler,
  });

  const imagehandler = (e) => {
    e.persist();
    var files = e.target.files;
    if (files.length) {
      setfile(files[0]);
    } else {
      setfile(null);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={`place-form`}>
        <label className={`label`}>Name</label>
        <input
          name="name"
          placeholder="Add the Name of your place"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <label className={`label`}>Place</label>
        <input
          name="place"
          value={formik.values.place}
          onChange={formik.handleChange}
          placeholder="Add additional information about your place"
        />
        <label className={`label`}>Location</label>
        <input
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          placeholder="Add the Location of your Place"
        />
        <label className={`label`}>Image</label>
        <input
          type="file"
          name="image"
          onChange={imagehandler}
          placeholder="Add the Location of your Place"
        />
        <Button type="submit" disabled={!formik.isValid}>
          ADD PLACE
        </Button>
      </div>
    </form>
  );
};

export default NewPlace;
