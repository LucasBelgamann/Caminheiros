import { Pool } from 'mysql2/promise';
import { IUser } from '../interface/IUser'

class LoginModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getLogin(email: string, password: string): Promise<IUser[]> {
    const [result] = await this.connection.execute(
      'SELECT * FROM caminheiros.Users WHERE email = ? AND password = ?',
      [email, password],
    );
    
    return result as any as IUser[];
  }
}

export default LoginModel;