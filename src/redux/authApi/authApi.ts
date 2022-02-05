import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOGIN_URL, REGISTER_URL } from '../../constants/endpoints';

export interface User {
  username: string;
  password: string;
}

export interface NewAccount extends User {
  email: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterResponse {
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  username: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginResponse, User>({
      query: (data) => ({
        url: LOGIN_URL,
        method: 'POST',
        body: data
      })
    }),
    postRegister: builder.mutation<RegisterResponse, NewAccount>({
      query: (data) => ({
        url: REGISTER_URL,
        method: 'POST',
        body: data
      })
    })
  })
});

export const { usePostLoginMutation, usePostRegisterMutation } = authApi;
