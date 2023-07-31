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
}

export default GroupModel;
