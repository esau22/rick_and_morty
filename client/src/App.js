import { useEffect, useState } from "react";
import "./App.css";

import Cards from "./components/Cards.jsx";
import NavBar from "./components/NavBar";
import axios from "axios";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import About from "./components/About";
import Detail from "./components/Detail";
import ErrorNotFound from "./components/ErrorNotFound";
import Favorites from "./components/Favorites";

import { connect, useDispatch, useSelector } from "react-redux";
import {
  addFav,
  removeFav,
  searchChar,
  removeChar,
  addChar,
} from "./redux/actions";
import CreateCharacter from "./components/CreateCharacter";

export default function App() {
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  // const EMAIL = "eje@gmail.com";
  // const PASSWORD = "@123QWEasd";

  const dispatch = useDispatch();
  const URL = "http://localhost:5000/rickandmorty";

  function login(inputs) {
    axios
      .get(`${URL}/login?password=${inputs.password}&email=${inputs.email}`)
      .then(({ data }) => {
        if (data.access) {
          setAccess(true);
          navigate("/home");
          return alert("bienvenidos!!!");
        } else {
          return alert("no es el usuario");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function logout() {
    axios
      .get(`${URL}/login?password=1234&email=1234`)
      .then(({ data }) => {
        if (!data.access) {
          // setAccess(false);
          // navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   !access && navigate("/");
  // }, [access]);

  // const [characters, setCharacters] = useState([]);
  // console.log(characters)
  const { characters } = useSelector((state) => state);
  function onSearch(id) {
    axios(`http://localhost:5000/rickandmorty/character/${id}`).then(
      // axios("http://localhost:1222/")
      ({ data }) => {
        if (data.name) {
          dispatch(searchChar(data));
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      }
    );
  }
  function onClose(id) {
    dispatch(removeChar(Number(id)));
    dispatch(removeFav(Number(id)));
  }

  const { pathname } = useLocation();
  // console.log(":::::", pathname.split("/"));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/rickandmorty/allcharacters`)
      .then((result) => {
        dispatch(addChar(result.data));
      });
  }, []);

  useEffect(() => {
    dispatch(addFav({ id: "RELOAD" }));
  }, []);

  return (
    // console.log("access <<<>>>>>> ", access),
    <>
      {/* <h1>{title}</h1> */}
      {pathname === "/" ? null : <NavBar logout={logout} onSearch={onSearch} />}

      <Routes>
        <Route path="/" element={<Login login={login} />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Cards onClose={onClose} />}></Route>
        <Route
          path="/favorites"
          element={<Favorites onClose={onClose} />}
        ></Route>
        <Route path="/create" element={<CreateCharacter />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        {/* desde el Link -> /detail/algoMas */}
        {/* --> params => {id:undefined} -->next desde el Link le damos el value =>  {id:algoMas} */}
        <Route path="*" element={<ErrorNotFound />}></Route>
      </Routes>
      {/* {pathname !== "/" &&
      pathname !== "/home" &&
      pathname !== "/about" &&
      pathname.split("/")[1] !== `detail` ? (
        <ErrorNotFound />
      ) : null} */}
    </>
  );
}

// function mapDispatch(dispatch) {
//   return {
//     addFav: function (char) {
//       dispatch(addFav(char));
//     },
//     removeFav: function (id) {
//       dispatch(removeFav(id));
//     },
//   };
// }

// export default connect(null, mapDispatch)(App);
