import React from "react";

const Canvas = ({ children }) => {
  return (
    <div className="canvas-container w-full h-screen overflow-scroll relative bg-neutral-200 border-2 border-[#ccc]">
      {children}
    </div>
  );
};

export default Canvas;
