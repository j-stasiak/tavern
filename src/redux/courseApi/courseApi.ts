import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COURSE_URL, getCourseUrl } from '../../constants/endpoints';
import { Course } from '../../models/Course';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: COURSE_URL }),
  endpoints: (builder) => ({
    getCourse: builder.query<Course, string>({
      query: (id) => ({
        url: getCourseUrl(id),
        method: 'GET'
      })
    })
  })
});

export const { useGetCourseQuery } = courseApi;
