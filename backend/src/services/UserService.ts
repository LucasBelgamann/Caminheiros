import { IUser } from '../interface/IUser';
import connection from '../models/Connection';
import UserModel from '../models/User.model';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAll(): Promise<IUser[]> {
    const result = await this.model.getAll();
    return result;
  }
}

export default UserService;