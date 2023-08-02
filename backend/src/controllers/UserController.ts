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

    const result = await this.userService.getUsersInGroup(Number(groupId));

    return res.status(200).json(result);
  };

  public createUser = async (req: Request, res: Response) => {
    const body = req.body;

    await this.userService.createUser(
      body.name,
      body.phone,
      body.email,
      body.password,
      body.role
    );

    return res.status(200).json({ message: "User created successfully." });
  };

  public insertUserInGroup = async (req: Request, res: Response) => {
    const groupId = Number(req.params.groupId);
    const userId = Number(req.params.userId);

    await this.userService.insertUserInGroup(groupId, userId);

    return res.status(200).json({ message: "User entered successfully." });
  };
}

export default UserController;
