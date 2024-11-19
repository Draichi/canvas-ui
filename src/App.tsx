import { useState, useEffect } from "react";
import { Canvas } from "./components/Canvas";
import FloatingActionButtons from "./components/FloatingActionButtons";
import { ThemeProvider } from "@mui/material/styles";
import BookmarkList from "./components/BookmarkList";
import { Shape, ArrowType } from "./types/canvas";
import { theme } from "./utils/theme";

function App() {
  const appState = localStorage.getItem("appState");

  const [shapes, setShapes] = useState<Shape[]>(() => {
    if (appState) {
      const parsedState = JSON.parse(appState);
      return parsedState.shapes || [];
    }
    return [];
  });

  const [scale, setScale] = useState<number>(() => {
    if (appState) {
      const parsedState = JSON.parse(appState);
      return parsedState.scale || 1;
    }
    return 1;
  });

  const [isPanning, setIsPanning] = useState<boolean>(() => {
    if (appState) {
      const parsedState = JSON.parse(appState);
      return parsedState.isPanning || false;
    }
    return false;
  });

  const [stagePos, setStagePos] = useState<{ x: number; y: number }>(() => {
    if (appState) {
      const parsedState = JSON.parse(appState);
      return parsedState.stagePos || { x: 0, y: 0 };
    }
    return { x: 0, y: 0 };
  });

  const [bookmarks, setBookmarks] = useState<{ id: string; state: any }[]>(
    () => {
      const keys = Object.keys(localStorage).filter((key) =>
        key.startsWith("bookmark-view-")
      );
      return keys.map((key) => ({
        id: key.replace("bookmark-view-", ""),
        state: JSON.parse(localStorage.getItem(key) || "{}"),
      }));
    }
  );

  const [arrows, setArrows] = useState<ArrowType[]>(() => {
    if (appState) {
      const parsedState = JSON.parse(appState);
      return parsedState.arrows || [];
    }
    return [];
  });

  const [connectMode, setConnectMode] = useState<boolean>(false);

  const xRange = window.innerWidth * 0.6;
  const yRange = window.innerHeight * 0.6;
  const xOffset = window.innerWidth * 0.2;
  const yOffset = window.innerHeight * 0.2;

  const addCircle = () => {
    const newCircle: Shape = {
      id: (shapes.length + 1).toString(),
      x: xOffset + Math.random() * xRange,
      y: yOffset + Math.random() * yRange,
      rotation: Math.random() * 180,
      scaleX: 1,
      scaleY: 1,
      isDragging: false,
      type: "circle",
    };
    setShapes([...shapes, newCircle]);

    if (connectMode) {
      setConnectMode(false);
    }
  };

  const addRectangle = () => {
    const newRectangle: Shape = {
      id: (shapes.length + 1).toString(),
      x: xOffset + Math.random() * xRange,
      y: yOffset + Math.random() * yRange,
      rotation: Math.random() * 180,
      scaleX: 1,
      scaleY: 1,
      isDragging: false,
      type: "square",
    };
    setShapes([...shapes, newRectangle]);

    if (connectMode) {
      setConnectMode(false);
    }
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1));
  };

  const togglePan = () => {
    setIsPanning((prev) => !prev);
  };

  const clearCanvas = () => {
    setShapes([]);
    setStagePos({ x: 0, y: 0 });
    setScale(1);
    setArrows([]);
  };

  const bookmarkAppState = () => {
    const viewId = Date.now().toString();
    const bookmarkKey = `bookmark-view-${viewId}`;
    const appState = {
      shapes,
      scale,
      isPanning,
      stagePos,
      arrows,
    };
    localStorage.setItem(bookmarkKey, JSON.stringify(appState));
    setBookmarks((prev) => [...prev, { id: viewId, state: appState }]);
  };

  const deleteBookmark = (id: string) => {
    const bookmarkKey = `bookmark-view-${id}`;
    localStorage.removeItem(bookmarkKey);
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  const loadBookmark = (state: any) => {
    setShapes(state.shapes);
    setScale(state.scale);
    setIsPanning(state.isPanning);
    setStagePos(state.stagePos);
    setArrows(state.arrows);
  };

  const toggleConnectMode = () => {
    setConnectMode((prev) => !prev);
  };

  useEffect(() => {
    const appState = {
      shapes,
      scale,
      isPanning,
      stagePos,
      arrows,
    };
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [shapes, scale, isPanning, stagePos, arrows]);

  const addArrow = (fromId: string, toId: string) => {
    const fromShape = shapes.find((shape) => shape.id === fromId);
    const toShape = shapes.find((shape) => shape.id === toId);

    if (!fromShape || !toShape) {
      console.warn("Cannot create an arrow. One or both shapes do not exist.");
      return;
    }

    const newArrow: ArrowType = {
      id: `arrow-${Date.now()}`,
      from: fromId,
      to: toId,
    };
    setArrows([...arrows, newArrow]);
  };

  const deleteArrow = (id: string) => {
    setArrows(arrows.filter((arrow) => arrow.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#1c1c19", display: "flex" }}>
        <FloatingActionButtons
          addCircle={addCircle}
          addRectangle={addRectangle}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          isPanning={isPanning}
          togglePan={togglePan}
          clearCanvas={clearCanvas}
          bookmarkAppState={bookmarkAppState}
          connectMode={connectMode}
          toggleConnectMode={toggleConnectMode}
        />
        <Canvas
          shapes={shapes}
          setShapes={setShapes}
          arrows={arrows}
          setArrows={setArrows}
          addArrow={addArrow}
          deleteArrow={deleteArrow}
          scale={scale}
          isPanning={isPanning}
          stagePos={stagePos}
          setStagePos={setStagePos}
          connectMode={connectMode}
        />
        {bookmarks.length > 0 && (
          <BookmarkList
            bookmarks={bookmarks}
            deleteBookmark={deleteBookmark}
            loadBookmark={loadBookmark}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
