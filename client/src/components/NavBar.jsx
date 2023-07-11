import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCharacters } from "../redux/actions";

export default function NavBar({ onSearch, logout }) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-evenly items-center bg-blue-300 border border-gray-300 rounded p-2 m-4 font-bold">
      <button
        onClick={logout}
        className="border-gray-300 text-black px-4 py-2 rounded"
      >
        LogOut
      </button>

      {/* <Link to={"/"}>
        <div>LogOut</div>
      </Link> */}

      <Link
        to="/home"
        className="link"
        onClick={() => dispatch(resetCharacters())}
      >
        Home
      </Link>

      <Link to="/about" className="link">
        About
      </Link>

      <Link to="/favorites" className="link">
        Favorites
      </Link>

      <Link to="/create" className="link">
        Create
      </Link>

      <SearchBar onSearch={onSearch} />
    </div>
  );
}
