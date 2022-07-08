import { ObjectId } from 'mongodb';
import { UserDbObject } from '@/types/mongodb.gen';
import { UserInput } from '@/types/graphql.gen';

class User implements UserDbObject {
  _id;
  firstName;
  lastname;
  email;

  constructor(params: UserInput) {
    this._id = new ObjectId();
    this.firstName = params.firstname || '';
    this.lastname = params.lastname || '';
    this.email = params.email || '';
  }
}

export default User;
