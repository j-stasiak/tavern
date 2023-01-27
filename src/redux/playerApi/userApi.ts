import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserId, USER_URL } from '../../constants/endpoints';
import { User } from '../../hooks/useToken';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: USER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem('token');

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getUser: builder.query<any, any>({
      query: (id) => ({
        url: getUserId(id),
        method: 'GET'
      })
    }),
    getAllUsers: builder.query<User[], string>({
      query: (token) => ({
        url: '/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    deleteUser: builder.mutation<any, { id: string }>({
      query: (data) => ({
        url: getUserId(data.id),
        method: 'DELETE'
      })
    })
  })
});

export const { useGetUserQuery, useLazyGetUserQuery, useGetAllUsersQuery, useDeleteUserMutation } = userApi;
