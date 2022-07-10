import { UserDbObject } from '@/types/mongodb.gen';
import { User } from '@/types/graphql.gen';

import { ObjectId } from 'mongodb';

export class UserModel implements UserDbObject {
  __typename;
  _id;
  firstName;
  lastName;
  email;

  static serialize(user: UserDbObject) {
    return new UserModel(user) as User;
  }

  constructor(params?: UserDbObject) {
    this.__typename = 'User';

    this._id = new ObjectId(params._id);
    this.firstName = params.firstName || '';
    this.lastName = params.lastName || '';
    this.email = params.email || '';
  }
}
