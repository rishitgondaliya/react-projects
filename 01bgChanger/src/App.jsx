import { useState } from "react";

function App() {
  const [color, setColor] = useState("yellow");

  return (
    <div className="w-full h-screen" style={{ backgroundColor: color }}>
      <div className="w-full fixed flex flex-wrap justify-center bottom-10 px-4">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg px-4 py-2 bg-white rounded-3xl">
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "red" }}
            onClick={() => setColor("red")}
          >
            Red
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "blue" }}
            onClick={() => setColor("blue")}
          >
            Blue
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "pink" }}
            onClick={() => setColor("pink")}
          >
            Pink
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "green" }}
            onClick={() => setColor("green")}
          >
            Green
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "purple" }}
            onClick={() => setColor("purple")}
          >
            Purple
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "black" }}
            onClick={() => setColor("black")}
          >
            Black
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "orange" }}
            onClick={() => setColor("orange")}
          >
            Orange
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "olive" }}
            onClick={() => setColor("olive")}
          >
            Olive
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "gray" }}
            onClick={() => setColor("gray")}
          >
            Gray
          </button>
          <button
            className="outline-none px-4 py-1 rounded-3xl text-white"
            style={{ backgroundColor: "maroon" }}
            onClick={() => setColor("maroon")}
          >
            Maroon
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
