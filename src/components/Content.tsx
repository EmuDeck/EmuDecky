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

import React, { VFC } from "react"; //import { GlobalContext } from "./context/globalContext";
import { GlobalContext } from "../context/globalContext";
import { useContext, useState, useEffect } from "react";

interface DropDownList {
  name: string;
  value: string;
}

let dropDownList: DropDownList[] = [];

const Content: VFC<{ serverAPI: ServerAPI }> = () => {
  let dropdownOptions: DropdownOption[] = [];

  // const { emuchievementsState } = useContext(GlobalContext);

  const { serverAPI } = useContext(GlobalContext);

  const [state, setState] = useState({
    serverAPI: undefined,
    config: {
      cloud_sync_status: undefined,
    },
  });

  useEffect(() => {
    console.log("state change");
    console.log({ state });
    if (state.config.cloud_sync_status === undefined) {
      const getData = async () => {
        await serverAPI.callPluginMethod("getSettings", {}).then((response: any) => {
          const result: any = response.result;
          const config: any = JSON.parse(result);
          setState({ serverAPI, config });
        });
      };
      getData();
    }
  }, [state]);
  const { config } = state;
  const {
    cloud_sync_status,
    RABezels,
    DolphinWide,
    RAHandClassic2D,
    RAHandClassic3D,
    RAHandHeldShader,
    RAautoSave,
    SNESAR,
    arClassic3D,
    arDolphin,
    arSega,
    arSnes,
    duckWide,
  } = config;

  const listsega = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "3:2",
      value: "ls",
    },
  ];
  const listnintendo = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "8:7",
      value: "ls",
    },
  ];
  const listretro3D = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "16:9",
      value: "ls",
    },
  ];
  const listgc = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "16:9",
      value: "ls",
    },
  ];
  const listduckstation = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "16:9",
      value: "ls",
    },
  ];

  dropdownOptions.push(createSystemAR("Classic Sega Systems", listsega));
  dropdownOptions.push(createSystemAR("Classic Nintendo Systems", listnintendo));
  dropdownOptions.push(createSystemAR("Classic 3D Games", listretro3D));
  dropdownOptions.push(createSystemAR("Nintendo GameCube", listgc));
  dropdownOptions.push(createSystemAR("Sony Playstation", listduckstation));

  function createSystemAR(systemName: string, list: DropDownList[]) {
    dropDownList = dropDownList.concat(list);
    return {
      label: systemName,
      options: list.map((a) => {
        return { data: a.value, label: a.name } as SingleDropdownOption;
      }),
    } as MultiDropdownOption;
  }

  const toggleFunction = (configNameValue) => {
    const itemValue = config[configNameValue];
    const newValue = itemValue === "true" ? "false" : "true";
    serverAPI
      .callPluginMethod("emudeck", { command: `setSetting ${configNameValue} ${newValue}` })
      .then((response: any) => {
        const result: any = response.result;
        console.log({ result });
      });
  };
  const setFunction = (data) => {
    // const emuDeckCommand = e.data;
    console.log({ data });
    // const itemValue = config[configNameValue];
    // const newValue = itemValue === "true" ? "false" : "true";
    // serverAPI
    //   .callPluginMethod("emudeck", { command: `setSetting ${configNameValue} ${newValue} && ${emuDeckCommand}` })
    //   .then((response: any) => {
    //     const result: any = response.result;
    //     console.log({ result });
    //   });
  };

  return (
    state && (
      <>
        <PanelSection title="Controls & Hotkeys">
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
                      Sony PlayStation - DuckStation 2
                    </MenuItem>
                    <MenuItem
                      onSelected={() => {
                        Router.Navigate("/n3ds");
                      }}>
                      Nintendo
                    </MenuItem>
                  </Menu>,
                  e.currentTarget ?? window
                )
              }>
              Open Cheatsheet
            </ButtonItem>
          </PanelSectionRow>
        </PanelSection>
        <PanelSection title="Quick Settings">
          <PanelSectionRow>
            <ToggleField
              label="AutoSave"
              checked={RAautoSave === "true" ? true : false}
              layout="below"
              onChange={() => toggleFunction("RAautoSave", "Decky_autoSave")}
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <ToggleField
              label="Bezels"
              checked={RABezels === "true" ? true : false}
              layout="below"
              onChange={() => toggleFunction("RABezels", "Decky_bezels")}
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <ToggleField
              label="LCD Shader for handhelds"
              checked={RAHandHeldShader === "true" ? true : false}
              layout="below"
              onChange={() => toggleFunction("RAHandHeldShader", "Decky_shaders_LCD")}
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <ToggleField
              label="CRT Shader for retro 2D games"
              checked={RAHandClassic2D === "true" ? true : false}
              layout="below"
              onChange={() => toggleFunction("RAHandClassic2D", "Decky_shaders_2D")}
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <ToggleField
              label="CRT Shader for retro 3D games"
              checked={RAHandClassic3D === "true" ? true : false}
              layout="below"
              onChange={() => toggleFunction("RAHandClassic3D", "Decky_shaders_3D")}
            />
          </PanelSectionRow>
        </PanelSection>
        <PanelSection title="Aspect Ratios">
          <PanelSectionRow>
            <Dropdown
              strDefaultLabel="Change Aspect Ratios"
              rgOptions={dropdownOptions}
              selectedOption={dropdownOptions[0]}
              onChange={(e: SingleDropdownOption) => {
                setFunction(e);
              }}
            />
          </PanelSectionRow>
        </PanelSection>
      </>
    )
  );
};

export default Content;
