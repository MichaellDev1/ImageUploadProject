import LayoutPages from "@/components/LayoutPages";
import { list } from "postcss";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

interface Message {
  room: string;
  username: string;
  message: string;
}

export default function Chat() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [allMessage, setAllMessage] = useState<Array<Message>>([]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room,
        username,
        message: currentMessage,
      };

      await socket.emit("send_message", messageData);
      setAllMessage((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    const receivedMessage = (message: Message) => {
      setAllMessage((list) => [...list, message]);
    };

    socket.on("receive_message", receivedMessage);
    return () => {
      socket.off("receive_message", receivedMessage);
    };
  }, [socket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  const handleRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && room) {
      socket.emit("join_room", room);
    }
  };

  return (
    <LayoutPages title="Chat">
      <h3>Hello to Chat</h3>

      <form onSubmit={handleRoom}>
        <input
          type="text"
          name="Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name="Room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button>Join a Room</button>
      </form>

      <form action="" onSubmit={sendMessage}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Your Message..."
        />
        <button>Click</button>
      </form>

      <div className="flex flex-col">
        {allMessage.map((message, inx) => (
          <span key={inx} className="flex flex-col">
            <span> {message.username}</span>
            <p>{message.message}</p>
          </span>
        ))}
      </div>
    </LayoutPages>
  );
}
