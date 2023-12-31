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
    studyDays: string,
    hour: string,
    modality: string,
    userId: number
  ): Promise<void> {
    await this.connection.execute(
      "INSERT INTO caminheirosdb.Groups (name, description, studyDays, hour, modality, userId) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, studyDays, hour, modality, userId]
    );
  }

  public async createWarning(
    description: string,
    groupId: number
  ): Promise<any[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `
      INSERT INTO caminheirosdb.Warnings (description, groupId)
      VALUES (?, ?);    
  `,
      [description, groupId]
    );

    return result;
  }

  public async deleteWarning(id: number): Promise<void> {
    await this.connection.execute<RowDataPacket[]>(
      `
      DELETE FROM caminheirosdb.Warnings WHERE id = ?;      
  `,
      [id]
    );
  }

  public async getWarnings(groupId: number): Promise<any[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `
      SELECT * FROM caminheirosdb.Warnings WHERE groupId = ?;      
  `,
      [groupId]
    );
    return result;
  }
}

export default GroupModel;
