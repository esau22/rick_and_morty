import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//import style from "../styles/Login.module.css";

const regExEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/;

export default function Login({ login }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [inputsErrors, setInputsErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validate = (inputs) => {
    const errors = {};
    if (!inputs.email) errors.email = "Email is null";
    if (inputs.email.length < 6) errors.email = "Email contain 6 characters";

    if (!regExEmail.test(inputs.email)) errors.email = "Email Will be Email";
    if (!regexPassword.test(inputs.password)) errors.password = "Password ... ";
    if (inputs.password.length < 6)
      errors.password = "Password must contain 6 characters";
    if (!inputs.password) errors.password = "Password is null";
    return errors;
  };
  //! el set es ASYNC
  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
      // email: dede
    });
    setInputsErrors(
      validate({
        ...inputs,
        [event.target.name]: event.target.value,
      })
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let aux = Object.keys(inputsErrors);
    // console.log("::::aux::", inputsErrors)
    if (aux.length === 0) {
      //TODO: tomá los inputs envialos a POST

      setInputsErrors({
        email: "",
        password: "",
      });
      login(inputs);
      setInputs({
        email: "",
        password: "",
      });

      navigate("/home");
    } else {
      return alert("Error");
    }
  };
  return (
    console.log("--> ", inputs, inputsErrors),
    (
      <div className="flex items-center justify-center h-screen">
        <form
          className="bg-green-200 p-8 rounded border border-gray-400"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl mb-4">Rick & Morty</h1>
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-bold">Email:</label>
            <input
              type="text"
              key="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500"
            />
            {inputsErrors?.email && (
              <span className="text-red-500">{inputsErrors.email}</span>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-bold">Password:</label>
            <input
              type="password"
              key="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500"
            />
            {inputsErrors?.password && (
              <span className="text-red-500">{inputsErrors.password}</span>
            )}
          </div>
          {Object.keys(inputsErrors).length === 0 ? (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ingresar
            </button>
          ) : null}
          <Link to="/home">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Ingresar
            </button>
          </Link>
        </form>
      </div>
    )
  );
}
