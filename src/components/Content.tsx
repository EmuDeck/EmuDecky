import {
  ButtonItem,
  Menu,
  MenuItem,
  PanelSection,
  PanelSectionRow,
  Router,
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
    },
    updating: false,
  });
  const getData = async (update: Boolean) => {
    await serverAPI.callPluginMethod("getSettings", {}).then((response: any) => {
      const result: any = response.result;
      const emuDeckConfig: any = JSON.parse(result);
      if (update) {
        setState({ ...state, serverAPI, emuDeckConfig, updating: false });
      } else {
        setState({ ...state, serverAPI, emuDeckConfig });
      }
    });
  };

  useEffect(() => {
    console.log("state change");
    if (state.emuDeckConfig.cloud_sync_status === undefined) {
      getData(false);
    }
  }, [state]);
  const { emuDeckConfig, updating } = state;
  const {
    cloud_sync_status,
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
  } = emuDeckConfig;

  console.log({ emuDeckConfig });

  const listsega = [
    {
      value: "4:3",
      command: "RetroArch_setCustomizations",
      setting: "arSega",
    },
    {
      value: "3:2",
      command: "RetroArch_setCustomizations",
      setting: "arSega",
    },
  ];
  const listnintendo = [
    {
      value: "4:3",
      command: "RetroArch_setCustomizations",
      setting: "arSnes",
    },
    {
      value: "8:7",
      command: "RetroArch_setCustomizations",
      setting: "arSnes",
    },
  ];
  const listretro3D = [
    {
      value: "4:3",
      command: "Decky_setAR",
      setting: "arClassic3d",
    },
    {
      value: "16:9",
      command: "Decky_setAR",
      setting: "arClassic3d",
    },
  ];
  const listgc = [
    {
      value: "4:3",
      command: "Dolphin_setCustomizations",
      setting: "arDolphin",
    },
    {
      value: "16:9",
      command: "Dolphin_setCustomizations",
      setting: "arDolphin",
    },
  ];
  const getAR = (system: string) => {
    switch (system) {
      case "169":
        return "16:9";
      case "43":
        return "4:3";
      case "87":
        return "8:7";
      case "32":
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
  const toggleFunction = (configNameValue: string, emuDeckCommand: string) => {
    setState({ ...state, updating: true });

    const itemValue = emuDeckConfig[configNameValue];
    const newValue = itemValue === "true" ? "false" : "true";
    serverAPI
      .callPluginMethod("emudeck", { command: `setSetting ${configNameValue} ${newValue} && ${emuDeckCommand}` })
      .then((response: any) => {
        const result: any = response.result;
        console.log({ result });
        getData(true);
      });
  };
  //Dropdown function
  const setFunction = (incoming: any) => {
    const { config, data, label } = incoming;

    const newValue = label.replace(":", "");
    console.log({ state });
    serverAPI
      .callPluginMethod("emudeck", { command: `setSetting ${config} ${newValue} && ${data}` })
      .then((response: any) => {
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
                      Router.Navigate("/retroarch-hotkeys");
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
      <PanelSection title={t("QuickSettingsTitle")}>
        {branch === "early" || branch === "early-early" || branch === "dev" || branch === null ? (
          <PanelSectionRow>
            <ToggleField
              label="CloudSync"
              checked={cloud_sync_status === "true" ? true : false}
              layout="below"
              disabled={updating ? true : false}
              onChange={() => toggleFunction("cloud_sync_status", "pwd")}
            />
          </PanelSectionRow>
        ) : (
          ""
        )}
        <PanelSectionRow>
          <ToggleField
            label="AutoSave"
            checked={RAautoSave === "true" ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("RAautoSave", "Decky_autoSave")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label={t("Bezels")}
            checked={RABezels === "true" ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("RABezels", "Decky_bezels")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label={t("LCDShader")}
            checked={RAHandHeldShader === "true" ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("RAHandHeldShader", "Decky_shaders_LCD")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label={t("CRTShader2D")}
            checked={RAHandClassic2D === "true" ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("RAHandClassic2D", "Decky_shaders_2D")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label={t("CRTShader3D")}
            checked={RAHandClassic3D === "true" ? true : false}
            layout="below"
            disabled={updating ? true : false}
            onChange={() => toggleFunction("RAHandClassic3D", "Decky_shaders_3D")}
          />
        </PanelSectionRow>
      </PanelSection>
      <PanelSection title={t("AspectRatiosTitle")}>
        <PanelSectionRow>
          {console.log({ arSega })}
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
    </>
  ); // Return;
};

export default Content;
