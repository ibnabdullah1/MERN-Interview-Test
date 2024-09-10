import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Common/Loading";
import DrawingPreview from "../../components/Drawings/DrawingPreview";
import { useGetSingleDrawingQuery } from "../../redux/features/drawing/drawingApi";

const DrawingDetails = () => {
  const { drawingId } = useParams();
  const { data: DrawingData, isLoading } = useGetSingleDrawingQuery(drawingId);

  if (isLoading) {
    return <Loading className="w-12 h-12 mt-10" />;
  }
  const drawing = DrawingData.data;

  return (
    <div className="max-w-6xl mx-auto my-4 px-5">
      <div className="md:flex justify-between items-center md:px-0 mb-3">
        <h2 className="text-2xl md:text-4xl font-bold md:my-10 my-3">
          Details of the Drawing: {drawing?.title}
        </h2>
        <Link to={`/update-drawing/${drawing._id}`}>
          <button className="min-w-fit px-5 py-2 bg-[#eb4768] text-white rounded">
            Update Drawing
          </button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto border p-4 rounded">
        <h3 className="text-xl font-bold text-[#eb4768] uppercase">
          {drawing?.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{drawing?.description}</p>
        <DrawingPreview drawing={drawing} />
      </div>
    </div>
  );
};

export default DrawingDetails;
