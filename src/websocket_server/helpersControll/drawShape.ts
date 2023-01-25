import {
  Button,
  down,
  left,
  mouse,
  Point,
  right,
  straightTo,
  up,
  screen,
} from "@nut-tree/nut-js";
import { duplexWriteAndMessage } from "./mouseCommand";
import { Duplex } from "stream";

const checkValidData = async (param1: number, param2?: number | undefined) => {
  const widthScreenUser = await screen.width();
  const heightScreenUser = await screen.height();
  const { x, y } = await mouse.getPosition();

  if (
    param2 &&
    param2 + y <= heightScreenUser &&
    param1 + x <= widthScreenUser
  ) {
    return true;
  } else if (
    !param2 &&
    param1 + x <= widthScreenUser &&
    param1 + y <= heightScreenUser
  ) {
    return true;
  } else {
    return false;
  }
};

export const drawSquare = async (
  duplex: Duplex,
  command: string,
  offset: number
): Promise<void> => {
  try {
    if (!(await checkValidData(offset))) throw Error;
    await mouse.pressButton(Button.LEFT);
    mouse.config.mouseSpeed = 200;
    await mouse.move(right(offset));
    await mouse.move(down(offset));
    await mouse.move(left(offset));
    await mouse.move(up(offset));
    await mouse.releaseButton(Button.LEFT);
    duplexWriteAndMessage(duplex, command, Number(offset));
  } catch {
    console.error("ERROR! Unable to draw the shape, move the cursor");
  }
};

export const drawRectangle = async (
  duplex: Duplex,
  command: string,
  width: number,
  height: number
): Promise<void> => {
  try {
    if (!(await checkValidData(width, height))) throw Error;
    await mouse.pressButton(Button.LEFT);
    mouse.config.mouseSpeed = 200;
    await mouse.move(right(width));
    await mouse.move(down(height));
    await mouse.move(left(width));
    await mouse.move(up(height));
    await mouse.releaseButton(Button.LEFT);
    duplexWriteAndMessage(duplex, command, Number(width), Number(height));
  } catch {
    console.error("ERROR! Unable to draw the shape, move the cursor");
  }
};

export const drawCircle = async (
  duplex: Duplex,
  command: string,
  radius: number
): Promise<void> => {
  try {
    if (!(await checkValidData(radius * 2))) throw Error;
    mouse.config.mouseSpeed = 300;
    let mousePosition = await mouse.getPosition();
    await mouse.pressButton(Button.LEFT);
    for (let i = 0; i <= Math.PI * 2; i += 0.03) {
      const x = mousePosition.x - radius * Math.cos(i) + radius;
      const y = mousePosition.y - radius * Math.sin(i);
      const point = new Point(x, y);
      await mouse.move(straightTo(point));
    }
    await mouse.releaseButton(Button.LEFT);
    duplexWriteAndMessage(duplex, command, Number(radius));
  } catch {
    console.error("ERROR! Unable to draw the shape, move the cursor");
  }
};
