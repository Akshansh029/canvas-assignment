// Card Component
import React from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Card = ({ card, onDragStop, onResizeStop, openModal }) => {
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
        onResizeStop={(e, { size }) =>
          onResizeStop(card.id, size.width, size.height)
        }
        resizeHandles={["n", "s", "e", "w", "ne", "nw", "se", "sw"]}
      >
        <div
          className="bg-white border-[1px] border-[#ddd] rounded-md p-3 shadow-md overflow-hidden h-full w-full box-border"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <p>{card.text.substring(0, 25)}...</p>
          </div>
          <button
            className="bg-blue-500 text-white text-sm font-medium border-none px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => openModal(card)}
          >
            Show more
          </button>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default Card;
