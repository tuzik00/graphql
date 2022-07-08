import { Db } from 'mongodb';

export interface GraphQLContext {
  database: Db;
}
