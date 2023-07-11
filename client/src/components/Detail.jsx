import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const { charactersOrigin } = useSelector((s) => s);
  // console.log("--->", id)
  //TODO: MOUNT <-> upDate ID
  useEffect(() => {
    const char = charactersOrigin?.find((ch) => ch.id === Number(id));
    if (char) setCharacter(char);
    else window.alert("No hay personajes con ese ID");
    // return setCharacter({});
  }, [id]);
  return (
    console.log("char:", character),
    (
      <div className="flex justify-center items-center bg-gray-200 rounded-lg p-8 m-4">
        <div className="text">
          <h3 className="text-xl mb-2">Id: {id}</h3>
          <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
          <h2 className="text-2xl mb-2 font-bold">
            Status: {character.status}
          </h2>
          <p className="mb-2 font-bold">Species: {character.species}</p>
          <p className="mb-2 font-bold">Gender: {character.gender}</p>
          <p className="mb-2 font-bold">Origin: {character.origin?.name}</p>
        </div>
        <div className="img w-64 h-64 overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="rounded object-cover w-full h-full"
          />
        </div>
      </div>
    )
  );
}
