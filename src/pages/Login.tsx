import loginArtwork from "../assets/login-image.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

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
          onClick={() => navigate("/track")}
          className="relative z-10 inline-flex min-w-45 items-center justify-center gap-2 rounded-[3px] border border-[#4ddd87]/80 bg-[#0c1311c7] px-4 py-3 text-[.68rem] font-semibold text-[#f7f4ed] shadow-[0_8px_24px_rgba(0,0,0,.26)] transition"
        >
          Connect with Spotify
        </button>
      </section>
    </main>
  );
}
