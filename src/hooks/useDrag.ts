import { Shape } from "../types/canvas";

interface UseDragProps {
  shapes: Shape[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
  setSelectedId: (id: string | null) => void;
}

interface DragHandlers {
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
  handleDragMove: (e: any) => void;
  handleTransformEnd: (e: any) => void;
}

/**
 * Handle Konva drag and transform events for shapes
 *
 * @param {Shape[]} shapes - The shapes to be dragged and transformed
 * @param {React.Dispatch<React.SetStateAction<Shape[]>>} setShapes - The state setter for shapes
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setSelectedId - The state setter for the selected shape ID
 * @returns {DragHandlers} - The drag handlers
 */
export const useDrag = ({
  shapes,
  setShapes,
  setSelectedId,
}: UseDragProps): DragHandlers => {
  const handleDragStart = (e: any) => {
    const id = e.target.id();
    setShapes(
      shapes.map((shape) => ({
        ...shape,
        isDragging: shape.id === id,
      }))
    );
    setSelectedId(id);
  };

  const handleDragEnd = () => {
    setShapes(
      shapes.map((shape) => ({
        ...shape,
        isDragging: false,
      }))
    );
  };

  const handleDragMove = (e: any) => {
    const id = e.target.id();
    const newX = e.target.x();
    const newY = e.target.y();
    setShapes(
      shapes.map((shape) =>
        shape.id === id ? { ...shape, x: newX, y: newY } : shape
      )
    );
  };

  const handleTransformEnd = (e: any) => {
    const id = e.target.id();
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(scaleX);
    node.scaleY(scaleY);

    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id
          ? {
              ...shape,
              x: node.x(),
              y: node.y(),
              scaleX: scaleX,
              scaleY: scaleY,
              rotation: node.rotation(),
            }
          : shape
      )
    );
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleDragMove,
    handleTransformEnd,
  };
};
