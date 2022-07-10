export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Тип почта */
  Email: any;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Ввод данных о позиции роута */
export type CoordsInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** Результат запроса создания пользователя */
export type CreateRoutePayload = {
  __typename?: 'CreateRoutePayload';
  payload: Route;
};

/** Результат запроса создания пользователя */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  payload: User;
};

/** Результат запроса обновления пользователя */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  payload: Scalars['Boolean'];
};

/** Мутации */
export type Mutation = {
  __typename?: 'Mutation';
  route?: Maybe<RouteMutation>;
  user?: Maybe<UserMutation>;
};

/** Ввод данных о роуте */
export type PointInput = {
  coords: CoordsInput;
  type: RoutePointType;
};

/** Запросы */
export type Query = {
  __typename?: 'Query';
  route?: Maybe<Route>;
  /** Пользователь */
  user?: Maybe<User>;
};


/** Запросы */
export type QueryRouteArgs = {
  filter: RouteFilter;
};

/** Маршрут */
export type Route = {
  __typename?: 'Route';
  /** Id */
  _id: Scalars['ID'];
  endPosition: RouteCoords;
  points: Array<Maybe<RoutePoint>>;
  startPosition: RouteCoords;
};

/** Координаты */
export type RouteCoords = {
  __typename?: 'RouteCoords';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** Фильтр роутов */
export type RouteFilter = {
  /** Id */
  _id: Scalars['String'];
};

/** Ввод данных о роуте */
export type RouteInput = {
  endPosition: CoordsInput;
  points: Array<InputMaybe<PointInput>>;
  startPosition: CoordsInput;
};

/** Мутации роута */
export type RouteMutation = {
  __typename?: 'RouteMutation';
  create?: Maybe<CreateRoutePayload>;
};


/** Мутации роута */
export type RouteMutationCreateArgs = {
  input: RouteInput;
};

/** Точки на карте */
export type RoutePoint = {
  __typename?: 'RoutePoint';
  coords: RouteCoords;
  type: RoutePointType;
  user?: Maybe<RoutePointUser>;
};

/** Тип точки */
export enum RoutePointType {
  Unknown = 'UNKNOWN',
  User = 'USER'
}

/** Пользователь */
export type RoutePointUser = User & {
  __typename?: 'RoutePointUser';
  /** Id */
  _id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

/** Результат запроса обновления пользователя */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  payload: User;
};

/** Пользователь */
export type User = {
  __typename?: 'User';
  /** Id */
  _id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

/** Параметры запроса на создание пользователя */
export type UserInput = {
  email: Scalars['Email'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

/** CRUD пользователя */
export type UserMutation = {
  __typename?: 'UserMutation';
  create?: Maybe<CreateUserPayload>;
  delete?: Maybe<DeleteUserPayload>;
  update?: Maybe<UpdateUserPayload>;
};


/** CRUD пользователя */
export type UserMutationCreateArgs = {
  input: UserInput;
};


/** CRUD пользователя */
export type UserMutationDeleteArgs = {
  id?: InputMaybe<Scalars['String']>;
};


/** CRUD пользователя */
export type UserMutationUpdateArgs = {
  input: UserInput;
};

import { ObjectId } from 'mongodb';
export type RouteDbObject = {
  _id: ObjectId,
  endPosition: RouteCoords,
  points: Array<Maybe<RoutePoint>>,
  startPosition: RouteCoords,
};

export type RouteCoordsDbObject = {
  latitude: number,
  longitude: number,
};

export type RoutePointDbObject = {
  coords: RouteCoords,
  type: RoutePointType,
  user?: Maybe<RoutePointUser>,
};

export type RoutePointUserDbObject = {
  _id: string,
};

export type UserDbObject = {
  _id: ObjectId,
  email?: Maybe<string>,
  firstName?: Maybe<string>,
  lastName?: Maybe<string>,
};
