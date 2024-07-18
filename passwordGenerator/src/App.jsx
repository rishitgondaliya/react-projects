import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.ceil(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  });

  return (
    <div className="w-full max-w-xl  mx-auto px-4 my-8 bg-slate-700 text-orange-500 rounded-xl">
      <h1 className="text-4xl text-white text-center py-4 my-4">
        Password Generator
      </h1>
      <div className="flex rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          placeholder="password"
          className="outline-none w-full py-2 px-4 text-md"
          readOnly
          ref={passwordRef}
        />
        <button
          className="outline-none bg-blue-700 text-white px-3"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex text-xl gap-x-2">
        <div className="flex items-center gap-x-3 my-3">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: ({length})</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
