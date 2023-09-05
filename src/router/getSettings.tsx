import { ServerAPI } from "decky-frontend-lib";

export default function getSettings(serverAPI: ServerAPI) {
  serverAPI.callPluginMethod("getSettings", {}).then((response) => {
    const result: any = response.result;
    const config: any = JSON.parse(result);
    console.log({ config });
    return config;
  });
}
