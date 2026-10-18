import { useCallback, useEffect, useRef, useState } from "react";
import { clearRefreshToken, loginWithSpotify, refreshAccessToken, requestTokens } from "../service/auth";
import AuthContext from "./AuthContext"

const AuthContextProvider = ({ children }) => {
  // Remove refresh tokens saved by earlier versions of the app.
  sessionStorage.removeItem("refresh_token");
  const [accessToken, setAccessToken] = useState(
    () => sessionStorage.getItem("access_token") || null
  );
  const restoreStarted = useRef(false);

  const isLoggedIn = Boolean(accessToken);

  const login = useCallback(async () => {
    await loginWithSpotify();
  }, []);

  const completeLogin = useCallback(async () => {
    const response = await requestTokens();

    if (!response?.access_token) {
      throw new Error("Spotify did not return an access token.");
    }

    sessionStorage.setItem("access_token", response.access_token);
    sessionStorage.setItem("access_token_expires_at", String(Date.now() + response.expires_in * 1000));
    setAccessToken(response.access_token);

    return response;
  }, []);

  const refresh = useCallback(async () => {
    const response = await refreshAccessToken();
    sessionStorage.setItem("access_token", response.access_token);
    sessionStorage.setItem("access_token_expires_at", String(Date.now() + response.expires_in * 1000));
    setAccessToken(response.access_token);
    return response;
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("code")) return;

    const expiresAt = Number(sessionStorage.getItem("access_token_expires_at"));
    if (!accessToken || !expiresAt || expiresAt <= Date.now() + 60_000) {
      if (restoreStarted.current) return;
      restoreStarted.current = true;
      void refresh().catch(() => {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token_expires_at");
        setAccessToken(null);
      });
      return;
    }

    const timer = window.setTimeout(() => {
      void refresh().catch(() => {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token_expires_at");
        setAccessToken(null);
      });
    }, expiresAt - Date.now() - 60_000);
    return () => window.clearTimeout(timer);
  }, [accessToken, refresh]);

  const logout = useCallback(async () => {
    await clearRefreshToken();
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token_expires_at");

    setAccessToken(null);
  }, []);

  const value = {
    accessToken,
    isLoggedIn,
    login,
    completeLogin,
    refresh,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
