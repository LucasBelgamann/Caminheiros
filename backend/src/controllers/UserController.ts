import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  constructor(private userService = new UserService()) {}

  public getAllUsers = async (_req: Request, res: Response) => {
    const result = await this.userService.getAllUsers();

    return res.status(200).json(result);
  };

  async getUsersByGroupId(req: Request, res: Response) {
    const groupId = req.params.id;

    try {
      const users = await this.userService.getUsersInGroup(Number(groupId));
      res.status(200).json(users);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UserController;
