import { useState, createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const userId = localStorage.getItem("user-id");

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
      query: {
        userId: userId,
      },
      //   transports: ["websocket"],
    });
      setSocket(newSocket);

      newSocket.on("onlineUsers", (users) => {
        console.log("online users", users);
        setOnlineUsers(users);          
      }); 


    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};