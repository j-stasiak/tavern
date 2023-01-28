import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COURSE_URL, getCourseUrl, getFinishTutorialUrl } from '../../constants/endpoints';
import { Course } from '../../models/Course';

interface CreateTutorialResponse {
  insertedId: number;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getCourse: builder.query<Course, string>({
      query: (id) => ({
        url: getCourseUrl(id),
        method: 'GET'
      })
    }),
    getAllCourses: builder.query<Course[], string>({
      query: (id) => ({
        url: '/',
        method: 'GET'
      })
    }),
    createCourse: builder.mutation<CreateTutorialResponse, Course>({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data
      })
    }),
    updateCourse: builder.mutation<CreateTutorialResponse, Course>({
      query: (data) => ({
        url: getCourseUrl(data.id),
        method: 'PATCH',
        body: data
      })
    }),
    finishCourse: builder.query<void, string>({
      query: (id) => ({
        url: getFinishTutorialUrl(id),
        method: 'POST'
      })
    })
  })
});

export const {
  useGetCourseQuery,
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
  useLazyFinishCourseQuery
} = courseApi;
