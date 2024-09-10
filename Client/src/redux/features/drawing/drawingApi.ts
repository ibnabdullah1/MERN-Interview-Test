import { baseApi } from "../../api/baseApi";

const drawingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDrawing: builder.mutation({
      query: (drawingData) => ({
        url: "/drawings",
        method: "POST",
        body: drawingData,
      }),
    }),
    getAllDrawings: builder.query({
      query: () => ({
        url: "/drawings",
        method: "GET",
      }),
      providesTags: ["drawings"],
    }),
    getSingleDrawing: builder.query({
      query: (id) => {
        return {
          url: `/drawings/${id}`,
          method: "GET",
        };
      },
    }),
    updateDrawing: builder.mutation({
      query: ({ payload, drawingId }) => {
        return {
          url: `/drawings/${drawingId}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["drawings"],
    }),
    deleteDrawing: builder.mutation({
      query: (drawingId) => {
        return {
          url: `/drawings/${drawingId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["drawings"],
    }),
  }),
});

export const {
  useAddDrawingMutation,
  useGetAllDrawingsQuery,
  useGetSingleDrawingQuery,
  useUpdateDrawingMutation,
  useDeleteDrawingMutation,
} = drawingApi;
