import { down, left, mouse, right, up } from "@nut-tree/nut-js";
import { Duplex } from "stream";

export const duplexWriteAndMessage = (
  duplex: Duplex,
  command: string,
  param1: number,
  param2?: number
): void => {
  if (param2) {
    duplex.write(`${command}\u00A0${param1},${param2}`);
    console.log(`${command} ${param1},${param2}`);
  } else {
    duplex.write(`${command}\u00A0${param1}`);
    console.log(`${command} ${param1}`);
  }
};

export const mouseUp = async (
  command: string,
  offset: number,
  duplex: Duplex
): Promise<void> => {
  await mouse.move(up(Number(offset)));
  duplexWriteAndMessage(duplex, command, offset);
};
export const mouseDown = async (
  command: string,
  offset: number,
  duplex: Duplex
): Promise<void> => {
  await mouse.move(down(Number(offset)));
  duplexWriteAndMessage(duplex, command, offset);
};
export const mouseLeft = async (
  command: string,
  offset: number,
  duplex: Duplex
): Promise<void> => {
  await mouse.move(left(Number(offset)));
  duplexWriteAndMessage(duplex, command, offset);
};
export const mouseRight = async (
  command: string,
  offset: number,
  duplex: Duplex
): Promise<void> => {
  await mouse.move(right(Number(offset)));
  duplexWriteAndMessage(duplex, command, offset);
};
