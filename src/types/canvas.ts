import { Dispatch, SetStateAction } from "react";

export interface Shape {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  isDragging: boolean;
  type: "square" | "circle";
}

export interface ArrowType {
  id: string;
  from: string;
  to: string;
}

export interface CanvasProps {
  shapes: Shape[];
  setShapes: Dispatch<SetStateAction<Shape[]>>;
  arrows: ArrowType[];
  setArrows: Dispatch<SetStateAction<ArrowType[]>>;
  addArrow: (fromId: string, toId: string) => void;
  deleteArrow: (id: string) => void;
  scale: number;
  isPanning: boolean;
  stagePos: { x: number; y: number };
  setStagePos: (pos: { x: number; y: number }) => void;
  connectMode: boolean;
}
