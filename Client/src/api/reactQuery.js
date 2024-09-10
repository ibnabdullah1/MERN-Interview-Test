import axiosPublic from "../hooks/useAxiosPublic";

export const getDrawings = async () => {
  const response = await axiosPublic.get("/drawings");
  return response.data;
};

export const getDrawing = async (drawingId) => {
  const response = await axiosPublic.get(`/drawings/${drawingId}`);
  return response.data;
};

export const saveDrawing = async (drawing) => {
  const response = await axiosPublic.post("/drawings", { ...drawing });
  return response.data;
};

export const editDrawing = async (drawing) => {
  const response = await axiosPublic.put(`/drawings/${drawing.id}`, {
    ...drawing,
  });
  return response.data;
};

export const deleteDrawing = async (drawingId) => {
  const response = await axiosPublic.delete(`/drawings/${drawingId}`);
  return response.data;
};
