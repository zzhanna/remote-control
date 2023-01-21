import "dotenv/config";
import { httpServer } from "../http_server";
import { WebSocketServer } from "ws";
import "dotenv/config";
import { manualControll } from "./manualControll";

export const startWebSocket = () => {
  const WS_PORT: number = Number(process.env.WS_PORT) || 8080;

  const wsServer = new WebSocketServer({ port: WS_PORT });
  console.log(`Start WebSocket server on the ${WS_PORT} port!`);

  wsServer.on("connection", manualControll);

  wsServer.on("close", () => {
    console.log("WebSocket server closed");
  });
};
