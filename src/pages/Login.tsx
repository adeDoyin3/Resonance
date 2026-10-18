import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginArtwork from "../assets/login-image.png";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login, completeLogin, isLoggedIn } = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(() =>
    new URLSearchParams(window.location.search).has("error")
      ? "Spotify authorization failed. Please connect again."
      : null,
  );
  const tokenRequestRef = useRef<ReturnType<typeof completeLogin> | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const spotifyError = params.get("error");

    if (spotifyError) {
      console.error("Spotify authorization failed:", spotifyError);
      return;
    }

    if (!code) {
      if (isLoggedIn) navigate("/track", { replace: true });
      return;
    }

    let isCurrent = true;

    const finishLogin = async () => {
      setIsSigningIn(true);

      try {
        tokenRequestRef.current ??= completeLogin();
        const response = await tokenRequestRef.current;

        if (!response?.access_token) {
          throw new Error("Spotify access token is missing.");
        }

        if (isCurrent) {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );

          navigate("/track", { replace: true });
        }
      } catch (error) {
        console.error("Spotify login failed:", error);
        if (isCurrent) {
          setLoginError("Could not complete Spotify login. Please connect again.");
        }
      } finally {
        if (isCurrent) {
          setIsSigningIn(false);
        }
      }
    };

    void finishLogin();

    return () => {
      isCurrent = false;
    };
  }, [completeLogin, isLoggedIn, navigate]);

  return (
    <main className="relative grid min-h-svh place-items-center isolate overflow-hidden bg-[#080b10] text-[#f7f4ed]">
      <div
        aria-hidden="true"
        className="absolute -inset-[7%] -z-20 bg-cover bg-center brightness-[.45] saturate-[.72] blur-[3.5px]"
        style={{
          backgroundImage: `url(${loginArtwork})`,
          transform: "rotate(-4deg) scale(1.06)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_43%,rgba(10,14,22,.15),rgba(7,10,15,.77)_68%),linear-gradient(90deg,rgba(6,9,14,.34),rgba(6,9,14,.14),rgba(6,9,14,.48))]"
      />

      <section className="w-[min(100%-2rem,430px)] px-4 py-12 text-center">
        <h1 className="m-0 font-[Georgia,serif] text-[clamp(3.6rem,9vw,5.4rem)] font-normal leading-[.9] tracking-[-0.075em] text-[#f4ead9] drop-shadow-[0_2px_22px_rgba(0,0,0,.55)]">
          Resonance
        </h1>

        <p className="mb-10 mt-4 text-[.52rem] font-semibold tracking-[.27em] text-white/65">
          YOUR MUSIC, UNFILTERED.
        </p>

        <div
          aria-hidden="true"
          className="mx-auto mb-7 h-9 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />

        <button
          type="button"
          onClick={login}
          disabled={isSigningIn}
          className="relative z-10 inline-flex min-w-45 items-center justify-center gap-2 rounded-[3px] border border-[#4ddd87]/80 bg-[#0c1311c7] px-4 py-3 text-[.68rem] font-semibold text-[#f7f4ed] shadow-[0_8px_24px_rgba(0,0,0,.26)] transition"
        >
          {isSigningIn ? "Signing in..." : "Connect with Spotify"}
        </button>
        {loginError && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {loginError}
          </p>
        )}
      </section>
    </main>
  );
}
