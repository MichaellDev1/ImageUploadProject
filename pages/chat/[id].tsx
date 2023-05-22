import LayoutPages from "@/components/LayoutPages";
import { useAuthConsumer } from "@/context/AuthContext";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { io } from "socket.io-client";

interface Message {
  senderId: string;
  message: string;
  receivedId: string;
}

export default function Chat() {
  const { user } = useAuthConsumer();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [allMessage, setAllMessage] = useState<Array<Message>>([]);

  const socket = useMemo(() => io("http://localhost:4000"), []);

  useEffect(() => {
    if (user) {
      socket.emit("add_user", user._id);
      socket.on("get_users", (res) => {
        console.log(res);
      });
    }
  }, [user, socket]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMessage !== "" && user) {
      const messageData = {
        senderId: user._id,
        receivedId: room,
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

    socket.on("get_message", receivedMessage);
    return () => {
      socket.off("get_message", receivedMessage);
    };
  }, [socket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <LayoutPages title="Chat">
      <h3>Hello to Chat</h3>

      <form>
        <input
          type="text"
          name="Room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button>Id user</button>
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
