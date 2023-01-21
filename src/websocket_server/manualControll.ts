import WebSocket, { createWebSocketStream } from "ws";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";

export const manualControll = (ws: WebSocket): void => {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  duplex.on("data", async (chunck: Buffer) => {
    try {
      const incommingArgs = String(chunck).split(" ");
      const [command, positionX, positionY] = incommingArgs;
      if (command === "mouse_up") {
        await mouse.move(up(Number(positionX)));
        duplex.write(`${command}_${positionX}`);
      }
      if (command === "mouse_down") {
        await mouse.move(down(Number(positionX)));
        duplex.write(`${command}_${positionX}`);
      }
      if (command === "mouse_left") {
        await mouse.move(left(Number(positionX)));
        duplex.write(`${command}_${positionX}`);
      }
      if (command === "mouse_right") {
        await mouse.move(right(Number(positionX)));
        duplex.write(`${command}_${positionX}`);
      }
      if (command === "mouse_position") {
        const { x, y } = await mouse.getPosition();
        duplex.write(`${command}_${x},${y}`);
        // console.log(`${command}_${x},${y}`);
      }
    } catch (err) {
      console.log(err);
    }
  });
};
