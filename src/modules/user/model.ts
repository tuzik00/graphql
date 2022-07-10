import { UserDbObject } from '@/types/mongodb.gen';
import { User } from '@/types/graphql.gen';

import { ObjectId } from 'mongodb';

export class UserModel implements UserDbObject {
  _id;
  firstName;
  lastName;
  email;

  static serialize(user: UserDbObject) {
    const userModel = new UserModel(user);

    return {
      __typename: 'User',
      ...userModel,
    } as User;
  }

  constructor(params?: UserDbObject) {
    this._id = new ObjectId();
    this.firstName = params.firstName || '';
    this.lastName = params.lastName || '';
    this.email = params.email || '';
  }
}
