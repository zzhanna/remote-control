import "dotenv/config";
import { httpServer } from "./http_server";
import { startWebSocket } from "./websocket_server";

const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

startWebSocket();
