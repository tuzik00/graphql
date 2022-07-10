import { RouteCoordsDbObject } from '@/types/mongodb.gen';
import { RouteCoords } from '@/types/graphql.gen';

class RouteCoordsModel implements RouteCoordsDbObject {
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

export default RouteCoordsModel;
