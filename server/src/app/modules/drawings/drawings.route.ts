import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DrawingControllers } from './drawings.controller';
import {
  drawingUpdateValidationSchema,
  drawingValidationSchema,
} from './drawings.validation';

const router = Router();

router.post(
  '/drawings',
  validateRequest(drawingValidationSchema),
  DrawingControllers.createDrawing,
);

router.get('/drawings/:id', DrawingControllers.getSingleDrawing);

router.get('/drawings', DrawingControllers.getAllDrawings);

router.put(
  '/drawings/:id',
  validateRequest(drawingUpdateValidationSchema),
  DrawingControllers.updateDrawing,
);

router.delete('/drawings/:id', DrawingControllers.deleteDrawing);

export const DrawingRoutes = router;
