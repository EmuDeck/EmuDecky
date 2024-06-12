import { ServerAPI } from "decky-frontend-lib";
import {
  RAHotkeys,
  CitraHotkeys,
  CitraControls,
  GameCubeControls,
  GameCubeHotkeys,
  GameCubeHotkeysAlt,
  WiiControls,
  WiiNunchuckControls,
  WiiClassicControls,
  WiiHotkeys,
  WiiHotkeysAlt,
  PrimeHackControls,
  PrimeHackHotkeys,
  PrimeHackHotkeysAlt,
  WiiUControls,
  WiiUHotkeys,
  YuzuControls,
  YuzuHotkeys,
  YuzuHotkeysAlt,
  DuckstationControls,
  DuckstationHotkeys,
  DuckstationHotkeysAlt,
  PS2Controls,
  PS2Hotkeys,
  PS2HotkeysAlt,
} from "../components/Hotkeys";

export default function configureRouter(serverAPI: ServerAPI, activate: Boolean) {
  if (activate) {
    serverAPI.routerHook.addRoute("/retroarch-hotkeys", RAHotkeys, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/n3ds-hotkeys", CitraHotkeys, {
      exact: true,
    });

    serverAPI.routerHook.addRoute("/gamecube-hotkeys", GameCubeHotkeys, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/wii-hotkeys", WiiHotkeys, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/primehack-hotkeys", PrimeHackHotkeys, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/wiiu-hotkeys", WiiUHotkeys, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/yuzu-hotkeys", YuzuHotkeys, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/duckstation-hotkeys", DuckstationHotkeys, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/ps2-hotkeys", PS2Hotkeys, {
      exact: true,
    });

    serverAPI.routerHook.addRoute("/gamecube-hotkeys-alt", GameCubeHotkeysAlt, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/wii-hotkeys-alt", WiiHotkeysAlt, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/primehack-hotkeys-alt", PrimeHackHotkeysAlt, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/yuzu-hotkeys-alt", YuzuHotkeysAlt, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/duckstation-hotkeys-alt", DuckstationHotkeysAlt, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/ps2-hotkeys-alt", PS2HotkeysAlt, {
      exact: true,
    });

    serverAPI.routerHook.addRoute("/n3ds", CitraControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/gamecube", GameCubeControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/wii", WiiControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/wii-nunchuck", WiiNunchuckControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/wii-classic", WiiClassicControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/primehack", PrimeHackControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/wiiu", WiiUControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/yuzu", YuzuControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/duckstation", DuckstationControls, {
      exact: true,
    });
    serverAPI.routerHook.addRoute("/ps2", PS2Controls, {
      exact: true,
    });
  } else {
    serverAPI.routerHook.removeRoute("/n3ds");
    serverAPI.routerHook.removeRoute("/gamecube");
    serverAPI.routerHook.removeRoute("/primehack");
    serverAPI.routerHook.removeRoute("/wiiu");
    serverAPI.routerHook.removeRoute("/duckstation");
    serverAPI.routerHook.removeRoute("/ps2");

    serverAPI.routerHook.removeRoute("/n3ds-hotkeys");
    serverAPI.routerHook.removeRoute("/retroarch-hotkeys");
    serverAPI.routerHook.removeRoute("/gamecube-hotkeys");
    serverAPI.routerHook.removeRoute("/primehack-hotkeys");
    serverAPI.routerHook.removeRoute("/wiiu-hotkeys");
    serverAPI.routerHook.removeRoute("/duckstation-hotkeys");
    serverAPI.routerHook.removeRoute("/ps2-hotkeys");

    serverAPI.routerHook.removeRoute("/n3ds-hotkeys-alt");
    serverAPI.routerHook.removeRoute("/retroarch-hotkeys-alt");
    serverAPI.routerHook.removeRoute("/gamecube-hotkeys-alt");
    serverAPI.routerHook.removeRoute("/primehack-hotkeys-alt");
    serverAPI.routerHook.removeRoute("/wiiu-hotkeys-alt");
    serverAPI.routerHook.removeRoute("/duckstation-hotkeys-alt");
    serverAPI.routerHook.removeRoute("/ps2-hotkeys-alt");
  }
}
