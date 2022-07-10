import { RoutePointUserDbObject } from '@/types/mongodb.gen';
import { RoutePointUser } from '@/types/graphql.gen';

class RoutePointUserModel implements RoutePointUserDbObject {
  _id: string;

  static serialize(routePoint: RoutePointUserDbObject) {
    const model = new RoutePointUserModel(routePoint);

    return {
      __typename: 'User',
      ...model,
    } as RoutePointUser;
  }

  constructor(params?: RoutePointUserDbObject) {
    this._id = params?._id || '';
  }
}

export default RoutePointUserModel;
