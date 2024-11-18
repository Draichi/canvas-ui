import { Stack } from "@mui/material";
import Fab from "@mui/material/Fab";
import { Bookmark, Clear, Share, ZoomIn, ZoomOut } from "@mui/icons-material";
import PanToolIcon from "@mui/icons-material/PanTool";

interface FloatingActionButtonsProps {
  addCircle: () => void;
  addRectangle: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  isPanning: boolean;
  togglePan: () => void;
  clearCanvas: () => void;
  bookmarkAppState: () => void;
  connectMode: boolean;
  toggleConnectMode: () => void;
}

export default function FloatingActionButtons({
  addCircle,
  addRectangle,
  zoomIn,
  zoomOut,
  isPanning,
  togglePan,
  clearCanvas,
  bookmarkAppState,
  connectMode,
  toggleConnectMode,
}: FloatingActionButtonsProps) {
  return (
    <Stack
      sx={{
        "& > :not(style)": { m: 1 },
        position: "absolute",
        padding: ".7rem 0.2rem",
        top: "50%",
        left: 16,
        transform: "translateY(-50%)",
        zIndex: 50,
        backgroundColor: "#363630",
        borderRadius: "2.5rem",
      }}
    >
      <Fab
        color="primary"
        variant="extended"
        aria-label="add-circle"
        onClick={addCircle}
      >
        Add Circle
      </Fab>
      <Fab
        color="secondary"
        variant="extended"
        aria-label="add-rectangle"
        onClick={addRectangle}
      >
        Add Rectangle
      </Fab>
      <Fab
        color="info"
        variant="extended"
        aria-label="zoom-in"
        onClick={zoomIn}
      >
        Zoom In <ZoomIn sx={{ ml: 1 }} />
      </Fab>
      <Fab
        color="info"
        variant="extended"
        aria-label="zoom-out"
        onClick={zoomOut}
      >
        Zoom Out <ZoomOut sx={{ ml: 1 }} />
      </Fab>
      <Fab
        onClick={clearCanvas}
        color="info"
        variant="extended"
        aria-label="clear"
      >
        Clear <Clear sx={{ ml: 1 }} />
      </Fab>
      <Fab
        onClick={bookmarkAppState}
        color="info"
        variant="extended"
        aria-label="save"
      >
        Bookmark <Bookmark sx={{ ml: 1 }} />
      </Fab>
      <Fab
        color={isPanning ? "success" : "info"}
        variant="extended"
        aria-label="pan"
        onClick={togglePan}
      >
        {isPanning ? "Pan On" : "Pan Off"}
        <PanToolIcon sx={{ ml: 1 }} />
      </Fab>
      <Fab
        color={connectMode ? "success" : "info"}
        variant="extended"
        aria-label="connect"
        onClick={toggleConnectMode}
      >
        {connectMode ? "Connect On" : "Connect Off"}
        <Share sx={{ ml: 1 }} />
      </Fab>
    </Stack>
  );
}
