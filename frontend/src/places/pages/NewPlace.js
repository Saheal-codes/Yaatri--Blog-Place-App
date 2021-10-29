import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
// import {
//   VALIDATOR_REQUIRE,
//   VALIDATOR_MINLENGTH
// } from '../../shared/util/validators';
// import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const NewPlace = () => {
  const [state, setstate] = useState({
    "name": "",
    "place": "",
    "location": ""
  })
  const handlechange = (e) => {
    e.persist()
    setstate((prevstate) => {
      return { ...prevstate, [e.target.id]: e.target.value }
    })
  }
  // const [formState, inputHandler] = useForm(
  //   {
  //     title: {
  //       value: '',
  //       isValid: false
  //     },
  //     description: {
  //       value: '',
  //       isValid: false
  //     },
  //     address: {
  //       value: '',
  //       isValid: false
  //     }
  //   },
  //   false
  // );

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(state); // send this to the backend!
  };


  return (
    <form onSubmit={placeSubmitHandler}>
      <div
        className={`place-form`}>
        <label>Name</label>
        <input
          id="name"
          value={state["name"]}
          onChange={handlechange}
          placeholder="Add the Name of your place"
          label="Name"
        />
        <label>Place</label>
        <input
          id="place"
          value={state["place"]}
          onChange={handlechange}
          placeholder="Add additional information about your place"
        />
        <label>Location</label>
        <input
          id="location"
          value={state["location"]}
          onChange={handlechange}
          placeholder="Add the Location of your Place"
        />
          <Button type="submit" disabled={!Object.keys(state).every((key) => (state[key] != ""))}>
          ADD PLACE
        </Button>
        </div>
    </form>
  );
};


export default NewPlace;
