import { useQuery } from "@tanstack/react-query";
import {
  getRecentlyPlayedTracks,
  getUserTopTracks,
  getUserTopArtists
} from "../service/user";
import useAuth from "../hooks/useAuth";

export const useGetUserTopTracks = () => {
  return useQuery({
    queryKey: ["userTopTracks"],
    queryFn: getUserTopTracks,
  });
};

export const useGetRecentlyPlayedTracks = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["recentlyPlayedTracks"],
    queryFn: getRecentlyPlayedTracks,
    enabled: Boolean(accessToken),
  });
};

export const useGetUserTopArtists = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["userTopArtists"],
    queryFn: getUserTopArtists,
    enabled: Boolean(accessToken),
  });
}