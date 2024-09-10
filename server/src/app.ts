import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { DrawingRoutes } from './app/modules/drawings/drawings.route';

// Express App Initializations
const app: Application = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://altium-whiteboard.vercel.app',
    ],
    credentials: true,
  }),
);

// Parser
app.use(express.json());

// Routes
app.use('/api/v1', DrawingRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Whiteboard Application Server Running !',
  });
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
