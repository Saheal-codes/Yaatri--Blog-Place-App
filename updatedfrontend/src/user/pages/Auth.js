import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import axios from "axios";
import { Form } from "formik";
const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [file, setFile] = useState(null);

  const switchModeHandler = () => {
    setstate(false);
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      const userdata1 = {
        user_password: formState.inputs.password.value,
        user_email: formState.inputs.email.value,
      };
      try {
        const response = await axios.post(
          "http://localhost:80/login/",
          userdata1
        );
        localStorage.setItem("token", response.data.token);
        setstate(response.data.message);
        props.login(response.data.user_doc, response.data.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      const userdata = new FormData();
      console.log(formState.inputs);
      userdata.append("user_username", formState.inputs.username.value);
      userdata.append("user_name", formState.inputs.name.value);
      userdata.append("user_password", formState.inputs.password.value);
      userdata.append("user_email", formState.inputs.email.value);
      userdata.append("user_picture", file);
      try {
        const response = await axios.post(
          "http://localhost:80/register/",
          userdata
        );

        setstate(response.data.message);

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    // auth.login();
  };

  const [state, setstate] = useState(false);
  const form = (
    <form onSubmit={authSubmitHandler}>
      {!isLoginMode && (
        <Input
          element="input"
          id="username"
          type="text"
          label="Your Username"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a catchy Username."
          onInput={inputHandler}
        />
      )}
      <Input
        element="input"
        id="email"
        type="email"
        label="E-Mail"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email address."
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="password"
        type="password"
        label="Password"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid password, at least 5 characters."
        onInput={inputHandler}
      />

      {!isLoginMode && (
        <Input
          element="input"
          id="name"
          type="name"
          label="Your Name"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a Name"
          onInput={inputHandler}
        />
      )}

      {!isLoginMode && (
        <input
          id="userimage"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      )}

      <Button type="submit">{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
    </form>
  );

  return (
    <Card className="authentication">
      {isLoginMode ? <h2>Login</h2> : <h2>Signup</h2>}
      <hr />
      {state == false ? form : <div className="success">{state}</div>}

      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
