import React from "react";
import Canvas from './components/Canvas'
import Tools from './components/Tools'
import StickyNotes from './components/StickyNotes'
import './App.css'
import PenSize from "./components/PenSize";
const App = () => {
  return (
    <div className="app">
      <Tools/>
      <PenSize />
      <Canvas />
      <StickyNotes/>
    </div>
  );
}

export default App;