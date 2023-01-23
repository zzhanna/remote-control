import "dotenv/config";
import { WebSocketServer } from "ws";
import { manualControll } from "./manualControll";
import { httpServer } from "../http_server";

const WS_PORT: number = Number(process.env.WS_PORT) || 8181;

const ws = new WebSocketServer({ port: WS_PORT });
export const startWebSocket = () => {
  console.log(`Start WebSocket server on the ${WS_PORT} port!`);
  ws.on("connection", manualControll);
  ws.on("close", () => {
    console.log("Websocket server closed");
  });
};
process.on("SIGINT", async () => {
  await ws.clients.forEach((socket) => {
    socket.close();
    console.log("WebSocket server closed");
  });
  ws.close();
  console.log("Http server closed");
  httpServer.close();
  process.exit(0);
});
