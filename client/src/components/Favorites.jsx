import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Card from "./Card";

import { filterGender, reset, filterAtoZ } from "../redux/actions";

export default function Favorites({ onClose }) {
  const { myFavorites } = useSelector((s) => s);
  const dispatch = useDispatch();
  /*
Male, Female, Genderless y unknown.
*/
  const handleGender = (event) => {
    const { value } = event.target;
    dispatch(filterGender(value));
  };

  const handleAtoZ = (event) => {
    const { value } = event.target;
    dispatch(filterAtoZ(value));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 bg-blue-200 rounded p-4 mb-4 mr-4">
          <h3 className="text-lg font-semibold mb-2">Filter Options:</h3>
          <div className="mb-4">
            <label className="block mb-1">Select Gender:</label>
            <select
              name="gender"
              onChange={handleGender}
              defaultValue={"DEFAULT"}
              className="border border-gray-400 p-2 w-full focus:outline-none bg-blue-100 rounded"
            >
              <option value="DEFAULT" disabled>
                Select Gender:
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">unknown</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Select Order:</label>
            <select
              name="order"
              onChange={handleAtoZ}
              defaultValue={"DEFAULT"}
              className="border border-gray-400 p-2 w-full focus:outline-none bg-blue-100 rounded"
            >
              <option value="DEFAULT" disabled>
                Select Order:
              </option>
              <option value="A">Ascendente</option>
              <option value="D">Descendente</option>
            </select>
          </div>
          <button
            onClick={() => dispatch(reset())}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {myFavorites?.map((char, index) => (
            <Card key={char.id} char={char} onClose={onClose} inFav={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

// function mapState(state) {
//   return {
//     myFavorites: state.myFavorites,
//   };
// }

// export default connect(mapState)(Favorites);
