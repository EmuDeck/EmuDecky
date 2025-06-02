import {
  ButtonItem,
  Menu,
  MenuItem,
  PanelSection,
  PanelSectionRow,
  Router,
  Navigation,
  ServerAPI,
  showContextMenu,
  ToggleField,
  SingleDropdownOption,
  Dropdown,
  DropdownOption,
  MultiDropdownOption,
  SteamSpinner,
} from "decky-frontend-lib";
import { getTranslateFunc } from "../TranslationsF";
import React, { VFC } from "react"; //import { GlobalContext } from "./context/globalContext";
import { GlobalContext } from "../context/globalContext";
import { useContext, useState, useEffect } from "react";
import { launchApp } from "../common/steamshortcuts";

interface DropDownList {
  value: string;
  command: string;
  setting: string;
}

let dropDownList: DropDownList[] = [];

const Content: VFC<{ serverAPI: ServerAPI }> = () => {
  let dropdownOptions: DropdownOption[] = [];
  const t = getTranslateFunc();

  // @ts-ignore
  const { serverAPI } = useContext(GlobalContext);

  const [state, setState] = useState({
    serverAPI: undefined,
    emuDeckConfig: {
      cloud_sync_status: undefined,
      netPlay: undefined,
      RABezels: undefined,
      RAHandClassic2D: undefined,
      RAHandClassic3D: undefined,
      RAHandHeldShader: undefined,
      RAautoSave: undefined,
      arClassic3D: undefined,
      arDolphin: undefined,
      arSega: undefined,
      arSnes: undefined,
      branch: null,
      systemOS: "",
      toolsPath: undefined,
    },
    updating: false,
    msg: "",
  });

  const getData = async (update: Boolean) => {
    await serverAPI.callPluginMethod("getSettings", {}).then((response: any) => {
      const result: any = response.result;

      let emuDeckConfig: any = JSON.parse(result);
      console.log(emuDeckConfig);
      if (update) {
        setState({ ...state, serverAPI, emuDeckConfig, updating: false, msg: msg });
      } else {
        setState({ ...state, serverAPI, emuDeckConfig, msg: msg });
      }
    });
  };

  const forceUpload = async (name: string) => {
    let command;
    if (systemOS == "nt") {
      command =
        'PowerShell -ExecutionPolicy Bypass -Command "& {. "$env:APPDATAEmuDeck\backend\functions/all.ps1"; cloud_sync_uploadEmuAll}"';
    } else {
      command = `${toolsPath}/wrappers/cloud_sync_force_upload.sh`;
    }

    launchApp(serverAPI, {
      name: name,
      exec: command,
    });
  };

  const forceDownload = async (name: string) => {
    let command;
    if (systemOS == "nt") {
      command =
        'PowerShell -ExecutionPolicy Bypass -Command "& {. "$env:APPDATAEmuDeck\backend\functions/all.ps1"; cloud_sync_downloadEmuAll}"';
    } else {
      command = `${toolsPath}/wrappers/cloud_sync_force_download.sh`;
    }
    launchApp(serverAPI, {
      name: name,
      exec: command,
    });
  };

  useEffect(() => {
    if (state.emuDeckConfig.cloud_sync_status === undefined) {
      getData(false);
    }
    console.log({ state });
  }, [state]);
  const { emuDeckConfig, updating, msg } = state;
  const {
    cloud_sync_status,
    netPlay,
    RABezels,
    RAHandClassic2D,
    RAHandClassic3D,
    RAHandHeldShader,
    RAautoSave,
    arClassic3D,
    arDolphin,
    arSega,
    arSnes,
    branch,
    systemOS,
    toolsPath,
  } = emuDeckConfig;

  const listsega = [
    {
      value: "4:3",
      command: "decky_set_ar_sega",
      setting: "arSega",
    },
    {
      value: "3:2",
      command: "decky_set_ar_sega",
      setting: "arSega",
    },
  ];
  const listnintendo = [
    {
      value: "4:3",
      command: "decky_set_ar_nintendo",
      setting: "arSnes",
    },
    {
      value: "8:7",
      command: "decky_set_ar_nintendo",
      setting: "arSnes",
    },
  ];
  const listretro3D = [
    {
      value: "4:3",
      command: "decky_set_ar_3d",
      setting: "arClassic3d",
    },
    {
      value: "16:9",
      command: "decky_set_ar_3d",
      setting: "arClassic3d",
    },
  ];
  const listgc = [
    {
      value: "4:3",
      command: "decky_set_ar_dolphin",
      setting: "arDolphin",
    },
    {
      value: "16:9",
      command: "decky_set_ar_dolphin",
      setting: "arDolphin",
    },
  ];
  const getAR = (system: any) => {
    switch (system) {
      case "169":
        return "16:9";
      case "43":
        return "4:3";
      case "87":
        return "8:7";
      case "32":
        return "3:2";
      case 169:
        return "16:9";
      case 43:
        return "4:3";
      case 87:
        return "8:7";
      case 32:
        return "3:2";
      default:
        return "N/A";
    }
  };

  dropdownOptions.push(createSystemAR("Classic Sega Systems", listsega));
  dropdownOptions.push(createSystemAR("Classic Nintendo Systems", listnintendo));
  dropdownOptions.push(createSystemAR("Classic 3D Games", listretro3D));
  dropdownOptions.push(createSystemAR("Nintendo GameCube", listgc));

  function createSystemAR(systemName: string, list: DropDownList[]) {
    dropDownList = dropDownList.concat(list);
    return {
      label: systemName,
      options: list.map((a) => {
        return { data: a.command, label: a.value, config: a.setting } as SingleDropdownOption;
      }),
    } as MultiDropdownOption;
  }

  //Toggles function
  const toggleFunction = (emuDeckCommand: string) => {
    setState({
      ...state,
      updating: true,
      msg: `${emuDeckCommand}`,
    });
    serverAPI
      .callPluginMethod("emudeck", {
        command: `${emuDeckCommand}`,
      })
      .then((response: any) => {
        const result: any = response.result;
        console.log({ result });
        getData(true);
      });
  };
  //Dropdown function
  const setFunction = (incoming: any) => {
    const { data, label } = incoming;
    console.log({ incoming });
    const newValue = label.replace(":", "");
    serverAPI.callPluginMethod("emudeck", { command: `${data} ${newValue}` }).then((response: any) => {
      const result: any = response.result;
      console.log({ result });
    });
  };

  return (
    <>
      <PanelSection title={t("ControlsTitle")}>
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={(e: any) =>
              showContextMenu(
                <Menu label="Menu" cancelText="Cancel" onCancel={() => {}}>
                  <MenuItem
                    onSelected={() => {
                      Navigation.CloseSideMenus();
                      Navigation.Navigate("/retroarch-hotkeys");
                    }}>
                    Retro Systems, Dreamcast, N64, Saturn, etc.
                  </MenuItem>
                  <MenuItem
                    onSelected={() => {
                      Router.Navigate("/n3ds");
                    }}>
                    Nintendo 3DS - Citra
                  </MenuItem>
                  <MenuItem
                    onSelected={() => {
                      Router.Navigate("/gamecube");
                    }}>
                    Nintendo GameCube - Dolphin
                  </MenuItem>
                  <MenuItem
                    onSelected={() => {
                      Router.Navigate("/wii");
                    }}>
                    Nintendo Wii - Dolphin
                  </MenuItem>
                  <MenuItem
                    onSelected={() => {
                      Router.Navigate("/wiiu");
                    }}>
                    Nintendo Wii U - Cemu
                  </MenuItem>
                  <MenuItem
                    onSelected={() => {
                      Router.Navigate("/yuzu");
                    }}>
                    Nintendo Switch - Yuzu
                  </MenuItem>
                  <MenuItem
                    onSelected={() => {
                      Router.Navigate("/primehack");
                    }}>
                    PrimeHack
                  </MenuItem>
                  <MenuItem
                    onSelected={() => {
                      Router.Navigate("/duckstation");
                    }}>
                    Sony PlayStation - DuckStation
                  </MenuItem>
                  <MenuItem
                    onSelected={() => {
                      Router.Navigate("/ps2");
                    }}>
                    Sony PlayStation 2 - PCSX22
                  </MenuItem>
                </Menu>,
                e.currentTarget ?? window
              )
            }>
            {t("CheatsheetButton")}
          </ButtonItem>
        </PanelSectionRow>
      </PanelSection>
      {(branch === "early" && systemOS !== "nt") ||
      (branch === "retail" && systemOS !== "nt") ||
      (branch === "early-unstable" && systemOS !== "nt") ||
      (branch === "early-unstable-py" && systemOS !== "nt") ||
      (branch === "dev" && systemOS !== "nt") ||
      (branch === null && systemOS !== "nt") ? (
        <PanelSection title={t("ImportTitle")}>
          <PanelSectionRow>
            <ButtonItem
              layout="below"
              onClick={() =>
                launchApp(serverAPI, {
                  name: t("ImportTitle"),
                  exec: `${toolsPath}/server.sh`,
                })
              }>
              {t("ImportButton")}
            </ButtonItem>
          </PanelSectionRow>
        </PanelSection>
      ) : (
        ""
      )}
      <PanelSection title={t("QuickSettingsTitle")}>
        {(branch === "early" && systemOS !== "nt") ||
        (branch === "retail" && systemOS !== "nt") ||
        (branch === "early-unstable" && systemOS !== "nt") ||
        (branch === "early-unstable-py" && systemOS !== "nt") ||
        (branch === "dev" && systemOS !== "nt") ||
        (branch === null && systemOS !== "nt") ? (
          <>
            <PanelSectionRow>
              <ToggleField
                label="CloudSync"
                checked={cloud_sync_status == true ? true : false}
                layout="below"
                disabled={updating ? true : false}
                onChange={() => toggleFunction("decky_cloud_sync_status")}
              />
            </PanelSectionRow>
            <PanelSectionRow>
              <ButtonItem layout="below" onClick={() => forceUpload(t("UploadBtn"))}>
                {t("UploadBtn")}
              </ButtonItem>
              <ButtonItem layout="below" onClick={() => forceDownload(t("DownloadBtn"))}>
                {t("DownloadBtn")}
              </ButtonItem>
            </PanelSectionRow>
          </>
        ) : (
          ""
        )}
        {systemOS != "nt" && (
          <PanelSectionRow>
            <ToggleField
              label="RetroArch local Co-Op"
              checked={netPlay == true ? true : false}
              layout="below"
              disabled={updating ? true : false}
              onChange={() => toggleFunction("decky_netplay")}
            />
          </PanelSectionRow>
        )}
        <PanelSectionRow>
          <ToggleField
            label="AutoSave"
            checked={RAautoSave == true ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("decky_autoSave")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label={t("Bezels")}
            checked={RABezels == true ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("decky_bezels")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label={t("LCDShader")}
            checked={RAHandHeldShader == true ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("decky_shaders_LCD")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label={t("CRTShader2D")}
            checked={RAHandClassic2D == true ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("decky_shaders_2D")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label={t("CRTShader3D")}
            checked={RAHandClassic3D == true ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("decky_shaders_3D")}
          />
        </PanelSectionRow>
      </PanelSection>
      <PanelSection title={t("AspectRatiosTitle")}>
        <PanelSectionRow>
          {arSega === undefined || arSnes === undefined || arClassic3D === undefined || arDolphin === undefined ? (
            <div>
              <SteamSpinner />
            </div>
          ) : (
            <div>
              <p>Sega Classics: {getAR(arSega)}</p>
              <p>Nintendo Classics: {getAR(arSnes)}</p>
              <p>3D Classics: {getAR(arClassic3D)}</p>
              <p>Nintendo GameCube: {getAR(arDolphin)}</p>
            </div>
          )}
          <Dropdown
            strDefaultLabel={t("AspectRatiosSelect")}
            rgOptions={dropdownOptions}
            selectedOption={dropdownOptions[0]}
            disabled={
              arSega === undefined || arSnes === undefined || arClassic3D === undefined || arDolphin === undefined
                ? true
                : false
            }
            onChange={(e: SingleDropdownOption) => {
              setFunction(e);
            }}
          />
        </PanelSectionRow>
      </PanelSection>
      {systemOS != "nt" && (
        <PanelSection title={t("UpdateEmusTitle")}>
          <PanelSectionRow>
            <ButtonItem
              layout="below"
              onClick={() =>
                launchApp(serverAPI, {
                  name: t("UpdateEmusTitle"),
                  exec: `${toolsPath}/wrappers/update-emulators.sh`,
                })
              }>
              {t("UpdateEmusTitle")}
            </ButtonItem>
          </PanelSectionRow>
        </PanelSection>
      )}
    </>
  ); // Return;
};

export default Content;
