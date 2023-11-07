import { Request, Response } from "express";
import UserService from "../services/UserService";
import { compare, hash } from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

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

  public login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.userService.findUserByEmailAndPassword(email);
    return res.status(200).json(user);
  };

  public auth = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Todos os campos devem ser preenchidos" });
      }

      const user = await this.userService.findUserByEmailAndPassword(email);

      if (!user) {
        return res.status(401).json({ message: "Senha ou email incorretos" });
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        console.log(password, user.password);
        return res.status(401).json({ message: "Senha inválida" });
      }

      const result = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
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
        .json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Falha ao atualizar usuário." });
    }
  };

  public updateUserPassword = async (req: Request, res: Response) => {
    const { password, userId } = req.body;

    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuário inválido." });
    }

    try {
      const hashedPassword = await hash(password, 10);
      await this.userService.updateUserPassword(hashedPassword, userId);
      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      return res.status(500).json({ message: "Falha ao atualizar senha." });
    }
  };

  public sendPasswordResetEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const existingUser = await this.userService.findUserByEmailAndPassword(
        email
      );

      if (!existingUser) {
        return res.status(400).json({ message: "Usuário não encontrado." });
      }

      const token = crypto.randomBytes(20).toString("hex");
      const resetLink = `http://seusite.com/reset-password?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: "Hotmail",
        auth: {
          user: "caminheirosDoBem1@hotmail.com",
          pass: "caminheiros0523",
        },
      });

      const mailOptions = {
        from: "caminheirosDoBem1@hotmail.com",
        to: email,
        subject: "Solicitação de Redefinição de Senha",
        text: `Clique no link a seguir para redefinir sua senha: ${resetLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            message: "Erro ao enviar o e-mail de redefinição de senha",
          });
        } else {
          console.log(`E-mail de redefinição de senha enviado para: ${email}`);
          return res.status(200).json({
            message: "E-mail de redefinição de senha enviado com sucesso",
          });
        }
      });
    } catch (error) {
      console.error(
        "Erro durante o envio de e-mail de redefinição de senha:",
        error
      );
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
}

export default UserController;
