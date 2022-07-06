import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import cors from 'cors';

export default async (modules) => {
  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(modules.map((module) => module.typeDefs)),
    resolvers: mergeResolvers(
      modules.map((module) => module.resolvers),
    ) as never,
  });

  const app = express();
  app.use(cors());

  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  httpServer.listen(process.env.PORT);
};
