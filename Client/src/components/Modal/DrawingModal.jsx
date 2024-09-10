import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddDrawingMutation,
  useUpdateDrawingMutation,
} from "../../redux/features/drawing/drawingApi";

// eslint-disable-next-line react/prop-types
const SaveDrawingModal = ({ title, description, isOpen, close, elements }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { drawingId } = useParams();
  const [addDrawing] = useAddDrawingMutation();
  const [updateDrawing] = useUpdateDrawingMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const from = e.target;
    const payload = {
      title: from.title.value,
      description: from.description.value,
      elements,
    };
    if (drawingId) {
      const updatePayload = { payload, drawingId };
      const res = await updateDrawing(updatePayload).unwrap();
      if (res.success) {
        toast.success(res.message);
        navigate("/all-drawings");
        close();
        setIsLoading(false);
      }
    } else {
      const res = await addDrawing(payload).unwrap();
      if (res.success) {
        toast.success(res.message);
        navigate("/all-drawings");
        close();
        setIsLoading(false);
      }
    }
  };

  const cssClass =
    "appearance-none block w-full px-3 text-[15px] py-2 border rounded-md placeholder-secondary/50 focus:outline-none focus:border-[#eb4768] transition duration-150 ease-in-out";

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={close}
    >
      <div className="fixed bg-black/25 inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white rounded-xl shadow-md p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium leading-8 text-gray-900"
            >
              Enter the Title and Description for your Drawing!
            </DialogTitle>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center px-2 md:px-0 mt-4 space-y-4"
            >
              <div className="w-full">
                <label className="block text-gray-800 mb-1">Title</label>
                <input
                  placeholder="Enter title"
                  type="text"
                  name="title"
                  defaultValue={title}
                  className={cssClass}
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="description"
                  className="block text-gray-800 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  name="description"
                  defaultValue={description}
                  className={cssClass}
                ></textarea>
              </div>
              <div className="mt-4 flex items-center space-x-4 justify-end w-full">
                <button
                  type="button"
                  onClick={close}
                  className="bg-[#ff0505] px-6 py-2 rounded-full text-white font-medium text-sm "
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`px-6 py-2 rounded-full text-white font-medium text-sm tracking-widest 
    ${isLoading ? "bg-gray-400" : "bg-[#03f152]"}`}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SaveDrawingModal;
