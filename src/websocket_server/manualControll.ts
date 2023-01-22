import WebSocket, { createWebSocketStream } from "ws";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";
import { drawCircle, drawRectangle, drawSquare } from "./helpers";

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
          await mouse.move(up(Number(offset1)));
          duplex.write(`${command}\u00A0${offset1}`);
          console.log(`${command} ${offset1}`);
          break;
        case "mouse_down":
          await mouse.move(down(Number(offset1)));
          duplex.write(`${command}\u00A0${offset1}`);
          console.log(`${command} ${offset1}`);
          break;
        case "mouse_left":
          await mouse.move(left(Number(offset1)));
          duplex.write(`${command}\u00A0${offset1}`);
          console.log(`${command} ${offset1}`);
          break;
        case "mouse_right":
          await mouse.move(right(Number(offset1)));
          duplex.write(`${command}\u00A0${offset1}`);
          console.log(`${command} ${offset1}`);
          break;
        case "mouse_position":
          const { x, y } = await mouse.getPosition();
          duplex.write(`mouse_position\u00A0${x},${y}`);
          console.log(`${command} ${x}, ${y}`);

          break;
        case "draw_square":
          await drawSquare(Number(offset1));
          duplex.write(`draw_squares\u00A0${offset1}`);
          console.log(`${command} ${offset1}`);
          break;
        case "draw_rectangle":
          await drawRectangle(Number(offset1), Number(offset2));
          duplex.write(`draw_rectangle\u00A0${offset1},${offset2}`);
          console.log(`${command} ${offset1}, ${offset2}`);
          break;
        case "draw_circle":
          await drawCircle(Number(offset1));
          duplex.write(`draw_circle\u00A0${offset1}`);
          console.log(`${command} ${offset1}`);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  });
};
