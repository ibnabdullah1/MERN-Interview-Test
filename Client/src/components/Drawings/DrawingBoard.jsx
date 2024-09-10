import { Dialog } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import {
  drawArrow,
  drawCircle,
  drawDiamond,
  drawLine,
  drawPencil,
  drawRectangle,
  renderDynamicText,
} from "../../utils/drawingUtils";
import Modal from "../Common/Modal";
import SaveDrawingModal from "../Modal/DrawingModal";
import DrawingToolbar from "../Toolbar/DrawingToolbar";

let newPath = [];

// eslint-disable-next-line react/prop-types
const DrawingBoard = ({ drawing }) => {
  // eslint-disable-next-line react/prop-types
  const [elements, setElements] = useState(drawing?.elements || []);
  const isDrawing = useRef(false);
  const [text, setText] = useState("");
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const staticCanvasRef = useRef(null);
  const contextRef = useRef(null);
  const startPoint = useRef(null);
  const staticContextRef = useRef(null);
  const [drawingMode, setDrawingMode] = useState("rectangle");
  const [openModal, setOpen] = useState({ saveDrawing: false, text: false });

  useEffect(() => {
    const canvas = canvasRef?.current;
    const staticCanvas = staticCanvasRef?.current;
    if (!canvas || !staticCanvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    staticCanvas.width = window.innerWidth;
    staticCanvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    const staticContext = staticCanvas.getContext("2d");
    if (context && staticContext) {
      context.scale(2, 2);
      staticContext.scale(1, 1);
      context.lineCap = "round";
      staticContext.lineCap = "round";
      context.lineWidth = 1;
      staticContext.lineWidth = 1;
      contextRef.current = context;
      staticContextRef.current = staticContext;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const staticCanvas = staticCanvasRef?.current;
    if (!canvas || !staticCanvas) return;

    const context = canvas.getContext("2d");
    const staticContext = staticCanvas.getContext("2d");
    if (context && staticContext) {
      context.strokeStyle = color;
      staticContext.strokeStyle = color;
    }
  }, [color]);

  useEffect(() => {
    if (elements.length) {
      elements.forEach((element) => {
        const { type, properties } = element;
        const { coordinates, color, thickness, content } = properties || {};

        if (contextRef.current) {
          contextRef.current.strokeStyle = color;
          contextRef.current.lineWidth = thickness;
        }

        coordinates.forEach((coordPair) => {
          const params = {
            x: coordPair[1]?.x,
            y: coordPair[1]?.y,
            contextRef,
            startPoint: { current: coordPair[0] },
            shouldClear: false,
          };

          switch (type) {
            case "rectangle":
              drawRectangle(params);
              break;
            case "diamond":
              drawDiamond(params);
              break;
            case "circle":
              drawCircle(params);
              break;
            case "line":
              drawLine(params);
              break;
            case "arrow":
              drawArrow(params);
              break;
            case "pencil":
              drawPencil(params);
              break;
            case "text":
              renderDynamicText({ ...params, text: content, color });
              break;
            default:
              break;
          }
        });
      });
    }
  }, [elements]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (contextRef.current && drawingMode !== "text")
      contextRef?.current?.beginPath();

    startPoint.current = { x: offsetX / 2, y: offsetY / 2 };
    isDrawing.current = true;
  };

  const draw = (e) => {
    if (!isDrawing.current || !contextRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const params = {
      x: offsetX / 2,
      y: offsetY / 2,
      contextRef,
      startPoint,
      text,
      color,
    };

    switch (drawingMode) {
      case "rectangle":
        newPath = drawRectangle(params);
        break;
      case "diamond":
        newPath = drawDiamond(params);
        break;
      case "circle":
        newPath = drawCircle(params);
        break;
      case "line":
        newPath = drawLine(params);
        break;
      case "arrow":
        newPath = drawArrow(params);
        break;
      case "pencil":
        newPath = drawPencil(params);
        break;
      case "text":
        newPath = renderDynamicText(params);
        break;
      default:
        break;
    }
  };

  const endDrawing = () => {
    if (
      contextRef.current &&
      staticContextRef.current &&
      canvasRef.current &&
      staticCanvasRef.current
    ) {
      staticContextRef.current.drawImage(canvasRef.current, 0, 0);
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (newPath.length) {
        const existingElementIndex = elements.findIndex(
          (element) => element.type === drawingMode
        );
        if (existingElementIndex !== -1) {
          // Create a new copy of the existing element with updated coordinates
          const updatedElement = {
            ...elements[existingElementIndex],
            properties: {
              ...elements[existingElementIndex].properties,
              coordinates: [
                ...elements[existingElementIndex].properties.coordinates,
                newPath,
              ],
            },
          };
          const newElements = [
            ...elements.slice(0, existingElementIndex),
            updatedElement,
            ...elements.slice(existingElementIndex + 1),
          ];
          setElements(newElements);
        } else {
          const newElement = {
            type: drawingMode,
            properties: {
              coordinates: [newPath],
              color,
              thickness: contextRef.current?.lineWidth,
              content: text,
            },
          };
          setElements([...elements, newElement]);
        }
      }
    }
    isDrawing.current = false;
    startPoint.current = null;
    newPath = [];
    text && setText("");
  };

  const clearContexts = () => {
    if (contextRef.current && staticContextRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef?.current?.width,
        canvasRef?.current?.height
      );
      staticContextRef.current.clearRect(
        0,
        0,
        staticCanvasRef?.current?.width,
        staticCanvasRef?.current?.height
      );
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto md:flex justify-between py-3  lg:px-10 px-5">
        <div className="flex items-center">
          <DrawingToolbar
            onModeChange={(mode) => {
              setDrawingMode(mode);
              if (mode === "text") setOpen((prev) => ({ ...prev, text: true }));
            }}
            onReset={() => {
              clearContexts();
              setElements([]);
            }}
            onColorChange={(color) => setColor(color)}
          />
        </div>

        <button
          disabled={!elements?.length}
          onClick={() => setOpen((prev) => ({ ...prev, saveDrawing: true }))}
          className="px-7 h-10 text-white text-sm rounded-full bg-[#eb4768]"
        >
          Save Changes
        </button>
      </div>

      {drawingMode === "text" && (
        <Modal
          isOpen={openModal.text}
          close={() => setOpen((prev) => ({ ...prev, text: false }))}
        >
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-8 text-gray-900"
          >
            Write you text in input box and click on canvas to add text
          </Dialog.Title>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="shadow-sm block px-3 py-2 border rounded-md placeholder-gray-400 sm:text-sm focus:outline-none focus:border-indigo-600 w-full mt-4"
          />
        </Modal>
      )}
      <canvas ref={staticCanvasRef} className="w-full absolute h-screen" />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        className={`w-full absolute h-screen z-10 ${
          text ? "cursor-text" : "cursor-crosshair"
        }`}
      />
      <SaveDrawingModal
        isOpen={openModal.saveDrawing}
        close={() => setOpen((prev) => ({ ...prev, saveDrawing: false }))}
        elements={elements}
        // eslint-disable-next-line react/prop-types
        title={drawing?.title}
        // eslint-disable-next-line react/prop-types
        description={drawing?.description}
      />
    </div>
  );
};

export default DrawingBoard;
