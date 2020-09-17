import socketIOClient from "socket.io-client";

const api = process.env.REACT_APP_APP_API_URL;
export const socket = socketIOClient(api);