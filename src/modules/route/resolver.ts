import { Resolvers } from '@/types/graphql.gen';
import RouteModel from '@/modules/route/model';

const resolver: Resolvers = {
  Mutation: {
    route: () => ({
      __typename: 'RouteMutation',
    }),
  },
  RouteMutation: {
    create: async (_, { input }, ctx) => {
      const routeModel = new RouteModel(input);
      const routeCollection = ctx.database.collection('route');

      const { insertedId } = await routeCollection.insertOne(routeModel);
      const route = await routeCollection.findOne({ _id: insertedId });

      return {
        __typename: 'CreateRoutePayload',
        payload: {
          __typename: 'Route',
          id: route._id.toHexString(),
          startPosition: {
            __typename: 'RouteCoords',
            latitude: route.startPosition.latitude,
            longitude: route.startPosition.longitude,
          },
          endPosition: {
            __typename: 'RouteCoords',
            latitude: route.endPosition.latitude,
            longitude: route.endPosition.longitude,
          },
          points: route?.points.map((point) => ({
            __typename: 'RoutePoint',
            ...point,
          })),
        },
      };
    },
  },
};

export default resolver;
