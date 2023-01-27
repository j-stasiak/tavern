import { usePostLoginMutation } from '../redux/authApi/authApi';
import { LoginInputs } from '../components/loginModal/LoginModal';
import { useGlobalStates } from '../components/providers/globalStatesProvider/GlobalStatesProvider';
import useToken from './useToken';

export const useLogin = () => {
  const [triggerLogin, { isLoading, isError }] = usePostLoginMutation();
  const { setIsLoginModalOpen, setIsMenuOpen, setIsLoggedIn } = useGlobalStates();
  const { setToken } = useToken();
  // const { setSocket } = useSocket();

  const login = (data: LoginInputs) =>
    triggerLogin(data)
      .unwrap()
      .then(({ access_token }) => {
        setIsLoginModalOpen(false);
        setIsMenuOpen(false);
        setToken(access_token);
        // setSocket(io(WS_ENDPOINT));
      })
      .then(() => setIsLoggedIn(true));

  return {
    login,
    isLoading,
    isError
  };
};
