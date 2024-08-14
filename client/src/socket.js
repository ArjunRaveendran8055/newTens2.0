import { io } from "socket.io-client";
import { SERVER_URL } from "./server";

const socket = io(SERVER_URL, {
  withCredentials: true,
  autoConnect:false
});

export default socket;