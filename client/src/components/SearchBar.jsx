import { useState } from "react";
//import style from "../styles/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { resetPage, addChar } from "../redux/actions";
import axios from "axios";

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  //  <input type="search" onChange={handleChange}/>
  const handleChange = (event) => {
    //console.log("event ---> ", event.target.value)
    setId(event.target.value);
    //  setId((idOld) => idOld + 1);
    //  setId(id + 1);
  };
  const add = () => {
    onSearch(id);
    dispatch(resetPage());
    setId("");
  };
  const randomChar = () => {
    const numRan = Math.floor(Math.random() * 825) + 1;
    axios(`http://localhost:5020/rickandmorty/character/${numRan}`).then(
      // axios("http://localhost:1222/")
      ({ data }) => {
        if (data.name) {
          dispatch(addChar(data));
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      }
    );
  };

  return (
    // console.log("id--->", id),
    <div className="flex items-center my-4">
      <label className="font-bold text-lg mr-2">Insert ID: </label>
      <input
        type="search"
        onChange={handleChange}
        value={id}
        name="id"
        placeholder="insert id ..."
        className="border border-gray-400 px-2 py-1 rounded mr-2"
      />
      <button
        onClick={add}
        className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500"
      >
        Search
      </button>
      <button
        onClick={randomChar}
        className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        Random Character
      </button>
    </div>
  );
}
