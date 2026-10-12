import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Auth({ children }: PropsWithChildren) {
  const { completeLogin } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(() =>
    Boolean(searchParams.get("code")),
  );
  const callbackStarted = useRef(false);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const spotifyError =
    searchParams.get("error_description") ?? searchParams.get("error");

  useEffect(() => {
    if (spotifyError) {
      setError(spotifyError);
      return;
    }

    if (!code || callbackStarted.current) {
      return;
    }

    callbackStarted.current = true;
    setIsProcessing(true);
    void completeLogin(code, state ?? "")
      .then(() => {
        setIsProcessing(false);
        navigate("/track", { replace: true });
      })
      .catch((callbackError: unknown) => {
        setError(
          callbackError instanceof Error
            ? callbackError.message
            : "Spotify sign-in could not be completed.",
        );
      });
  }, [code, completeLogin, navigate, spotifyError, state]);

  if (error) {
    return (
      <main className="p-8 text-white" role="alert">
        <p>Spotify sign-in failed: {error}</p>
        <a className="underline" href="/login">
          Try again
        </a>
      </main>
    );
  }

  if (isProcessing) {
    return (
      <main className="p-8 text-white" aria-live="polite">
        Connecting to Spotify...
      </main>
    );
  }

  return children;
}
