import { useState } from "react";
import DrawingToolbar from "../Toolbar/DrawingToolbar";

const DrawingBoard = () => {
  const [drawingMode, setDrawingMode] = useState("rectangle");
  const [openModal, setOpen] = useState({ saveDrawing: false, text: false });
  const [color, setColor] = useState("#000000");
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <DrawingToolbar
          onModeChange={(mode) => {
            setDrawingMode(mode);
            if (mode === "text") setOpen((prev) => ({ ...prev, text: true }));
          }}
          onColorChange={(color) => setColor(color)}
        />
      </div>
    </div>
  );
};

export default DrawingBoard;
