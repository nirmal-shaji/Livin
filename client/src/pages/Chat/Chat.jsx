import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { userData } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
          const { data } = await userChats(userData._id);
     
         setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [userData._id]);

  
  useEffect(() => {
    socket.current = io("ws://localhost:8080");
  
    socket.current.emit("addNewUser", userData._id);
    socket.current.on("allUsers", (user) => {
  
      setOnlineUsers(user);
      
    });
  }, [userData._id])

//send messages 
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("sendMessage", sendMessage);}
  }, [sendMessage]);


//recieve messages
  useEffect(() => {
    socket.current.on("recieveMessage", (data) => {

      setReceivedMessage(data);
    }

    );
  },[]);


  // const checkOnlineStatus = (chat) => {
  //   const chatMember = chat.messages.find((member) => member !== userData._id);
  //   const online = onlineUsers.find((userData) => userData.userId === chatMember);
  //   return online ? true : false;
  // };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={userData._id}
                
                />
              </div>
            ))}
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={userData._id}
          setSendMessage={setSendMessage}
           receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
