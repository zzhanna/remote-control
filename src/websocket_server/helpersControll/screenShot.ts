import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp from "jimp";
import { Duplex } from "stream";

export const screenShot = async (
  duplex: Duplex,
  command: string
): Promise<void> => {
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
      (err) => {
        if (err) throw err;
      }
    );

    const bufferScreenShot = (
      await imageJimp.getBufferAsync(Jimp.MIME_PNG)
    ).toString("base64");

    duplex.write(`prnt_scrn ${bufferScreenShot}`);
    console.log(`${command}`);
  } catch (err) {
    console.error(
      "ERROR! The cursor is based outside the application screen, move the cursor on another position"
    );
  }
};
