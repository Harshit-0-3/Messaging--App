import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define message structure for TypeScript
interface Message {
  sender: string;
  text: string;
}

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const username = localStorage.getItem("username") || "Guest";

  // Connect to Socket.IO on mount
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Send message to the server
  const sendMessage = () => {
    if (message.trim() && socket) {
      const newMessage: Message = { sender: username, text: message };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Chat Room</h1>

      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
