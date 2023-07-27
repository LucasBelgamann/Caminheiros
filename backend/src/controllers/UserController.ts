import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  constructor(private userService = new UserService()) {}

  public getAllUsers = async (_req: Request, res: Response) => {
    const result = await this.userService.getAllUsers();

    return res.status(200).json(result);
  };

  public getUsersInGroup = async (req: Request, res: Response) => {
    const groupId = req.params.id;

    const result = await this.userService.getUsersInGroup(Number(groupId))

    return res.status(200).json(result);
  };
}

export default UserController;
