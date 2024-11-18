import { Stack } from "@mui/material";

import Fab from "@mui/material/Fab";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddRectangleIcon from "@mui/icons-material/Rectangle";
import { Bookmark, Clear, ZoomIn, ZoomOut } from "@mui/icons-material";
import PanToolIcon from "@mui/icons-material/PanTool";
import LinkIcon from "@mui/icons-material/Link";

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
        Add Circle <AddCircleIcon sx={{ color: "#4C4A1F", ml: 1 }} />
      </Fab>
      <Fab
        color="secondary"
        variant="extended"
        aria-label="add-rectangle"
        onClick={addRectangle}
      >
        Add Rectangle <AddRectangleIcon sx={{ color: "#4C4A1F", ml: 1 }} />
      </Fab>
      <Fab
        color="secondary"
        variant="extended"
        aria-label="zoom-in"
        onClick={zoomIn}
      >
        Zoom In <ZoomIn sx={{ color: "#4C4A1F", ml: 1 }} />
      </Fab>
      <Fab
        color="secondary"
        variant="extended"
        aria-label="zoom-out"
        onClick={zoomOut}
      >
        Zoom Out <ZoomOut sx={{ color: "#4C4A1F", ml: 1 }} />
      </Fab>
      <Fab
        onClick={clearCanvas}
        color="secondary"
        variant="extended"
        aria-label="clear"
      >
        Clear <Clear sx={{ color: "#4C4A1F", ml: 1 }} />
      </Fab>
      <Fab
        onClick={bookmarkAppState}
        color="secondary"
        variant="extended"
        aria-label="save"
      >
        Bookmark <Bookmark sx={{ color: "#4C4A1F", ml: 1 }} />
      </Fab>
      <Fab
        color={isPanning ? "primary" : "secondary"}
        variant="extended"
        aria-label="pan"
        onClick={togglePan}
      >
        {isPanning ? "Pan On" : "Pan Off"}
        <PanToolIcon sx={{ color: "#4C4A1F", ml: 1 }} />
      </Fab>
      <Fab
        color={connectMode ? "primary" : "secondary"}
        variant="extended"
        aria-label="connect"
        onClick={toggleConnectMode}
      >
        {connectMode ? "Disconnect" : "Connect Shapes"}
        <LinkIcon sx={{ color: "#4C4A1F", ml: 1 }} />
      </Fab>
    </Stack>
  );
}
