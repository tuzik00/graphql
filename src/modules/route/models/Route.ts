import { ObjectId } from 'mongodb';

import {
  RouteCoordsDbObject,
  RouteDbObject,
  RoutePointDbObject,
} from '@/types/mongodb.gen';

import { Route } from '@/types/graphql.gen';
import { RouteCoordsModel, RoutePointModel } from '.';

class RouteModel implements RouteDbObject {
  _id;
  startPosition: RouteCoordsDbObject;
  endPosition: RouteCoordsDbObject;
  points: RoutePointDbObject[];

  static serialize(route: RouteDbObject) {
    const routeModel = new RouteModel(route);

    return {
      __typename: 'Route',
      ...routeModel,
      startPosition: RouteCoordsModel.serialize(routeModel.startPosition),
      endPosition: RouteCoordsModel.serialize(routeModel.endPosition),
      points: routeModel.points.map(RoutePointModel.serialize),
    } as Route;
  }

  constructor(params?: RouteDbObject) {
    this._id = new ObjectId(params?._id);
    this.points = params?.points || [];
    this.startPosition = new RouteCoordsModel(params?.startPosition);
    this.endPosition = new RouteCoordsModel(params?.endPosition);
  }
}

export default RouteModel;
