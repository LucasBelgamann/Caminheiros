import { Pool, RowDataPacket } from "mysql2/promise";
import { IUser } from "../interfaces/IUser";
import { InactiveUser } from "../interfaces/InactiveUser";
import MeetingModel from "../models/MeetingModel";

class LoginModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAllUsers(groupId: number, userId: number): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      `SELECT id, name
      FROM caminheirosdb.Users
      WHERE id NOT IN (
        SELECT userId
        FROM caminheirosdb.Groups_has_users
        WHERE groupId = ?
      )
      AND id <> (
        SELECT userId
        FROM caminheirosdb.Groups
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
    role: "user" | "admin" | "manager"
  ): Promise<void> {
    console.log(name);
    await this.connection.execute(
      "INSERT INTO caminheirosdb.Users (name, phone, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [name, phone, email, password, role]
    );
  }

  public async insertUserInGroup(
    groupId: number,
    userId: number
  ): Promise<void> {
    await this.connection.execute(
      "INSERT INTO caminheirosdb.Groups_has_users (groupId, userId) VALUES (?, ?)",
      [groupId, userId]
    );

    const [rows] = await this.connection.execute(
      `
      SELECT M.*, G.name AS groupName
      FROM caminheirosdb.Meetings AS M
      JOIN caminheirosdb.Groups AS G ON M.groupId = G.id
      WHERE M.groupId = ? AND M.created_at >= DATE_SUB(NOW(), INTERVAL 2 HOUR)
      AND DATE(M.created_at) = DATE(NOW());
      `,
      [groupId]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      const firstMeeting = rows[0] as RowDataPacket;
      const meetingId = firstMeeting.id;

      await this.connection.execute(
        `INSERT INTO caminheirosdb.Meetings_has_users (meetingsId, userId, frequency) VALUES (?, ?, ?)`,
        [meetingId, userId, false]
      );
    }
  }

  public async deleteUserInGroup(
    groupId: number,
    userId: number
  ): Promise<void> {
    await this.connection.execute(
      `DELETE FROM caminheirosdb.Groups_has_users
      WHERE groupId = ? AND userId = ?;
      `,
      [groupId, userId]
    );

    const [rows] = await this.connection.execute(
      `
      SELECT M.*, G.name AS groupName
      FROM caminheirosdb.Meetings AS M
      JOIN caminheirosdb.Groups AS G ON M.groupId = G.id
      WHERE M.groupId = ? AND M.created_at >= DATE_SUB(NOW(), INTERVAL 2 HOUR)
      AND DATE(M.created_at) = DATE(NOW());
      `,
      [groupId]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      const firstMeeting = rows[0] as RowDataPacket;
      const meetingId = firstMeeting.id;

      await this.connection.execute(
        `DELETE FROM caminheirosdb.Meetings_has_users WHERE meetingsId = ? AND userId = ?;`,
        [meetingId, userId]
      );
    }
  }

  public async findUserByEmailAndPassword(
    email: string
  ): Promise<IUser | null> {
    const [result] = await this.connection.execute(
      `
      SELECT * FROM caminheirosdb.Users
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

  public async getInativeUsers(seu_grupo_id: number): Promise<InactiveUser[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `
      SELECT
          u.id AS user_id,
          u.name AS user_name,
          u.phone AS user_phone,
          COUNT(*) AS missed_meetings_count
      FROM
          caminheirosdb.Meetings_has_users AS mu
      JOIN
          caminheirosdb.Groups_has_users AS gu ON mu.userId = gu.userId
      JOIN
          caminheirosdb.Users AS u ON gu.userId = u.id
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
      [seu_grupo_id]
    );

    return result as InactiveUser[];
  }
}

export default LoginModel;
