import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <dev className="w-full min-h-screen bg-[#0b1116]">
        <h1 className="text-red-500">AI PROJECT</h1>

        <iframe src="/three.js.html" />
      </dev>
    </>
  );
}

export default App;
