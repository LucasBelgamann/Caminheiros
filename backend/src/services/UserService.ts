import { IUser } from "../interfaces/IUser";
import connection from "../models/connection";
import UserModel from "../models/UserModel";

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAllUsers(): Promise<IUser[]> {
    const result = await this.model.getAllUsers();
    return result;
  }

  public async getUsersInGroup(groupId: number): Promise<Array<IUser>> {
    const result = await this.model.getUsersInGroup(groupId);
    return result;
  }
}

export default UserService;