import { Resolvers } from '@/types/graphql.gen';
import { GraphQLEmailAddress } from './scalars/Email';

const resolver: Resolvers = {
  Email: GraphQLEmailAddress,
};

export default resolver;
