import { httpServer } from "./src/http_server/index";
import { mouse } from "@nut-tree/nut-js";
import "dotenv/config";

const HTTP_PORT = process.env.PORT || 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
