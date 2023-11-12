import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { createToken, validateToken } from "../utils/token";
import LoginService from "../services/LoginService";

class LoginController {
  constructor(private loginController = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.loginController.findUserByEmailAndPassword(email);
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

      const user = await this.loginController.findUserByEmailAndPassword(email);

      if (!user) {
        return res.status(401).json({ message: "Senha ou email incorretos" });
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        console.log(password, user.password);
        return res.status(401).json({ message: "Senha inválida" });
      }

      const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      const token = createToken(payload);

      return res.status(200).json({ ...payload, token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  public checkTokenValidity = (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token || token === "") {
      return res.status(401).json({ message: "Token não encontrado" });
    }

    try {
      const decodedToken: any = validateToken(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
        return res.status(401).json({ message: "Sessão expirada, faça login novamente" });
      }

      return res.status(200).json({ isValid: true });
    } catch (error) {
      return res.status(401).json({ message: "Erro na verificação." });
    }
  };

  public sendPasswordResetEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      if (!email) {
        return res
          .status(400)
          .json({ message: "O campo de e-mail deve ser preenchido." });
      }

      const existingUser = await this.loginController.findUserByEmailAndPassword(
        email
      );

      if (!existingUser) {
        return res.status(400).json({ message: "Usuário não encontrado." });
      }

      const token = crypto.randomBytes(20).toString("hex");

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);

      const userId = existingUser.id;

      await this.loginController.createPasswordResetToken(
        userId,
        token,
        expiration
      );

      const resetLink = `http://localhost:9000/#/password?token=${token}`;

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

  public updateUserPassword = async (req: Request, res: Response) => {
    const { password, token } = req.body;

    try {
      const user = await this.loginController.findUserByPasswordResetToken(token);

      console.log("Esse é o token", token);
      console.log("Esse é o user", user);

      if (!user) {
        return res.status(400).json({
          message: "Token de redefinição de senha inválido ou expirado.",
        });
      }

      const hashedPassword = await hash(password, 10);
      await this.loginController.updateUserPassword(hashedPassword, user.id);

      await this.loginController.clearPasswordResetToken(token);

      return res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      return res.status(500).json({ message: "Falha ao atualizar a senha." });
    }
  };
}

export default LoginController;
