import React, { useEffect, useState } from "react";
import { user } from "../join/Join";
import "./chat.css";
import Message from "../message/Message";
import socketIO from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
const ENDPOINT = "http://127.0.0.1:8080/";
let socket;

const Chat = () => {
  const [id, setid] = useState("");
  const [message, setmessage] = useState([]);
  const send = () => {
    let message = document.getElementById("input").value;
    console.log(message);
    socket.emit("message", { message, id });
    document.getElementById("input").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setid(socket.id);
    });
    socket.emit("joining", { user });
    socket.on("welcome", (data) => {
      setmessage([...message, data]);
      console.log(data.user, data.message);
    });
    socket.on("userMessage", (data) => {
      setmessage([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setmessage([...message, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setmessage([...message, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [message]);

  return (
    <div className="chatPage">
      <div className="chatContainder">
        <div className="header"> </div>{" "}
        <ScrollToBottom className="chatbox">
          {" "}
          {message.map((item) => (
            <Message
              key={item.id}
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "left" : "right"}
            />
          ))}{" "}
        </ScrollToBottom>{" "}
        <div className="chatInput">
          <input type="text" id="input" />
          <button onClick={send} id="sendBtn">
            {" "}
            Send{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Chat;
