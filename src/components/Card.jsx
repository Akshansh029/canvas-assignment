import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Card = ({ card, onDragStop, onResizeStop }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Draggable
      defaultPosition={{ x: card.x, y: card.y }}
      onStop={(e, data) => onDragStop(card.id, data.x, data.y)}
    >
      <ResizableBox
        width={card.width}
        height={card.height}
        minConstraints={[100, 50]}
        maxConstraints={[600, 400]}
        onResizeStop={(e, data) =>
          onResizeStop(card.id, data.size.width, data.size.height)
        }
        resizeHandles={["n", "s", "e", "w", "ne", "nw", "se", "sw"]}
      >
        <div className="bg-white border-[1px] border-[#ddd] rounded-md p-3 shadow-md overflow-hidden active:border-2 active:border-blue-600">
          <p>{showMore ? card.text : `${card.text.substring(0, 25)}...`}</p>
          <button
            className="bg-blue-500 text-white text-sm font-medium border-none px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default Card;
