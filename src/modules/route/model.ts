import { ObjectId } from 'mongodb';

import {
  RouteCoordsDbObject,
  RouteDbObject,
  RoutePointDbObject,
  RoutePointUserDbObject,
} from '@/types/mongodb.gen';

import {
  Route,
  RouteCoords,
  RoutePoint,
  RoutePointType,
  RoutePointUser,
} from '@/types/graphql.gen';

export class RouteCoordsModel implements RouteCoordsDbObject {
  latitude: number;
  longitude: number;

  static serialize(routeCoords) {
    const model = new RouteCoordsModel(routeCoords);

    return {
      __typename: 'RouteCoords',
      ...model,
    } as RouteCoords;
  }

  constructor(params?: RouteCoordsDbObject) {
    this.latitude = params?.latitude || 0;
    this.longitude = params?.longitude || 0;
  }
}

export class RoutePointModel implements RoutePointDbObject {
  type: RoutePointType;
  coords: RouteCoordsDbObject;
  user: RoutePointUserDbObject;

  static serialize(routePoint: RoutePoint) {
    const model = new RoutePointModel(routePoint);

    return {
      __typename: 'RoutePoint',
      type: model.type,
      coords: RouteCoordsModel.serialize(routePoint.coords),
      user:
        model.type === RoutePointType.User
          ? RoutePointUserModel.serialize(model.user)
          : null,
    } as RoutePoint;
  }

  constructor(params?: RoutePointDbObject) {
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
  _id: string;

  static serialize(routePoint: RoutePointUserDbObject) {
    const model = new RoutePointUserModel(routePoint);

    return {
      __typename: 'RoutePointUser',
      ...model,
    } as RoutePointUser;
  }

  constructor(params?: RoutePointUserDbObject) {
    this._id = params?._id || '';
  }
}

export class RouteModel implements RouteDbObject {
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
