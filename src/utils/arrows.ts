import { Shape } from "../types/canvas";

export const getAdjustedPosition = (
  fromShape: Shape,
  toShape: Shape
): { start: number[]; end: number[] } => {
  const dx = toShape.x - fromShape.x;
  const dy = toShape.y - fromShape.y;
  const angle = Math.atan2(dy, dx);

  const fromMargin =
    fromShape.type === "circle"
      ? 40 * fromShape.scaleX
      : (80 / 2) * fromShape.scaleX;
  const toMargin =
    toShape.type === "circle" ? 40 * toShape.scaleX : (80 / 2) * toShape.scaleX;

  const startX = fromShape.x + fromMargin * Math.cos(angle);
  const startY = fromShape.y + fromMargin * Math.sin(angle);
  const endX = toShape.x - toMargin * Math.cos(angle);
  const endY = toShape.y - toMargin * Math.sin(angle);

  return {
    start: [startX, startY],
    end: [endX, endY],
  };
};
