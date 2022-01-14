const TOKEN_KEY = 'token';

const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);
const setToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);
const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export const useToken = () => {
  return {
    getToken,
    setToken,
    removeToken
  };
};
