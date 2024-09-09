import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { buttons } from "../../pages/CreateDrawing/Buttons";
import ToolbarButton from "./ToolbarButton";

// eslint-disable-next-line react/prop-types
const DrawingToolbar = ({ onModeChange, onColorChange, onReset }) => {
  const [selectedMode, setSelectedMode] = useState("rectangle");

  const handleModeChange = (mode) => {
    onModeChange(mode);
    setSelectedMode(mode);
  };

  return (
    <div className="flex items-center gap-1 border p-1 rounded-xl shadow-sm mb-4">
      {buttons.map((button, index) => (
        <ToolbarButton
          key={`toolbar_button_${button.title}__${index}`}
          {...button}
          isSelected={button.title.toLowerCase() === selectedMode}
          onClick={() => handleModeChange(button.title.toLowerCase())}
        />
      ))}
      <input
        className="w-8 outline-none border-none bg-transparent cursor-pointer"
        type="color"
        onChange={(e) => onColorChange(e.target.value)}
      />
      <ToolbarButton
        title="Undo"
        icon={<GrPowerReset />}
        onClick={onReset}
        isSelected={false}
      />
    </div>
  );
};

export default DrawingToolbar;
