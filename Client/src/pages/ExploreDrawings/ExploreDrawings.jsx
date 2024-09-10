import { toast } from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Common/Loading";
import DrawingPreview from "../../components/Drawings/DrawingPreview";
import {
  useDeleteDrawingMutation,
  useGetAllDrawingsQuery,
} from "../../redux/features/drawing/drawingApi";

const ExploreDrawings = () => {
  const { data: drawings, isLoading } = useGetAllDrawingsQuery(undefined);
  const [deleteDrawing] = useDeleteDrawingMutation();
  if (isLoading) {
    return <Loading className="w-12 h-12 mt-10" />;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#79C044",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result?.isConfirmed) {
        const res = deleteDrawing(id).unwrap();
        if (res.success) {
          toast.success(res.message);
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-4 px-5">
      <div className="md:flex justify-between items-center md:px-0 mb-3">
        <h2 className="text-2xl md:text-4xl font-bold md:my-10 my-3">
          Explore list of drawings!
        </h2>
        <Link to={"/create-drawing"}>
          <button className="min-w-fit px-5 py-2 bg-[#eb4768] text-white rounded">
            Start Drawing
          </button>
        </Link>
      </div>
      {isLoading ? (
        <Loading className="w-12 h-12 mt-10" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawings?.data?.map((drawing) => (
            <div
              key={drawing?._id}
              className="relative border p-4 rounded-lg duration-300 hover:border-red-300 hover:shadow block group"
            >
              <Link to={`/all-drawings/${drawing?._id}`}>
                <h3 className="text-lg uppercase font-bold font-fira-sans group-hover:text-[#eb4768] duration-300">
                  {drawing?.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {drawing?.description}
                </p>
                <DrawingPreview drawing={drawing} />
              </Link>
              <div className="absolute top-2 right-2 hidden group-hover:block duration-300">
                <button
                  onClick={() => handleDelete(drawing?._id)}
                  className="bg-red-600 p-1 rounded-md text-white"
                >
                  <MdDeleteOutline className="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreDrawings;
