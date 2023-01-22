import "dotenv/config";
import { WebSocketServer } from "ws";
import { manualControll } from "./manualControll";


const WS_PORT: number = Number(process.env.WS_PORT) || 8080;

export const startWebSocket = () => {
  const wsServer = new WebSocketServer({ port: WS_PORT });
  console.log(`Start WebSocket server on the ${WS_PORT} port!`);

  wsServer.on("connection", manualControll);

  wsServer.on("close", () => {
    console.log("WebSocket server closed");
    wsServer.close();
  });
};
