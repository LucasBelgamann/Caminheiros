import express, { Request, Response } from "express";
import userRoutes from './routes/UserRoutes';
import meetingsUser from './routes/mettingRoutes';
import groupRoutes from './routes/groupRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/meetings', meetingsUser);
app.use('/groups', groupRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Olá Mundo!");
});

export default app;