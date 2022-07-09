import { ObjectId } from 'mongodb';

import {
  RouteDbObject,
  RouteCoordsDbObject,
  RoutePointDbObject,
  RoutePointType,
} from '@/types/mongodb.gen';

import { RouteInput } from '@/types/graphql.gen';

class Route implements RouteDbObject {
  _id;
  startPosition: RouteCoordsDbObject;
  endPosition: RouteCoordsDbObject;
  points: RoutePointDbObject[];

  constructor(params: RouteInput) {
    this._id = new ObjectId();

    this.startPosition = {
      ...params.startPosition,
    };

    this.endPosition = {
      ...params.endPosition,
    };

    this.points = params?.points?.map((point) => {
      const newPoint = {
        type: RoutePointType.User,
        coords: point.coords,
        user: null,
      };

      if (point.type === RoutePointType.User) {
        newPoint.user = point.user;
      }

      return newPoint;
    });
  }
}

export default Route;
