import { useEffect } from "react";
//import style from "../styles/Card.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import { connect } from "react-redux";
import { addFav, removeFav } from "../redux/actions";

function Card({ char, onClose, myFavorites, removeFav, addFav, inFav }) {
  // obj
  const [isFav, setIsFav] = useState(false);
  console.log(":::::::", myFavorites);
  const { id, name, gender, species, origin, image, status } = char;
  const handleFavorite = function () {
    if (isFav) {
      setIsFav(false);
      // despachar remove
      removeFav(id);
    } else {
      setIsFav(true);
      // despachar addFav
      addFav(char);
    }
  };
  /*
  handleFavorite. Esta función estará dividida en dos partes:
  Si el estado isFav es true, entonces settea ese estado en false, 
  y despacha la función removeFav que recibiste por props pasándole 
  el id del personaje como argumento.
  Si el estado isFav es false, entonces settea ese estado en true, 
  y despacha la función addFav que recibiste por props, pasándole 
  props como argumento.
*/

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className="bg-blue-300 border border-gray-400 rounded p-2 w-56">
      <div className="flex justify-end">
        {isFav ? (
          <button onClick={handleFavorite} className="text-red-600 text-xl">
            ❤️
          </button>
        ) : (
          <button onClick={handleFavorite} className="text-gray-600 text-xl">
            🤍
          </button>
        )}
        {inFav ? null : (
          <button onClick={() => onClose(id)} className="ml-2 text-red-600">
            X
          </button>
        )}
      </div>
      <div className="text-center">
        <Link to={`/detail/${id}`} className="text-blue-700 hover:underline">
          <h2 className="text-lg font-bold mb-2">{name.slice(0, 16)}</h2>
          {/* <h2>{status}</h2> */}
          <h2 className="text-sm mb-2">{species}</h2>
          {/* <h2>{gender}</h2>
         <h2>{origin?.name}</h2> */}
          <img
            src={image}
            alt={name}
            className="rounded-full mx-auto mb-4 w-25 h-25 object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
// namePepe: nombre.
// status: status.
// species: especie.
// gender: género.
// origin: origen (ten en cuenta que el nombre del origen viene dentro de otra propiedad llamada name).
// image: imagen.

function mapState(state) {
  return {
    myFavorites: state.myFavorites,
  };
}
function mapDispatch(dispatch) {
  return {
    addFav: function (char) {
      dispatch(addFav(char));
    },
    removeFav: function (id) {
      dispatch(removeFav(id));
    },
  };
}

export default connect(mapState, mapDispatch)(Card);

//* Redux -> invoca mapState(state) <- le pasa el state y crea props en Card
//* con lo que retorna el mapState

// export default connect(mapState, {addFav,removeFav})(Card)
