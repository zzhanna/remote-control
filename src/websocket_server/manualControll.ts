import WebSocket, { createWebSocketStream } from "ws";
import { mouse } from "@nut-tree/nut-js";
import {
  drawCircle,
  drawRectangle,
  drawSquare,
} from "./helpersControll/drawShape";
import { screenShot } from "./helpersControll/screenShot";
import {
  duplexWriteAndMessage,
  mouseDown,
  mouseLeft,
  mouseRight,
  mouseUp,
} from "./helpersControll/mouseCommand";

export const manualControll = (ws: WebSocket): void => {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf-8",
    defaultEncoding: "utf-8",
    decodeStrings: false,
  });

  duplex.on("data", async (chunck: string) => {
    try {
      const incommingArgs = chunck.split(" ");
      const [command, offset1, offset2] = incommingArgs;
      switch (command) {
        case "mouse_up":
          mouseUp(command, Number(offset1), duplex);
          break;
        case "mouse_down":
          mouseDown(command, Number(offset1), duplex);
          break;
        case "mouse_left":
          mouseLeft(command, Number(offset1), duplex);
          break;
        case "mouse_right":
          mouseRight(command, Number(offset1), duplex);
          break;
        case "mouse_position":
          const { x, y } = await mouse.getPosition();
          duplexWriteAndMessage(duplex, command, x, y);
          break;
        case "draw_square":
          await drawSquare(duplex, command, Number(offset1));
          break;
        case "draw_rectangle":
          await drawRectangle(
            duplex,
            command,
            Number(offset1),
            Number(offset2)
          );
          break;
        case "draw_circle":
          await drawCircle(duplex, command, Number(offset1));
          break;
        case "prnt_scrn":
          await screenShot(duplex, command);
          break;
        default:
          console.log(`Command ${command} not found`);
      }
    } catch (err) {
      console.log(err);
    }
  });
};
