import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import resolvers from './resolver';

const typeDefs = loadFilesSync(join(__dirname, './typeDefs/*.graphql'));

export { typeDefs, resolvers };
