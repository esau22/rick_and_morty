import Card from "./Card";
//import style from "../styles/Cards.module.css";
import { useSelector } from "react-redux";

import Paginate from "./Paginate";

export default function Cards({ onClose }) {
  const { characters, numPage } = useSelector((state) => state);

  console.log(characters);
  const cantCharPerPage = 6;
  // numPage    -> 1        2       3
  let desde = (numPage - 1) * cantCharPerPage; // 0          4     8
  let hasta = numPage * cantCharPerPage; //  4          8     12

  let cantPage = Math.floor(characters.length / cantCharPerPage);

  const viewCharacters = characters?.slice(desde, hasta);
  return (
    <div>
      <div className="grid grid-cols-6 gap-4 justify-items-center p-2 md:p-8">
        {viewCharacters?.map((char, index) => (
          <Card key={char.id} char={char} onClose={onClose} />
        ))}
      </div>
      <div></div>
      <Paginate numPage={numPage} cantPage={cantPage} />
    </div>
  );
}
