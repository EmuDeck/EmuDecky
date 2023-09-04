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
} from "decky-frontend-lib";

import { VFC } from "react"; //import { GlobalContext } from "./context/globalContext";

interface DropDownList {
  name: string;
  value: string;
}

let dropDownList: DropDownList[] = [];

const Content: VFC<{ serverAPI: ServerAPI }> = () => {
  let dropdownOptions: DropdownOption[] = [];

  //const { statePage, setStatePage } = useContext(GlobalContext);

  // const { serverAPI, RABezels: raBezels } = statePage;

  //console.log({ statePage });

  // serverAPI.callPluginMethod("getSettings", {}).then((response: any) => {
  //   const result: any = response.result;
  //   const config: any = JSON.parse(result);
  //   console.log(config);
  //   setStatePage(config);
  // });

  // const {
  //   cloud_sync_status,
  //   RABezels: raBezels,
  //   // DolphinWide: dolphinWide,
  //   // RAHandClassic2D: raHandClassic2D,
  //   // RAHandClassic3D: raHandClassic3D,
  //   // RAHandHeldShader: raHandHeldShader,
  //   // RAautoSave: raautoSave,
  //   // SNESAR: snesAR,
  //   // arClassic3D,
  //   // arDolphin,
  //   // arSega,
  //   // arSnes,
  //   // duckWide,
  // } = statePage;

  const listSega = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "3:2",
      value: "ls",
    },
  ];
  const listNintendo = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "8:7",
      value: "ls",
    },
  ];
  const list3D = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "16:9",
      value: "ls",
    },
  ];
  const listGC = [
    {
      name: "4:3",
      value: "ls",
    },
    {
      name: "16:9",
      value: "ls",
    },
  ];

  dropdownOptions.push(createSystemAR("Classic Sega Systems", listSega));
  dropdownOptions.push(createSystemAR("Classic Nintendo Systems", listNintendo));
  dropdownOptions.push(createSystemAR("Classic 3D Games", list3D));
  dropdownOptions.push(createSystemAR("GameCube", listGC));

  function createSystemAR(systemName: string, list: DropDownList[]) {
    dropDownList = dropDownList.concat(list);
    return {
      label: systemName,
      options: list.map((a) => {
        return { data: a.value, label: a.name } as SingleDropdownOption;
      }),
    } as MultiDropdownOption;
  }

  const toggleFunction = (comando: string) => {
    console.log(comando);
  };

  return (
    <div>
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
          <ToggleField label="AutoSave" checked={false} layout="below" onChange={() => toggleFunction("AutoSave")} />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField label="Bezels" checked={false} layout="below" onChange={() => toggleFunction("RABezels")} />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label="LCD Shader for handhelds"
            checked={false}
            layout="below"
            onChange={() => console.log("pepe")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label="CRT Shader for retro 2D games"
            checked={false}
            layout="below"
            onChange={() => console.log("pepe")}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ToggleField
            label="CRT Shader for retro 3D games"
            checked={false}
            layout="below"
            onChange={() => console.log("pepe")}
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
              const emuDeckCommand = e.data;
              console.log({ emuDeckCommand });
              //executa(emuDeckCommand);
            }}
          />
        </PanelSectionRow>
      </PanelSection>
    </div>
  );
};

export default Content;
