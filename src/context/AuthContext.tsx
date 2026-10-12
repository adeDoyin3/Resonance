import React, { useCallback, useContext, useMemo, useState } from "react";
import { loginToSpotify, requestTokens } from "../service/auth";
import type { SpotifyTokenResponse } from "../service/auth";

interface AuthContextValue {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  completeLogin: (code: string, state: string) => Promise<SpotifyTokenResponse>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined,
);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access_token"),
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refresh_token"),
  );

  const login = useCallback(async (): Promise<void> => {
    await loginToSpotify();
  }, []);

  const completeLogin = useCallback(async (code: string, state: string) => {
    const response = await requestTokens(code, state);

    if (response?.access_token) {
      setAccessToken(response.access_token);
    }

    if (response?.refresh_token) {
      setRefreshToken(response.refresh_token);
    }

    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken),
      login,
      completeLogin,
      logout,
    }),
    [accessToken, refreshToken, login, completeLogin, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};

export default AuthContextProvider;
