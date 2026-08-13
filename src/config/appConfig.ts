import { env } from "./env";

export const appConfig = {
  name: env.appName,
  apiUrl: env.apiUrl,
  version: "1.0.0",
  defaultPageSize: 10,
};
