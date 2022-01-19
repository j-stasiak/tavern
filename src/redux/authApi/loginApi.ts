import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOGIN_URL } from '../../constants/endpoints';

export interface User {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: LOGIN_URL }),
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginResponse, User>({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { usePostLoginMutation } = loginApi;
