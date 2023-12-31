import { Request, Response } from "express";
import UserService from "../services/UserService";
import { hash } from "bcryptjs";

class UserController {
  constructor(private userService = new UserService()) {}

  public getAllUsers = async (_req: Request, res: Response) => {
    const result = await this.userService.getAllUsers();
    return res.status(200).json(result);
  };

  public getUserById = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const result = await this.userService.getUserById(userId);
    return res.status(200).json(result);
  };

  public getUsersExcludedFromGroup = async (req: Request, res: Response) => {
    const groupId = Number(req.params.id);
    const userId = Number(req.params.userId);
    console.log(groupId);
    const result = await this.userService.getUsersExcludedFromGroup(
      groupId,
      userId
    );
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
    const userData = Array.isArray(req.body) ? req.body : [req.body];

    try {
      for (const userObject of userData) {
        const { name, phone, email, password, role } = userObject;

        if (!name || !phone || !email || !password || !role) {
          return res
            .status(400)
            .json({ message: "Todos os campos são obrigatórios." });
        }

        const existingUser = await this.userService.findUserByEmailAndPassword(
          email
        );
        if (existingUser) {
          return res
            .status(400)
            .json({ message: "Já existe um usuário com o seguinte email." });
        }

        const hashedPassword = await hash(password, 10);

        await this.userService.createUser(
          name,
          phone,
          email,
          hashedPassword,
          role
        );
      }

      return res.status(200).json({ message: "Usuários criados com sucesso." });
    } catch (error) {
      console.error("Erro durante a criação de usuário:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
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

  public deleteUserInGroup = async (req: Request, res: Response) => {
    const groupId = Number(req.params.groupId);
    const userId = Number(req.params.userId);

    if (isNaN(groupId) || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid groupId or userId." });
    }

    try {
      await this.userService.deleteUserInGroup(groupId, userId);
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user in group:", error);
      return res
        .status(500)
        .json({ message: "Failed to delete user in group." });
    }
  };

  public getInativeUsers = async (req: Request, res: Response) => {
    const groupId = Number(req.params.id);
    const result = await this.userService.getInativeUsers(groupId);
    return res.status(200).json(result);
  };

  public updateUserDetails = async (req: Request, res: Response) => {
    const { userId, phone, email } = req.body;

    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuário inválido." });
    }

    try {
      await this.userService.updateUserDetails(userId, phone, email);
      return res
        .status(200)
        .json({ message: "Dados atualizados com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Falha ao atualizar dadoa." });
    }
  };
}

export default UserController;
