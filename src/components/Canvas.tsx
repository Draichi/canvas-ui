import {
  Stage,
  Layer,
  Rect,
  Circle,
  Transformer,
  Arrow as KonvaArrow,
} from "react-konva";
import { getAdjustedPosition } from "../utils/arrows";
import { FC, useRef, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import { CanvasProps } from "../types/canvas";
import { useDrag } from "../hooks/useDrag";

export const Canvas: FC<CanvasProps> = ({
  shapes,
  setShapes,
  arrows,
  addArrow,
  scale,
  isPanning,
  stagePos,
  setStagePos,
  connectMode,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [connectFromId, setConnectFromId] = useState<string | null>(null);
  const transformerRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  const { handleDragStart, handleDragEnd, handleDragMove, handleTransformEnd } =
    useDrag({
      shapes,
      setShapes,
      setSelectedId,
    });

  /**
   * Enable transformer when a shape is selected so you can resize it
   */
  function enableTransformer() {
    if (selectedId && transformerRef.current) {
      const selectedNode = layerRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }

  useEffect(enableTransformer, [selectedId, shapes]);

  /**
   * Handle stage click to select a shape or clear selection
   */
  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      setConnectFromId(null);
      return;
    }
    const clickedId = e.target.id();
    const clickedShape = shapes.find((shape) => shape.id === clickedId);

    if (clickedShape) {
      if (connectMode) {
        if (!connectFromId) {
          setConnectFromId(clickedId);
        } else if (connectFromId !== clickedId) {
          addArrow(connectFromId, clickedId);
          setConnectFromId(null);
        }
      } else {
        setSelectedId(clickedId);
      }
    }
  };

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={scale}
        scaleY={scale}
        draggable={isPanning}
        x={stagePos.x}
        y={stagePos.y}
        onDragEnd={(e) => {
          if (isPanning) {
            setStagePos({ x: e.target.x(), y: e.target.y() });
          }
        }}
        onMouseDown={handleStageClick}
        onTouchStart={handleStageClick}
      >
        <Layer ref={layerRef}>
          {/* Render Arrows */}
          {arrows.map((arrow) => {
            const fromShape = shapes.find((shape) => shape.id === arrow.from);
            const toShape = shapes.find((shape) => shape.id === arrow.to);
            if (!fromShape || !toShape) return null;

            const points = getAdjustedPosition(fromShape, toShape);

            return (
              <KonvaArrow
                key={arrow.id}
                points={[...points.start, ...points.end]}
                pointerLength={10}
                pointerWidth={10}
                fill="#f1f1f1"
                stroke="#f1f1f1"
                strokeWidth={2}
              />
            );
          })}

          {/* Render Shapes */}
          {shapes.map((shape) =>
            shape.type === "square" ? (
              <Rect
                key={shape.id}
                id={shape.id}
                x={shape.x}
                y={shape.y}
                width={80}
                height={80}
                fill="#CB9DF0"
                opacity={0.8}
                draggable={!isPanning}
                rotation={shape.rotation}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.6}
                shadowOffsetX={shape.isDragging ? 10 : 5}
                shadowOffsetY={shape.isDragging ? 10 : 5}
                scaleX={shape.scaleX}
                scaleY={shape.scaleY}
                onTransformEnd={handleTransformEnd}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
              />
            ) : (
              <Circle
                key={shape.id}
                id={shape.id}
                x={shape.x}
                y={shape.y}
                radius={40}
                fill="#FFF9BF"
                opacity={0.8}
                draggable={!isPanning}
                rotation={shape.rotation}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.6}
                shadowOffsetX={shape.isDragging ? 10 : 5}
                shadowOffsetY={shape.isDragging ? 10 : 5}
                scaleX={shape.scaleX}
                scaleY={shape.scaleY}
                onTransformEnd={handleTransformEnd}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
              />
            )
          )}

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>

      <Snackbar
        open={Boolean(connectFromId)}
        message={`Connecting from ${connectFromId}. Click another shape to connect.`}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};
