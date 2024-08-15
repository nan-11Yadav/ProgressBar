import React, { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [history, setHistory] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateNumber = (newNumber) => {
    if (newNumber >= 0 && newNumber <= 150) {
      const newHistory = history.slice(0, currentIndex + 1);
      setHistory([...newHistory, newNumber]);
      setCurrentIndex(newHistory.length);
      setNumber(newNumber);
    }
  };

  const handleAdd = () => updateNumber(number + 1);
  const handleSubtract = () => updateNumber(number - 1);

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setNumber(history[currentIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setNumber(history[currentIndex + 1]);
    }
  };

  const progressBarStyle = {
    width: `${(number / 150) * 100}%`,
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div className="App">
      <h1>Number Progress App</h1>
      <div className="controls">
        <button onClick={handleSubtract}>Subtract</button>
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={progressBarStyle}></div>
      </div>
      <div className="number-display">Number: {number}</div>
      <div className="undo-redo">
        <button onClick={handleUndo} disabled={currentIndex === 0}>
          Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={currentIndex === history.length - 1}
        >
          Redo
        </button>
      </div>
    </div>
  );
}

export default App;