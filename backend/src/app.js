import express from "express";
import route from "./routes";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {
    this.server.use(route);
  }
}

export default new App().server;
