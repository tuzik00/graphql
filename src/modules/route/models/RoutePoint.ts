import {
  RouteCoordsDbObject,
  RoutePointDbObject,
  RoutePointUserDbObject,
} from '@/types/mongodb.gen';

import { RoutePoint, RoutePointType } from '@/types/graphql.gen';
import { RoutePointUserModel, RouteCoordsModel } from '.';

class RoutePointModel implements RoutePointDbObject {
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

export default RoutePointModel;
