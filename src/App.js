import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Card from "./components/Card";

const App = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      x: 100,
      y: 100,
      width: 200,
      height: 100,
    },
    {
      id: 2,
      text: "Morbi finibus eros sit amet mauris volutpat scelerisque",
      x: 400,
      y: 200,
      width: 200,
      height: 100,
    },
  ]);

  const onDragStop = (id, x, y) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, x, y } : card))
    );
  };

  const onResizeStop = (id, width, height) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, width, height } : card
      )
    );
  };

  return (
    <Canvas>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStop={onDragStop}
          onResizeStop={onResizeStop}
        />
      ))}
    </Canvas>
  );
};

export default App;
