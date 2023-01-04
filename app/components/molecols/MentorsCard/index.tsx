import React from "react";
import Skills from "~/components/atoms/Skills";

const MentorsCard = () => {
  return (
    <div className=" m-[8px] flex w-[10rem]  flex-col items-center justify-between rounded-md p-2  shadow-md lg:h-[20rem] lg:w-[16rem]">
      <div className="flex w-full flex-row items-center justify-around ">
        <div
          className={`h-[60px] w-[70px] rounded-full bg-[#eee9e9] bg-[url('https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]  bg-contain bg-center`}
        />
        <p className="text-center">Nome cognome</p>
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
