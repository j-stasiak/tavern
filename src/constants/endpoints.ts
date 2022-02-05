export const BASE_URL = 'http://localhost:4000';

export const AUTH_URL = `${BASE_URL}/auth`;
export const LOGIN_URL = '/login';
export const REGISTER_URL = '/register';

export const COURSE_URL = `${BASE_URL}/tutorial`;
export const getCourseUrl = (courseId: string) => `${COURSE_URL}/${courseId}`;

export const WS_ENDPOINT = 'http://localhost:4001';
