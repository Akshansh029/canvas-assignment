// App Component
import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Card from "./components/Card";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const App = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      x: 100,
      y: 100,
      width: 150,
      height: 150,
    },
    {
      id: 2,
      text: "Morbi finibus eros sit amet mauris volutpat scelerisque",
      x: 400,
      y: 200,
      width: 150,
      height: 150,
    },
  ]);

  const [showMore, setShowMore] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
    setShowMore(true);
  };

  const closeModal = () => {
    setShowMore(false);
    setSelectedCard(null);
  };

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
          openModal={openModal}
        />
      ))}
      <Modal
        isOpen={showMore}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Card Details Modal"
      >
        <div
          className="close-button flex items-center justify-center p-2 bg-transparent"
          onClick={closeModal}
        >
          <IoClose size={22} className="text-slate-400" />
        </div>
        {selectedCard && (
          <div>
            <h2 className="text-lg font-semibold">Card Details</h2>
            <p>{selectedCard.text}</p>
          </div>
        )}
      </Modal>
    </Canvas>
  );
};

export default App;
