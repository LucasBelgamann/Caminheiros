import { Pool } from "mysql2/promise";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";

class LoginModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAllUsers(): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      `SELECT * FROM caminheirosdb.Users`
    );

    return result as any as IUser[];
  }

  async getUsersInGroup(groupId: number): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      `
      SELECT u.*
      FROM caminheirosdb.Users u
      INNER JOIN caminheirosdb.Groups_has_users gu ON u.id = gu.userId
      WHERE gu.groupId = ?
    `,
      [groupId]
    );

    return result as any as IUser[];
  }

  public async createUser(
    name: string,
    phone: string,
    email: string,
    password: string,
    role: "user" | "admin"
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.connection.execute(
      "INSERT INTO users (name, phone, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [name, phone, email, hashedPassword, role]
    );
  }

  public async insertUserInGroup(
    groupId: number,
    userId: number
  ): Promise<void> {
    await this.connection.execute(
      "INSERT INTO caminheiros.Group_has_users (groupId, userId) VALUES (?, ?)",
      [groupId, userId]
    );
  }
}

export default LoginModel;
