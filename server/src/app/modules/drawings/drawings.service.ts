import AppError from '../../errors/AppError';
import { IDrawing } from './drawings.interface';
import { Drawing } from './drawings.model';

const getAllDrawingsFromDB = async () => {
  try {
    return await Drawing.find();
  } catch (err) {
    throw new AppError(500, 'An error occurred while retrieving drawings');
  }
};

const getSingleDrawingFromDB = async (id: string) => {
  try {
    const drawing = await Drawing.findById(id);
    if (!drawing) throw new AppError(404, 'Drawing not found');
    return drawing;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(500, 'An error occurred while retrieving the drawing');
  }
};

const createDrawing = async (newDrawing: IDrawing) => {
  try {
    return await Drawing.create(newDrawing);
  } catch (err) {
    throw new AppError(500, 'An error occurred while creating the drawing');
  }
};

const updateDrawingFromDB = async (
  id: string,
  updatedDrawing: Partial<IDrawing>,
) => {
  try {
    const drawing = await Drawing.findByIdAndUpdate(id, updatedDrawing, {
      new: true,
    });
    if (!drawing) {
      throw new AppError(404, 'Drawing not found');
    }
    return drawing;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(500, 'An error occurred while updating the drawing');
  }
};

const deleteDrawingFromDB = async (id: string) => {
  try {
    const drawing = await Drawing.findByIdAndDelete(id);
    if (!drawing) {
      throw new AppError(404, 'Drawing not found');
    }
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(500, 'An error occurred while deleting the drawing');
  }
};

export const DrawingServices = {
  getAllDrawingsFromDB,
  getSingleDrawingFromDB,
  createDrawing,
  updateDrawingFromDB,
  deleteDrawingFromDB,
};
