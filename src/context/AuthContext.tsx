import React, { useContext, useMemo, useState } from "react";
import { loginToSpotify, requestTokens } from "../service/auth";

const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access_token"),
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refresh_token"),
  );

  const login = async () => {
    await loginToSpotify();
  };

  const completeLogin = async (code, state) => {
    const response = await requestTokens(code, state);

    if (response?.access_token) {
      setAccessToken(response.access_token);
    }

    if (response?.refresh_token) {
      setRefreshToken(response.refresh_token);
    }

    return response;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setRefreshToken(null);
  };

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken),
      login,
      completeLogin,
      logout,
    }),
    [accessToken, refreshToken],
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
