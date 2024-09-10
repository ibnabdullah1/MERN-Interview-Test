import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DrawingServices } from './drawings.service';

const getAllDrawings = catchAsync(async (_req, res) => {
  const drawings = await DrawingServices.getAllDrawingsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Drawings retrieved successfully',
    data: drawings,
  });
});

const getSingleDrawing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const drawing = await DrawingServices.getSingleDrawingFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Drawing retrieved successfully',
    data: drawing,
  });
});

const createDrawing = catchAsync(async (req, res) => {
  const newDrawing = req.body;
  const drawing = await DrawingServices.createDrawing(newDrawing);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Drawing created successfully',
    data: drawing,
  });
});

const updateDrawing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedDrawing = req.body;
  const drawing = await DrawingServices.updateDrawingFromDB(id, updatedDrawing);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Drawing updated successfully',
    data: drawing,
  });
});

const deleteDrawing = catchAsync(async (req, res) => {
  const { id } = req.params;
  await DrawingServices.deleteDrawingFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Drawing deleted successfully',
    data: null,
  });
});
export const DrawingControllers = {
  getAllDrawings,
  getSingleDrawing,
  deleteDrawing,
  updateDrawing,
  createDrawing,
};
