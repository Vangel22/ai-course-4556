import axios from "axios";
import { useState } from "react";

import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const testConnection = async () => {
    try {
      const res = await axios.get("http://localhost:10000/api/test");
      console.log(res.data);
      alert(res.data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const sendEcho = async () => {
    try {
      const res = await axios.post("http://localhost:10000/api/echo", {
        text: input,
      });

      alert(JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>AI Course - Setup</h1>

      <div>
        <h2>Test connection</h2>
        <button onClick={testConnection}>Test</button>
      </div>

      <div>
        <h2>Echo test</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text"
        />

        <button onClick={sendEcho}>Send echo</button>
      </div>
    </>
  );
}

export default App;
