import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_URL } from '../../constants/endpoints';
import { User } from '../../hooks/useToken';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: USER_URL }),
  endpoints: (builder) => ({
    // getCourse: builder.query<Course, string>({
    //   query: (id) => ({
    //     url: getCourseUrl(id),
    //     method: 'GET'
    //   })
    // }),
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

export const { useGetAllUsersQuery } = userApi;
