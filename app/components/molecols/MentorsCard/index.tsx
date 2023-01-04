import React from "react";
import Skills from "~/components/atoms/Skills";

const MentorsCard = () => {
  return (
    <div className="m-[8px] flex  w-[10rem] flex-col items-center justify-between rounded-md  shadow-md lg:h-[20rem] lg:w-[16rem]">
      <div className=" flex w-full flex-row items-center justify-around ">
        <div className="h-[4rem] w-[4rem] rounded-full bg-[#eee9e9]"></div>
        <p>Nome cognome</p>
      </div>
      {/* professione */}
      <h2>Marketing manager</h2>
      {/* skills */}
      <div className="my-1 flex flex-col items-center">
        <p>Skills:</p>
        <Skills />
      </div>
      {/* primo giorno libero */}
      <p>Primo orario:</p>
      <p className="my-2">11:00 - 10/02/20</p>
      <button
        type="submit"
        className="my-2 w-full rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        Prenota
      </button>
    </div>
  );
};
export default MentorsCard;
