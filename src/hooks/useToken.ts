const TOKEN_KEY = 'token';

const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);
const setToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);
const getToken = (): string => sessionStorage.getItem(TOKEN_KEY)!;

export interface UserInfo {
  id: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  rank: string;
  reputation: number;
}

export interface TokenInfo {
  sub: string;
  username: string;
  email: string;
  info: UserInfo;
  completedTutorials: string[];
  role: string;
  iat: number;
}

const useToken = () => {
  const token = getToken();
  return {
    token,
    getToken,
    setToken,
    removeToken
  };
};

export default useToken;
