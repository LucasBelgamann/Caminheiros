import { Request, Response } from "express";
import LoginService from "../services/UserService";

class UserController {
  constructor(private LoginServicee = new LoginService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.LoginServicee.getAll();

    return res.status(200).json(result);
  };
}

export default UserController;
