export const BASE_URL = 'http://localhost:3001'; // local
// export const BASE_URL = 'http://localhost:4000'; // whale

export const AUTH_URL = `${BASE_URL}/auth`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const REGISTER_URL = `${AUTH_URL}/register`;

export const COURSE_URL = `${BASE_URL}/tutorial`;
export const getCourseUrl = (courseId: string) => `${COURSE_URL}/${courseId}`;

export const USER_URL = `${BASE_URL}/user`;
export const PLAYER_STATS_URL = `${USER_URL}/stats`;

export const WS_ENDPOINT = 'http://localhost:4001';
