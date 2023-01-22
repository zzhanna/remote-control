import {
  Button,
  down,
  left,
  mouse,
  Point,
  right,
  straightTo,
  up,
} from "@nut-tree/nut-js";

export const drawSquare = async (offset: number): Promise<void> => {
  await mouse.pressButton(Button.LEFT);
  mouse.config.mouseSpeed = 200;
  await mouse.move(right(offset));
  await mouse.move(down(offset));
  await mouse.move(left(offset));
  await mouse.move(up(offset));
  await mouse.releaseButton(Button.LEFT);
};

export const drawRectangle = async (
  width: number,
  height: number
): Promise<void> => {
  await mouse.pressButton(Button.LEFT);
  mouse.config.mouseSpeed = 200;
  await mouse.move(right(width));
  await mouse.move(down(height));
  await mouse.move(left(width));
  await mouse.move(up(height));
  await mouse.releaseButton(Button.LEFT);
};

export const drawCircle = async (radius: number): Promise<void> => {
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
};
