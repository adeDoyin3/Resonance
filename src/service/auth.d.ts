export interface SpotifyTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
}

export function loginToSpotify(): Promise<void>;
export function requestTokens(
  code: string,
  state: string,
): Promise<SpotifyTokenResponse>;
