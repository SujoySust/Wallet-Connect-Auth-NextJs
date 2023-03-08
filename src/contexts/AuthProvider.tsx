import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookies, getCookie } from "cookies-next";

type authContextType = {
  authState: boolean;
  isAuthenticated: () => any;
  signIn: (payload: "") => any;
};

const authContextDefaultValues: authContextType = {
  authState: false,
  isAuthenticated: () => {
    return false;
  },

  signIn: () => {
    return null;
  },
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState(false);
  const loginMutation: any = 0;

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthState(true);
    }
  }, []);

  const signIn = async (payload: any) => {
    try {
      const response = await loginMutation.mutateAsync(payload);
      const accessToken = response.login.accessToken;
      const refreshToken = response.login.refreshToken;
      const expiredAt = response.login.expireAt;

      const token = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiredAt: expiredAt,
      };
      setCookies("token", JSON.stringify(token));
      setAuthState(true);
      return {
        success: true,
        message: "Login successful!",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const isAuthenticated = () => {
    const token = getCookie("token");
    let tokenObject = null;
    try {
      if (typeof token === "string") {
        tokenObject = token ? JSON.parse(token) : null;
      }
    }catch (error){
    }

    if (tokenObject) {
      // check expire time
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ authState, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider as default, useAuth };
