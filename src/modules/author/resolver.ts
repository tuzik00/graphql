import authors from './data';
import { QueryResolvers } from '@/types/graphql.gen';

export default {
  Query: {
    author: () => authors,
  },
} as QueryResolvers;
