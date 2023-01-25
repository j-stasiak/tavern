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
    })
    // createCourse: builder.mutation<CreateTutorialResponse, { data: Course; token: string }>({
    //   query: ({ data, token }) => ({
    //     url: '',
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    // }),
    // updateCourse: builder.mutation<CreateTutorialResponse, { data: Course; token: string }>({
    //   query: ({ data, token }) => ({
    //     url: '',
    //     method: 'PATCH',
    //     body: data,
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    // }),
    // finishCourse: builder.query<void, { id: string; token: string }>({
    //   query: ({ id, token }) => ({
    //     url: getFinishTutorialUrl(id),
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    // })
  })
});

export const { useGetUserQuery, useLazyGetUserQuery, useGetAllUsersQuery } = userApi;
