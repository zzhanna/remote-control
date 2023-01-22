import {
  Button,
  down,
  left,
  mouse,
  Point,
  right,
  straightTo,
  up,
  Region,
  screen,
} from "@nut-tree/nut-js";
import Jimp from "jimp";

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

export const screenShot = async () => {
  const mousePosition = await mouse.getPosition();
  const widthScreenShot = 200;
  const heightScreenShot = 200;
  try {
    const region = new Region(
      mousePosition.x - widthScreenShot / 2,
      mousePosition.y - heightScreenShot / 2,
      widthScreenShot,
      heightScreenShot
    );
    const screenshot = await (await screen.grabRegion(region)).toRGB();

    const imageJimp = new Jimp(
      {
        data: screenshot.data,
        width: screenshot.width,
        height: screenshot.height,
      },
      (err, screenshot) => {
        if (err) throw err;
        return screenshot;
      }
    );
    const bufferScreenShot = (
      await imageJimp.getBufferAsync(Jimp.MIME_PNG)
    ).toString("base64");
    return bufferScreenShot;
  } catch (err) {
    console.error(
      "ERROR! The cursor is based outside the application screen, move the cursor on another position"
    );
  }
};
