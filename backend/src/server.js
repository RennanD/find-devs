import app from "./app";
import http from "http";
import { setupSocket } from "./websocket";

const server = http.Server(app);
setupSocket(server);

server.listen(3001);
