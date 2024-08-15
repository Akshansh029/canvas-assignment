import React, { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import Card from "./components/Card";
import Modal from "react-modal";
import Xarrow from "react-xarrows";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "15px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const App = () => {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards
      ? JSON.parse(savedCards)
      : [
          {
            id: 1,
            text: "First card",
            x: 100,
            y: 100,
            width: 150,
            height: 150,
          },
          {
            id: 2,
            text: "Second card",
            x: 400,
            y: 200,
            width: 150,
            height: 150,
          },
        ];
  });

  const [showMore, setShowMore] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [connections, setConnections] = useState(() => {
    const savedConnections = localStorage.getItem("connections");
    return savedConnections ? JSON.parse(savedConnections) : [];
  });

  const [startCard, setStartCard] = useState(null);
  const [endCard, setEndCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("connections", JSON.stringify(connections));
  }, [cards, connections]);

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

  const updateCardText = (id, newText) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, text: newText } : card
      )
    );
  };

  const addNewCard = () => {
    const newCard = {
      id: cards.length + 1,
      text: "This is a new card! Double-click to edit.",
      x: 150,
      y: 150,
      width: 150,
      height: 150,
    };

    setCards((prevCards) => [...prevCards, newCard]);
  };

  const removeCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setConnections((prevConnections) =>
      prevConnections.filter(
        (connection) =>
          connection.from !== `card-${cardId}` &&
          connection.to !== `card-${cardId}`
      )
    );
    closeModal();
  };

  const handleCardClick = (card) => {
    if (!startCard) {
      console.log("Card is selected");
      setStartCard(card.id);
    } else if (!endCard && card.id !== startCard) {
      setEndCard(card.id);
    }
  };

  const addConnection = () => {
    if (startCard && endCard) {
      setConnections((prevConnections) => [
        ...prevConnections,
        { from: `card-${startCard}`, to: `card-${endCard}` },
      ]);
      setStartCard(null);
      setEndCard(null);
    }
  };

  const cancelSelection = () => {
    setStartCard(null);
    setEndCard(null);
  };

  return (
    <Canvas addNewCard={addNewCard}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStop={onDragStop}
          onResizeStop={onResizeStop}
          openModal={openModal}
          updateCardText={updateCardText}
          onClick={() => handleCardClick(card)}
          isSelected={startCard === card.id || endCard === card.id}
        />
      ))}

      {startCard && endCard && (
        <div className="fixed bottom-4 right-4 flex gap-2">
          <button
            className=" bg-green-500 text-white px-4 py-2 rounded"
            onClick={addConnection}
          >
            Connect Cards
          </button>
          <button
            className=" bg-red-500 text-white px-4 py-2 rounded"
            onClick={cancelSelection}
          >
            Cancel
          </button>
        </div>
      )}

      {connections.map((connection, index) => (
        <Xarrow
          key={index}
          start={connection.from}
          end={connection.to}
          color="black"
          strokeWidth={2}
          headSize={6}
        />
      ))}

      <Modal
        isOpen={showMore}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Card Details Modal"
      >
        {selectedCard && (
          <div className="max-w-[450px]">
            <h2 className="text-xl font-semibold">Card Details</h2>
            <p className="text-lg text-gray-900">{selectedCard.text}</p>
            <button
              className="rounded-lg z-10 flex items-center gap-1 px-3 py-2 bg-red-500 active:bg-red-600 text-white font-medium mx-auto mt-4"
              onClick={() => removeCard(selectedCard.id)}
            >
              Remove card
            </button>
          </div>
        )}
      </Modal>
    </Canvas>
  );
};

export default App;
