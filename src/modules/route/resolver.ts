import { Resolvers } from '@/types/graphql.gen';

import {
  RouteModel,
  RouteCoordsModel,
  RoutePointModel,
  RoutePointUserModel,
} from '@/modules/route/model';

import { RoutePointType } from '@/types/mongodb.gen';

const resolver: Resolvers = {
  Mutation: {
    route: () => ({
      __typename: 'RouteMutation',
    }),
  },
  RouteMutation: {
    create: async (_, { input }, ctx) => {
      const newRoute = new RouteModel();
      newRoute.startPosition = new RouteCoordsModel(input.startPosition);
      newRoute.endPosition = new RouteCoordsModel(input.endPosition);
      newRoute.points = input.points.map(
        (point) =>
          new RoutePointModel({
            type: point.type,
            coords: new RouteCoordsModel(point.coords),
            user:
              point.type === RoutePointType.User
                ? new RoutePointUserModel({
                    _id: ctx.userId,
                  })
                : null,
          }),
      );

      const routeCollection = ctx.database.collection('routes');
      const { insertedId } = await routeCollection.insertOne(newRoute);
      const route = await routeCollection.findOne({ _id: insertedId });

      return {
        __typename: 'CreateRoutePayload',
        payload: RouteModel.serialize(route),
      };
    },
  },
};

export default resolver;
