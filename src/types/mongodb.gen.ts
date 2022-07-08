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
  user?: Maybe<UserMutation>;
};

/** Запросы */
export type Query = {
  __typename?: 'Query';
  /** Пользователь */
  user?: Maybe<User>;
};

/** Результат запроса обновления пользователя */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  payload: User;
};

/** Пользователь */
export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastname?: Maybe<Scalars['String']>;
};

/** Параметры запроса на создание пользователя */
export type UserInput = {
  email: Scalars['Email'];
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
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
  user: UserInput;
};


/** CRUD пользователя */
export type UserMutationDeleteArgs = {
  id?: InputMaybe<Scalars['String']>;
};


/** CRUD пользователя */
export type UserMutationUpdateArgs = {
  user: UserInput;
};

import { ObjectId } from 'mongodb';
export type UserDbObject = {
  email?: Maybe<string>,
  firstName?: Maybe<string>,
  _id: ObjectId,
  lastname?: Maybe<string>,
};
