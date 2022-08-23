import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COURSE_URL, getCourseUrl } from '../../constants/endpoints';
import { Course } from '../../models/Course';

interface CreateTutorialResponse {
  insertedId: number;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: COURSE_URL }),
  endpoints: (builder) => ({
    getCourse: builder.query<Course, string>({
      query: (id) => ({
        url: getCourseUrl(id),
        method: 'GET'
      })
    }),
    getAllCourses: builder.query<Course[], string>({
      query: (token) => ({
        url: '/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    createCourse: builder.mutation<CreateTutorialResponse, { data: Course; token: string }>({
      query: ({ data, token }) => ({
        url: '',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    updateCourse: builder.mutation<Partial<Course>, unknown>({
      query: (course) => ({
        url: '/',
        method: 'POST',
        body: course
      })
    })
  })
});

export const { useGetCourseQuery, useCreateCourseMutation, useGetAllCoursesQuery } = courseApi;
