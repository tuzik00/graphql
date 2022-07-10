import { ObjectId } from 'mongodb';

import {
  RouteCoordsDbObject,
  RouteDbObject,
  RoutePointDbObject,
  RoutePointType,
  RoutePointUserDbObject,
} from '@/types/mongodb.gen';

import { Route } from '@/types/graphql.gen';

export class RouteCoordsModel implements RouteCoordsDbObject {
  __typename;
  latitude: number;
  longitude: number;

  constructor(params?: RouteCoordsDbObject) {
    this.__typename = 'RouteCoords';

    this.latitude = params?.latitude || 0;
    this.longitude = params?.longitude || 0;
  }
}

export class RoutePointModel implements RoutePointDbObject {
  __typename;
  type: RoutePointType;
  coords: RouteCoordsDbObject;
  user: RoutePointUserDbObject;

  constructor(params?: RoutePointDbObject) {
    this.__typename = 'RoutePoint';

    this.type = params?.type || RoutePointType.Unknown;
    this.coords =
      params.coords ||
      new RouteCoordsModel({
        latitude: 0,
        longitude: 0,
      });

    if (params?.type === RoutePointType.User && params.user) {
      this.user = new RoutePointUserModel(params.user);
    } else {
      this.user = null;
    }
  }
}

export class RoutePointUserModel implements RoutePointUserDbObject {
  __typename;
  _id: string;

  constructor(params?: RoutePointUserDbObject) {
    this.__typename = 'RoutePointUser';

    this._id = params?._id || '';
  }
}

export class RouteModel implements RouteDbObject {
  __typename;
  _id;
  startPosition: RouteCoordsDbObject;
  endPosition: RouteCoordsDbObject;
  points: RoutePointDbObject[];

  static serialize(route: RouteDbObject) {
    return new RouteModel(route) as Route;
  }

  constructor(params?: RouteDbObject) {
    this.__typename = 'Route';

    this._id = new ObjectId(params?._id);
    this.startPosition = new RouteCoordsModel(params?.startPosition);
    this.endPosition = new RouteCoordsModel(params?.endPosition);

    this.points = params?.points?.map((point) => {
      const p = {
        ...point,
        coords: new RouteCoordsModel(point.coords),
        user: null,
      };

      if (point.type === RoutePointType.User) {
        p.user = new RoutePointUserModel(point.user);
      }

      return p;
    });
  }
}
