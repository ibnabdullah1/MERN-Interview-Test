import { useParams } from "react-router-dom";
import Loading from "../../components/Common/Loading";
import DrawingBoard from "../../components/Drawings/DrawingBoard";
import { useGetSingleDrawingQuery } from "../../redux/features/drawing/drawingApi";

const UpdateDrawing = () => {
  const { drawingId } = useParams();
  const { data: DrawingData, isLoading } = useGetSingleDrawingQuery(drawingId);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen w-full">
      <Loading className="w-12 h-12" />
    </div>
  ) : (
    <DrawingBoard drawing={DrawingData?.data} />
  );
};

export default UpdateDrawing;
