import { ObjectId } from 'mongodb';
import { ApolloError } from 'apollo-server-core';
import { Resolvers } from '@/types/graphql.gen';
import { UserModel } from './model';

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
        ...UserModel.serialize(user),
      };
    },
  },
  Mutation: {
    user: () => ({
      __typename: 'UserMutation',
    }),
  },
  UserMutation: {
    create: async (_, { input }, ctx) => {
      try {
        const newUser = new UserModel({
          ...input,
          _id: new ObjectId(),
        });

        const userCollection = ctx.database.collection('users');
        const { insertedId } = await userCollection.insertOne(newUser);

        const user = await userCollection.findOne({ _id: insertedId });

        return {
          __typename: 'CreateUserPayload',
          payload: UserModel.serialize(user),
        };
      } catch (e) {
        throw new ApolloError('Insert user error!');
      }
    },
  },
};

export default resolver;
