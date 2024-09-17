import { Website } from "../api/igdb/types";

export const getSteamIdFromUrl = (url: string) =>
  url.match(/\/app\/(\d+)(\/|$)/)?.[1]; // Changed index to [1] to extract the appid

export const getSteamIdFromWebsites = (websites: Website[]) => {
  const find_steam_url = websites?.find((site) =>
    site.url.startsWith("https://store.steampowered.com/app")
  );

  if (!find_steam_url) return undefined;

  return getSteamIdFromUrl(find_steam_url?.url);
};
