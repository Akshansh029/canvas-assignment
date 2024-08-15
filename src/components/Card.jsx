import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Card = ({
  card,
  onDragStop,
  onResizeStop,
  openModal,
  updateCardText,
  onClick,
  isSelected,
}) => {
  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(card.text);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateCardText(card.id, inputText);
      setEditing(false);
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: card.x, y: card.y }}
      onStop={(e, data) => onDragStop(card.id, data.x, data.y)}
    >
      <ResizableBox
        width={card.width}
        height={card.height}
        minConstraints={[150, 100]}
        maxConstraints={[600, 400]}
        onResizeStop={(e, { size }) =>
          onResizeStop(card.id, size.width, size.height)
        }
        resizeHandles={["n", "s", "e", "w", "ne", "nw", "se", "sw"]}
      >
        <div
          id={`card-${card.id}`}
          className={`bg-white border-[3px] ${
            isSelected ? "border-blue-500" : "border-transparent"
          } rounded-md p-3 shadow-md overflow-hidden h-full w-full box-border flex flex-col justify-between cursor-pointer`}
          onClick={() => onClick(card)}
        >
          <div style={{ flex: 1 }}>
            {editing ? (
              <input
                className="w-full p-1 border rounded"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={() => setEditing(false)}
                autoFocus
              />
            ) : (
              <p onDoubleClick={handleDoubleClick}>
                {card.text.substring(0, 25)}...
              </p>
            )}
          </div>
          <button
            className="bg-blue-500 text-white text-sm font-medium border-none px-4 py-2 rounded-lg cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              openModal(card);
            }}
          >
            Show more
          </button>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default Card;
