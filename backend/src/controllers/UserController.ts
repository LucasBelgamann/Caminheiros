import { Request, Response } from "express";
import UserService from "../services/UserService";
import { compare, hash } from "bcryptjs";

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
    const { name, phone, email, password, role } = req.body;

    try {
      const hashedPassword = await hash(password, 10);

      await this.userService.createUser(
        name,
        phone,
        email,
        hashedPassword,
        role
      );

      return res.status(200).json({ message: "User created successfully." });
    } catch (error) {
      console.error("Error during user creation:", error);
      return res.status(500).json({ message: "Internal server error." });
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
      return res
        .status(500)
        .json({ message: "Failed to insert user in group." });
    }
  };

  public login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.userService.findUserByEmailAndPassword(email);
    return res.status(200).json(user);
  };

  public auth = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
  
      const user = await this.userService.findUserByEmailAndPassword(email);
  
      if (!user) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      const isPasswordValid = await compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;
