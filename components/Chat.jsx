"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const ChatPage = () => {
  const [inbox, setInbox] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    const socket = io("localhost:3000", {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", (mes) => {
      setInbox((inbox) => [...inbox, mes]);
    });
    setSocket(socket);
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = () => {
    console.log(message);
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <div>
        {inbox?.map((msg, index) => (
          <div key={index} style={{ color: "white" }}>
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        className="text-white bg-gray-800 p-2 rounded-md"
      />
      <button style={{ color: "white" }} onClick={handleMessageSend}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;
