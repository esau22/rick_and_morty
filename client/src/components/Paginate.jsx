import React from "react";
import { useDispatch } from "react-redux";
import { prev, next } from "../redux/actions";
//import style from "../styles/Paginate.module.css";

export default function Paginate({ numPage, cantPage }) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center mt-10">
      <div className="grid grid-cols-5 gap-4">
        {numPage <= 1 ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <>
            <button
              onClick={() => dispatch(prev())}
              className="bg-green-400 px-4 py-2 rounded"
            >
              PREV
            </button>
            <p>{numPage - 1}</p>
          </>
        )}
        <h3 className="bg-blue-300 px-4 py-2 rounded">{numPage}</h3>
        {numPage >= cantPage ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <>
            <p>{numPage + 1}</p>
            <button
              onClick={() => dispatch(next())}
              className="bg-green-400 px-4 py-2 rounded"
            >
              NEXT
            </button>
          </>
        )}
      </div>
    </div>
  );
}
