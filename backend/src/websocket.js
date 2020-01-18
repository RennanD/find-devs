import socketio from "socket.io";

import parseArray from "./utils/parseArray";
import calculateDistance from "./utils/calculateDistance";
let io;
const connections = [];

export function setupSocket(server) {
  io = socketio(server);

  io.on("connection", socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseArray(techs)
    });
  });
}

export function findConnections(coordinates, techs) {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(tech => techs.includes(tech))
    );
  });
}

export function sendMessege(to, messege, data) {
  to.forEach(connection => {
    io.to(connection.id).emit(messege, data);
  });
}
