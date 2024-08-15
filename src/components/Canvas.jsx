import React from "react";
import { BiPlus } from "react-icons/bi";

const Canvas = ({ children, addNewCard }) => {
  return (
    <div className="canvas-container w-full h-screen overflow-scroll relative bg-neutral-200 border-2 border-[#ccc]">
      <button
        className="fixed top-5 right-5 rounded-lg z-10 flex items-center gap-1 px-3 py-2 bg-sky-500 active:bg-sky-600"
        onClick={addNewCard}
      >
        <BiPlus size={26} className="text-white" />
        <span className="text-white text-base font-medium">Add card</span>
      </button>
      {children}
    </div>
  );
};

export default Canvas;
