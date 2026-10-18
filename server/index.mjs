import { startAuthServer } from "./auth.mjs";

startAuthServer(Number(process.env.AUTH_PORT || 3001));
