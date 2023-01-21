import "dotenv/config";
import { httpServer } from "./src/http_server/index";
import { mouse } from "@nut-tree/nut-js";
import { WebSocketServer } from "ws";
import { startWebSocket } from "./src/websocket_server/index";

const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT: number = Number(process.env.WS_PORT) || 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

startWebSocket();
