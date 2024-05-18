// START QL
// Credits: https://github.com/Fisch03/SDH-QuickLaunch

import { ServerAPI } from "decky-frontend-lib";

interface App {
  name: string;
  exec: string;
  compatTool?: string;
}

const createShortcut = (name: string, launchOptions: string = "", target: string = "") => {
  return SteamClient.Apps.AddShortcut(name, "/usr/bin/ifyouseethisyoufoundabug", target, launchOptions); //The Part after the last Slash does not matter because it should always be replaced when launching an app
};

const gameIDFromAppID = (appid: number) => {
  //@ts-ignore
  let game = appStore.GetAppOverviewByAppID(appid);
  console.log({ appid });
  console.log({ game });
  if (game !== null) {
    return game.m_gameid;
  } else {
    return -1;
  }
};

const getShortcutID = async (sAPI: ServerAPI) => {
  const result = await sAPI.callPluginMethod<any, number>("get_id", {});
  console.log({ result });
  if (result.success) {
    let id: number = result.result;
    if (id == -1) {
      id = await createShortcut("QuickLaunchEmuDeck");
      console.log("id1", id);
      sAPI.callPluginMethod("set_id", { id: id });
    } else if ((await gameIDFromAppID(id)) == -1) {
      id = await createShortcut("QuickLaunchEmuDeck");
      console.log("id2", id);
      sAPI.callPluginMethod("set_id", { id: id });
    }

    return id;
  }

  return -1;
};

function getLaunchOptions(app: App) {
  let launchOptions: string[] = app.exec.split(" ");
  launchOptions.shift();
  return launchOptions.join(" ");
}

function getTarget(app: App) {
  let target: string[] = app.exec.split(" ");
  return target[0];
}

export async function launchApp(sAPI: ServerAPI, app: App) {
  let id: number = await getShortcutID(sAPI);
  SteamClient.Apps.SetShortcutName(id, `EmuDeck - ${app.name}`);
  SteamClient.Apps.SetShortcutLaunchOptions(id, getLaunchOptions(app));
  SteamClient.Apps.SetShortcutExe(id, `"${getTarget(app)}"`);
  SteamClient.Apps.SpecifyCompatTool(id, app.compatTool === undefined ? "" : app.compatTool);

  setTimeout(() => {
    let gid = gameIDFromAppID(id);
    SteamClient.Apps.RunGame(gid, "", -1, 100);
  }, 500);
}

// END QL
