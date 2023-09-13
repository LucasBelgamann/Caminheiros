import { Connection, RowDataPacket } from "mysql2/promise";
import { IGroup } from "../interfaces/IGroup";

class GroupModel {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async getGroupsByOwnerId(userId: number): Promise<any[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `
    SELECT g.*
    FROM caminheirosdb.Groups AS g
    JOIN caminheirosdb.Users AS u ON g.userId = u.id
    WHERE u.id = ?;
  `,
      [userId]
    );

    return result;
  }

  public async getGroupsByUserId(userId: number): Promise<any[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `
    SELECT g.*
    FROM caminheirosdb.Groups AS g
    JOIN caminheirosdb.Groups_has_users AS gu ON g.id = gu.groupId
    WHERE gu.userId = ?;
  `,
      [userId]
    );

    return result;
  }

  public async getAllGroups(userId: number): Promise<any[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `
      SELECT *
      FROM caminheirosdb.Groups
      WHERE id NOT IN (SELECT groupId FROM caminheirosdb.Groups_has_users WHERE userId = ?);      
  `,
      [userId]
    );

    return result;
  }

  public async createGroup(
    name: string,
    description: string,
    hour: string,
    modality: string,
    userId: number
  ): Promise<void> {
    await this.connection.execute(
      "INSERT INTO caminheirosdb.Users (name, description, hour, modality, userId) VALUES (?, ?, ?, ?, ?)",
      [name, description, hour, modality, userId]
    );
  }
}

export default GroupModel;
