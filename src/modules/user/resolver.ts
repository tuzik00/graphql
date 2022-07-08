import { ObjectId } from 'mongodb';
import { ApolloError } from 'apollo-server-core';
import { Resolvers } from '@/types/graphql.gen';
import UserModel from './model';

const resolver: Resolvers = {
  Query: {
    user: async (_, {}, ctx) => {
      const userId = ctx.userId;
      const userCollection = ctx.database.collection('users');
      const user = await userCollection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return null;
      }

      return {
        __typename: 'User',
        id: user._id.toHexString(),
        firstName: user.firstName,
        lastname: user.lastname,
        email: user.email,
      };
    },
  },
  Mutation: {
    user: () => ({
      __typename: 'UserMutation',
    }),
  },
  UserMutation: {
    create: async (_, { user }, ctx) => {
      try {
        const newUser = new UserModel(user);
        const userCollection = ctx.database.collection('users');

        await userCollection.insertOne(newUser);

        return {
          __typename: 'CreateUserPayload',
          payload: {
            __typename: 'User',
            id: newUser._id.toHexString(),
            firstName: newUser.firstName,
            lastname: newUser.lastname,
            email: newUser.email,
          },
        };
      } catch (e) {
        throw new ApolloError('Insert user error!');
      }
    },
  },
};

export default resolver;
