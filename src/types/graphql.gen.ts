/* eslint-disable */
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Тип почта */
  Email: string;
};

/** Ввод данных о позиции роута */
export type CoordsInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** Результат запроса создания пользователя */
export type CreateRoutePayload = {
  __typename: 'CreateRoutePayload';
  payload: Route;
};

/** Результат запроса создания пользователя */
export type CreateUserPayload = {
  __typename: 'CreateUserPayload';
  payload: User;
};

/** Результат запроса обновления пользователя */
export type DeleteUserPayload = {
  __typename: 'DeleteUserPayload';
  payload: Scalars['Boolean'];
};

/** Мутации */
export type Mutation = {
  __typename: 'Mutation';
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
  __typename: 'Query';
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
  __typename: 'Route';
  /** Id */
  _id: Scalars['ID'];
  endPosition: RouteCoords;
  points: Array<Maybe<RoutePoint>>;
  startPosition: RouteCoords;
};

/** Координаты */
export type RouteCoords = {
  __typename: 'RouteCoords';
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
  __typename: 'RouteMutation';
  create?: Maybe<CreateRoutePayload>;
};


/** Мутации роута */
export type RouteMutationCreateArgs = {
  input: RouteInput;
};

/** Точки на карте */
export type RoutePoint = {
  __typename: 'RoutePoint';
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
  __typename: 'RoutePointUser';
  /** Id */
  _id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

/** Результат запроса обновления пользователя */
export type UpdateUserPayload = {
  __typename: 'UpdateUserPayload';
  payload: User;
};

/** Пользователь */
export type User = {
  __typename: 'User';
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
  __typename: 'UserMutation';
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CoordsInput: CoordsInput;
  CreateRoutePayload: ResolverTypeWrapper<CreateRoutePayload>;
  CreateUserPayload: ResolverTypeWrapper<CreateUserPayload>;
  DeleteUserPayload: ResolverTypeWrapper<DeleteUserPayload>;
  Email: ResolverTypeWrapper<Scalars['Email']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  PointInput: PointInput;
  Query: ResolverTypeWrapper<{}>;
  Route: ResolverTypeWrapper<Route>;
  RouteCoords: ResolverTypeWrapper<RouteCoords>;
  RouteFilter: RouteFilter;
  RouteInput: RouteInput;
  RouteMutation: ResolverTypeWrapper<RouteMutation>;
  RoutePoint: ResolverTypeWrapper<RoutePoint>;
  RoutePointType: RoutePointType;
  RoutePointUser: ResolverTypeWrapper<RoutePointUser>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateUserPayload: ResolverTypeWrapper<UpdateUserPayload>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserMutation: ResolverTypeWrapper<UserMutation>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CoordsInput: CoordsInput;
  CreateRoutePayload: CreateRoutePayload;
  CreateUserPayload: CreateUserPayload;
  DeleteUserPayload: DeleteUserPayload;
  Email: Scalars['Email'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Mutation: {};
  PointInput: PointInput;
  Query: {};
  Route: Route;
  RouteCoords: RouteCoords;
  RouteFilter: RouteFilter;
  RouteInput: RouteInput;
  RouteMutation: RouteMutation;
  RoutePoint: RoutePoint;
  RoutePointUser: RoutePointUser;
  String: Scalars['String'];
  UpdateUserPayload: UpdateUserPayload;
  User: User;
  UserInput: UserInput;
  UserMutation: UserMutation;
};

export type CreateRoutePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateRoutePayload'] = ResolversParentTypes['CreateRoutePayload']> = {
  payload?: Resolver<ResolversTypes['Route'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload']> = {
  payload?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserPayload'] = ResolversParentTypes['DeleteUserPayload']> = {
  payload?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  route?: Resolver<Maybe<ResolversTypes['RouteMutation']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserMutation']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  route?: Resolver<Maybe<ResolversTypes['Route']>, ParentType, ContextType, RequireFields<QueryRouteArgs, 'filter'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RouteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Route'] = ResolversParentTypes['Route']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  endPosition?: Resolver<ResolversTypes['RouteCoords'], ParentType, ContextType>;
  points?: Resolver<Array<Maybe<ResolversTypes['RoutePoint']>>, ParentType, ContextType>;
  startPosition?: Resolver<ResolversTypes['RouteCoords'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RouteCoordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RouteCoords'] = ResolversParentTypes['RouteCoords']> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RouteMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RouteMutation'] = ResolversParentTypes['RouteMutation']> = {
  create?: Resolver<Maybe<ResolversTypes['CreateRoutePayload']>, ParentType, ContextType, RequireFields<RouteMutationCreateArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoutePointResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoutePoint'] = ResolversParentTypes['RoutePoint']> = {
  coords?: Resolver<ResolversTypes['RouteCoords'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RoutePointType'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['RoutePointUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoutePointUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoutePointUser'] = ResolversParentTypes['RoutePointUser']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserPayload'] = ResolversParentTypes['UpdateUserPayload']> = {
  payload?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMutation'] = ResolversParentTypes['UserMutation']> = {
  create?: Resolver<Maybe<ResolversTypes['CreateUserPayload']>, ParentType, ContextType, RequireFields<UserMutationCreateArgs, 'input'>>;
  delete?: Resolver<Maybe<ResolversTypes['DeleteUserPayload']>, ParentType, ContextType, Partial<UserMutationDeleteArgs>>;
  update?: Resolver<Maybe<ResolversTypes['UpdateUserPayload']>, ParentType, ContextType, RequireFields<UserMutationUpdateArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateRoutePayload?: CreateRoutePayloadResolvers<ContextType>;
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>;
  DeleteUserPayload?: DeleteUserPayloadResolvers<ContextType>;
  Email?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Route?: RouteResolvers<ContextType>;
  RouteCoords?: RouteCoordsResolvers<ContextType>;
  RouteMutation?: RouteMutationResolvers<ContextType>;
  RoutePoint?: RoutePointResolvers<ContextType>;
  RoutePointUser?: RoutePointUserResolvers<ContextType>;
  UpdateUserPayload?: UpdateUserPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserMutation?: UserMutationResolvers<ContextType>;
};

