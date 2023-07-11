import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCharacter } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function CreateCharacter() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { characters } = useSelector((s) => s);

  const [inputs, setInputs] = useState({
    id: "",
    gender: "",
    image: "",
    name: "",
    origin: "",
    species: "",
    status: "",
  });

  const [errorsInputs, setErrorsInputs] = useState({
    id: "",
    gender: "",
    image: "",
    name: "",
    origin: "",
    species: "",
    status: "",
  });
  const validateInputs = (inputs) => {
    const errors = {};
    // condicionales
    return errors;
  };
  const handleChange = function (event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    const character = characters?.find((ch) => ch.id === inputs.id);
    if (character) {
      return alert(
        `Ese id ${character.id} de character ya existe y es el character ${character.name}`
      );
    }
    inputs.id = Number(inputs.id);
    dispatch(createCharacter(inputs));
    alert("Character creado");
    setInputs({
      id: "",
      gender: "",
      image: "",
      name: "",
      origin: "",
      species: "",
      status: "",
    });
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <form
        className="bg-green-200 p-8 rounded border border-gray-400 w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" htmlFor="id">
            Id:
          </label>
          <input
            id="id"
            name="id"
            value={inputs.id}
            onChange={handleChange}
            type="text"
            className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Enter Id"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-800"
            htmlFor="gender"
          >
            Gender:
          </label>
          <input
            id="gender"
            name="gender"
            value={inputs.gender}
            onChange={handleChange}
            type="text"
            className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Enter Gender"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            type="text"
            className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Enter Image"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            type="text"
            className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-800"
            htmlFor="origin"
          >
            Origin:
          </label>
          <input
            id="origin"
            name="origin"
            value={inputs.origin}
            onChange={handleChange}
            type="text"
            className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Enter Origin"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-800"
            htmlFor="species"
          >
            Species:
          </label>
          <input
            id="species"
            name="species"
            value={inputs.species}
            onChange={handleChange}
            type="text"
            className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Enter Species"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-800"
            htmlFor="status"
          >
            Status:
          </label>
          <input
            id="status"
            name="status"
            value={inputs.status}
            onChange={handleChange}
            type="text"
            className="border border-gray-400 p-2 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Enter Status"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

/*
id: number
gender
image
name
origin
species
status
*/
