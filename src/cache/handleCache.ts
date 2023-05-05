import NodeCache from "node-cache";
import { yellowBright, whiteBright } from "console-log-colors";

const cache = new NodeCache({ stdTTL: 60 });

const prefix = yellowBright.bold("cache");
export const getFromCache = (cacheKey: string) => {
 const cacheData = cache.get(cacheKey);
 if (cacheData) {
  console.log(`${prefix} - ${whiteBright("Data from cache")}`); //Colored message
  return cacheData;
 } else {
  console.log(`${prefix} - ${whiteBright("Data from database")} [${yellowBright(cacheKey)}]`); //Colored message
  return null;
 }
};

export const setToCache = (cacheKey: string, data: any) => {
 cache.set(cacheKey, data);
};
