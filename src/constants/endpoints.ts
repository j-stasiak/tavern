const SERVER_PREFIX = "http://localhost:";
export const SERVER_URL = `${SERVER_PREFIX}3000`;
export const SERVER_SOCKET_URL = `${SERVER_PREFIX}3001`;

export const updateUser = (user: string) => `${SERVER_URL}/user/${user}`;
