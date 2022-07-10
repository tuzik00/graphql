import { createServer } from '@graphql-yoga/node';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import { GraphQLContext } from './types/context';

export default async (modules, { database }) => {
  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(modules.map((module) => module.typeDefs)),
    resolvers: mergeResolvers(
      modules.map((module) => module.resolvers),
    ) as never,
  });

  const yogaApp = createServer<Record<string, any>, GraphQLContext>({
    schema,
    graphiql: {
      subscriptionsProtocol: 'WS',
    },
    context: async () => {
      return {
        userId: '62ca964cf94764a5ef60152d',
        database,
      };
    },
  });

  const httpServer = await yogaApp.start();

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: yogaApp.getAddressInfo().endpoint,
  });

  useServer(
    {
      execute: (args: any) => args.rootValue.execute(args),
      subscribe: (args: any) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          yogaApp.getEnveloped(ctx);

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        };

        const errors = validate(args.schema, args.document);

        if (errors.length) {
          return errors;
        }

        return args;
      },
    },
    wsServer,
  );
};
