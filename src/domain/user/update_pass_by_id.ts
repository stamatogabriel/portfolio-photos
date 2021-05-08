import { Inject, Injectable } from '@nestjs/common';
import { User } from './user';
import { IUserRepository } from './user.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class UpdatePassById {
  constructor(@UserRepo() private readonly userRespository: IUserRepository) {}

  public async updatePassById(id: string, user: Partial<User>): Promise<User> {
    return await this.userRespository.UpdatePassById(id, user);
  }
}
