import express, { Request, Response } from "express";
import userRoutes from './routes/UserRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Olá Mundo!");
});

export default app;