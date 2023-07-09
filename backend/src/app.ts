import express, { Request, Response } from "express";
import usersRoutes from './routes/usersRoutes';

const app = express();

app.use(express.json());

app.use('/users', usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Olá Mundo!");
});

export default app;
// ladys and gentlemans
