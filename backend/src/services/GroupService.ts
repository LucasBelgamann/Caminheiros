import connection from "../models/connection";
import GroupModel from "../models/GroupModel";

class GroupService {
  public model: GroupModel;

  constructor() {
    this.model = new GroupModel(connection);
  }

  public async getGroupsByOwnerId(userId: number): Promise<any> {
    const result = await this.model.getGroupsByOwnerId(userId);
    return result;
  }
}

export default GroupService;
