import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasChars, setHasChars] = useState(false);
  const [length, setLength] = useState(8);
  const passReference = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz";
    if (hasNumbers) str += "1234567890";
    if (hasChars) str += "!`~@#$%^&*(){}[]_-+=<,>.?/:;\"'\\|";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [setPassword, hasChars, hasNumbers, length]);

  const copyPassToClipboard = useCallback(() =>{
    passReference.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(() => passwordGenerator(), [length, hasNumbers, hasChars]);

  return (
    <>
      <div className="h-auto max-w-[470px] bg-slate-800 m-auto mt-16 rounded-2xl items-center">
        <h1 className="text-white text-2xl text-center m-4">
          Password Generator
        </h1>
        {/*input and copy div start*/}
        <div className="gap-2">
          <input
            className="h-10 w-[300px] m-4 rounded-xl"
            ref={passReference}
            type="text"
            value={password}
            readOnly
          />
          <button 
          className="bg-blue-700 p-2 px-5 text-white rounded-md"
          onClick={copyPassToClipboard}>
            Copy
          </button>
        </div>
        {/*input and copy div end*/}

        {/* modifiers div start */}
        <div className="items-center ml-5">
          {/* input range */}
          <>
            <input
              className="accent-orange-300"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              type="range"
              defaultValue={length}
              name="range"
              min={6}
              max={20}
            />
            <label className="text-orange-600 mx-2" htmlFor="range">
              Count {length}
            </label>
          </>
          {/* include numbers*/}
          <>
            <input
              className="w-4 h-4 ml-3"
              onChange={() => {
                setHasNumbers((prevVal) => !prevVal);
              }}
              name="nums"
              type="checkbox"
            />
            <label className="text-orange-600 mx-2" htmlFor="range">
              Numbers
            </label>
          </>
          {/* include Characters */}
          <>
            <input
              className="w-4 h-4 ml-3"
              onChange={() => {
                setHasChars((prevVal) => !prevVal);
              }}
              name="nums"
              type="checkbox"
            />
            <label className="text-orange-600 mx-2" htmlFor="range">
              Characters
            </label>
          </>
        </div>
      </div>
    </>
  );
}

export default App;
