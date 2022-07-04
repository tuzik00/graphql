import { createServer } from '@graphql-yoga/node';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

export default async (modules) => {
  const server = createServer({
    port: parseInt(process.env.PORT),
    schema: buildSubgraphSchema({
      typeDefs: mergeTypeDefs(modules.map((module) => module.typeDefs)),
      resolvers: mergeResolvers(
        modules.map((module) => module.resolvers),
      ) as never,
    }),
  });

  await server.start();
};
