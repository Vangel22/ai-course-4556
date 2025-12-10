import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";

function getUserName() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.name;
}

export default function SoilChat() {
  const userName = getUserName();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:10000/api/soil/chat",
        { prompt: input },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.data.answer || "No response" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error commincating with server!" },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ask a question</h2>
      {userName && <div>Logged user: {userName}</div>}

      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      {loading && <div>Loading...</div>}

      <form onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about soils"
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
