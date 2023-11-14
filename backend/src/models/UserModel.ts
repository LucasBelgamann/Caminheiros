import { Pool, RowDataPacket } from "mysql2/promise";
import { IUser } from "../interfaces/IUser";
import { InactiveUser } from "../interfaces/InactiveUser";

class LoginModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAllUsers(): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      `SELECT id, name, role FROM railway.Users`
    );

    return result as any as IUser[];
  }

  async getUserById(userId: number): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      `SELECT id, name, email, phone FROM railway.Users WHERE id = ?`,
      [userId]
    );

    return result as any as IUser[];
  }

  async getUsersExcludedFromGroup(
    groupId: number,
    userId: number
  ): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      `SELECT id, name
      FROM railway.Users
      WHERE id NOT IN (
        SELECT userId
        FROM railway.Groups_has_users
        WHERE groupId = ?
      )
      AND id <> (
        SELECT userId
        FROM railway.Groups
        WHERE id = ?
      ) AND id <> ?`,
      [groupId, groupId, userId]
    );

    return result as any as IUser[];
  }

  async getUsersInGroup(groupId: number): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      `
      SELECT u.*
      FROM railway.Users u
      INNER JOIN railway.Groups_has_users gu ON u.id = gu.userId
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
    role: "user" | "admin" | "manager"
  ): Promise<void> {
    console.log(name);
    await this.connection.execute(
      "INSERT INTO railway.Users (name, phone, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [name, phone, email, password, role]
    );
  }

  public async insertUserInGroup(
    groupId: number,
    userId: number
  ): Promise<void> {
    await this.connection.execute(
      "INSERT INTO railway.Groups_has_users (groupId, userId) VALUES (?, ?)",
      [groupId, userId]
    );

    const [rows] = await this.connection.execute(
      `
      SELECT M.*, G.name AS groupName
      FROM railway.Meetings AS M
      JOIN railway.Groups AS G ON M.groupId = G.id
      WHERE M.groupId = ? AND M.created_at >= DATE_SUB(NOW(), INTERVAL 2 HOUR)
      AND DATE(M.created_at) = DATE(NOW());
      `,
      [groupId]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      const firstMeeting = rows[0] as RowDataPacket;
      const meetingId = firstMeeting.id;

      await this.connection.execute(
        `INSERT INTO railway.Meetings_has_users (meetingsId, userId, frequency) VALUES (?, ?, ?)`,
        [meetingId, userId, false]
      );
    }
  }

  public async deleteUserInGroup(
    groupId: number,
    userId: number
  ): Promise<void> {
    await this.connection.execute(
      `DELETE FROM railway.Groups_has_users
      WHERE groupId = ? AND userId = ?;
      `,
      [groupId, userId]
    );

    const [rows] = await this.connection.execute(
      `
      SELECT M.*, G.name AS groupName
      FROM railway.Meetings AS M
      JOIN railway.Groups AS G ON M.groupId = G.id
      WHERE M.groupId = ? AND M.created_at >= DATE_SUB(NOW(), INTERVAL 2 HOUR)
      AND DATE(M.created_at) = DATE(NOW());
      `,
      [groupId]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      const firstMeeting = rows[0] as RowDataPacket;
      const meetingId = firstMeeting.id;

      await this.connection.execute(
        `DELETE FROM railway.Meetings_has_users WHERE meetingsId = ? AND userId = ?;`,
        [meetingId, userId]
      );
    }
  }

  public async findUserByEmailAndPassword(
    email: string
  ): Promise<IUser | null> {
    const [result] = await this.connection.execute(
      `
      SELECT * FROM railway.Users
      WHERE email = ?;
      `,
      [email]
    );

    if (!Array.isArray(result) || result.length === 0) {
      return null;
    }

    const user = result[0] as RowDataPacket;

    if (typeof user.password !== "string") {
      return null;
    }

    return user as IUser;
  }

  public async getInativeUsers(groupId: number): Promise<any[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `
      SELECT
          u.id AS user_id,
          u.name AS user_name,
          u.phone AS user_phone,
          COUNT(*) AS missed_meetings_count
      FROM
          railway.Meetings_has_users AS mu
      JOIN
          railway.Groups_has_users AS gu ON mu.userId = gu.userId
      JOIN
          railway.Users AS u ON gu.userId = u.id
      WHERE
          gu.groupId = ?
          AND mu.created_at >= DATE_SUB(CURDATE(), INTERVAL 60 DAY)
          AND (mu.frequency = 0 OR mu.frequency = false)
      GROUP BY
          u.id,
          u.name,
          u.phone
      HAVING
          missed_meetings_count >= 6;
      `,
      [groupId]
    );

    return result as any[];
  }

  public async updateUserDetails(
    userId: number,
    phone: string,
    email: string
  ): Promise<void> {
    try {
      await this.connection.execute(
        "UPDATE railway.Users SET phone = ?, email = ? WHERE id = ?",
        [phone, email, userId]
      );
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  }

  public async updateUserPassword(
    password: string,
    userId: number
  ): Promise<void> {
    try {
      await this.connection.execute(
        "UPDATE railway.Users SET password = ? WHERE id = ?",
        [password, userId]
      );
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  }

  public async createPasswordResetToken(
    userId: any,
    token: string,
    expiration: Date
  ): Promise<void> {
    try {
      await this.connection.execute(
        "INSERT INTO railway.PasswordResetTokens (userId, token, expiration) VALUES (?, ?, ?) " +
        "ON DUPLICATE KEY UPDATE token = VALUES(token), expiration = VALUES(expiration)",
        [userId, token, expiration]
      );
    } catch (error) {
      console.error("Error creating or updating token", error);
      throw error;
    }
  }

  public async findUserByPasswordResetToken(
    token: string
  ): Promise<IUser | null> {
    try {
      const [rows] = await this.connection.execute(
        `SELECT * FROM railway.Users
       WHERE id = (
         SELECT userId FROM railway.PasswordResetTokens
         WHERE token = ? AND NOW() <= expiration);`,
        [token]
      );

      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as IUser;
      }

      return null;
    } catch (error) {
      console.error(
        "Erro ao procurar usuário por token de redefinição de senha",
        error
      );
      throw error;
    }
  }

  public async clearPasswordResetToken(token: string): Promise<void> {
    try {
      await this.connection.execute(
        `DELETE FROM railway.PasswordResetTokens
       WHERE token = ?;`,
        [token]
      );
    } catch (error) {
      console.error("Erro ao deletar o token.", error);
      throw error;
    }
  }
}

export default LoginModel;
