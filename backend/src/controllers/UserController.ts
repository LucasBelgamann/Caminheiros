import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  constructor(private userService = new UserService()) {}

  public getAllUsers = async (_req: Request, res: Response) => {
    const result = await this.userService.getAllUsers();
    return res.status(200).json(result);
  };

  public getUsersInGroup = async (req: Request, res: Response) => {
    const groupId = Number(req.params.id);

    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid groupId." });
    }

    const result = await this.userService.getUsersInGroup(groupId);
    return res.status(200).json(result);
  };

  public createUser = async (req: Request, res: Response) => {
    const body = req.body;

    if (!body.name || !body.phone || !body.email || !body.password || !body.role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      await this.userService.createUser(
        body.name,
        body.phone,
        body.email,
        body.password,
        body.role
      );

      return res.status(200).json({ message: "User created successfully." });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Failed to create user." });
    }
  };

  public insertUserInGroup = async (req: Request, res: Response) => {
    const groupId = Number(req.params.groupId);
    const userId = Number(req.params.userId);

    if (isNaN(groupId) || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid groupId or userId." });
    }

    try {
      await this.userService.insertUserInGroup(groupId, userId);
      return res.status(200).json({ message: "User entered successfully." });
    } catch (error) {
      console.error("Error inserting user in group:", error);
      return res.status(500).json({ message: "Failed to insert user in group." });
    }
  };
}

export default UserController;
