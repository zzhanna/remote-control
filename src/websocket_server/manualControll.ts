import WebSocket, { createWebSocketStream } from "ws";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";

export const manualControll = (ws: WebSocket): void => {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  duplex.on("data", async (chunck: string) => {
    try {
      const incommingArgs = chunck.split(" ");
      const [command, offset] = incommingArgs;
      if (command === "mouse_up") {
        await mouse.move(up(Number(offset)));
        duplex.write(`${command}\u00A0${offset}`);
      }
      if (command === "mouse_down") {
        await mouse.move(down(Number(offset)));
        duplex.write(`${command}\u00A0${offset}`);
      }
      if (command === "mouse_left") {
        await mouse.move(left(Number(offset)));
        duplex.write(`${command}\u00A0${offset}`);
      }
      if (command === "mouse_right") {
        await mouse.move(right(Number(offset)));
        duplex.write(`${command}\u00A0${offset}`);
      }
      if (command === "mouse_position") {
        const { x, y } = await mouse.getPosition();
        duplex.write(`mouse_position\u00A0${x},${y}`);
      }
    } catch (err) {
      console.log(err);
    }
  });
};
