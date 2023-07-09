import { Pool, ResultSetHeader, FieldPacket, RowDataPacket } from "mysql2/promise";
import { IUser } from "../interface/IUser";

class LoginModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getLogin(email: string, password: string): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      "SELECT * FROM caminheiros.Users WHERE email = ? AND password = ?",
      [email, password]
    );

    return result as any as IUser[];
  }

  public async getAll(): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      "SELECT * FROM caminheirosdb.Users",
    );

    return result as any as IUser[];
  }

  public async create(
    name: string,
    phone: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const [result]: [ResultSetHeader, FieldPacket[]] =
      await this.connection.execute(
        "INSERT INTO caminheiros.Users (name, phone, email, password) VALUES (?, ?, ?, ?)",
        [name, phone, email, password]
      );

    const insertId: number = result.insertId;
    return { id: insertId, name, phone, email, password, role: "user" };
  }

  public async getUsersByGroupId(groupId: number): Promise<IUser[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.connection.execute(
      'SELECT u.* FROM caminheirosdb.Users AS u JOIN caminheirosdb.Groups_has_users AS gu ON u.id = gu.userId WHERE gu.groupId = ?',
      [groupId],
    );
  
    const users: IUser[] = rows.map((row: RowDataPacket) => {
      return {
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email,
      };
    });
  
    return users;
  }

  public async getUsersWithTrueFrequency(date: string): Promise<IUser[]> {
    const query = `
      SELECT u.*
      FROM caminheirosdb.Users AS u
      JOIN caminheirosdb.Meetings_has_users AS mu ON u.id = mu.userId
      JOIN caminheirosdb.Meetings AS m ON m.id = mu.meetingsId
      WHERE m.date = ? AND mu.frequency = true;
    `;
  
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.connection.execute(query, [date]);
  
    const users: IUser[] = rows.map((row: RowDataPacket) => {
      return {
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email,
      };
    });
  
    return users;
  }

  public async insertUserInGroup(groupId: number, userId: number): Promise<void> {
    await this.connection.execute(
      "INSERT INTO caminheiros.Group_has_users (groupId, userId) VALUES (?, ?)",
      [groupId, userId]
    );
  }
}

export default LoginModel;
