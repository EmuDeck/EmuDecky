import { VFC } from "react";
import { DialogButton, Router } from "decky-frontend-lib";

import {
  n3dscontrols,
  n3dshotkeys,
  duckstationcontrols,
  duckstationhotkeysalt,
  duckstationhotkeys,
  gamecubecontrols,
  gamecubehotkeysalt,
  gamecubehotkeys,
  primehackcontrols,
  primehackhotkeysalt,
  primehackhotkeys,
  ps2controls,
  ps2hotkeysalt,
  ps2hotkeys,
  rahotkeys,
  wiiclassiccontrols,
  wiicontrols,
  wiihotkeysalt,
  wiihotkeys,
  wiinunchuckcontrols,
  //wiimotecontrols,
  wiiucontrols,
  wiiuhotkeys,
  yuzucontrols,
  yuzuhotkeysalt,
  yuzuhotkeys,
} from "../common/images";

const RAHotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <img style={{ width: "100%" }} src={rahotkeys} alt="Hotkeys" />
    </div>
  );
};
const CitraControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/n3ds")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/n3ds-hotkeys")}>Hotkeys</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={n3dscontrols} alt="Hotkeys" />
    </div>
  );
};
const CitraHotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/n3ds")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/n3ds-hotkeys")}>Hotkeys</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={n3dshotkeys} alt="Hotkeys" />
    </div>
  );
};

const GameCubeControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/gamecube")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/gamecube-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/gamecube-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={gamecubecontrols} alt="Hotkeys" />
    </div>
  );
};
const GameCubeHotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/gamecube")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/gamecube-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/gamecube-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={gamecubehotkeys} alt="Hotkeys" />
    </div>
  );
};

const GameCubeHotkeysAlt: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/gamecube")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/gamecube-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/gamecube-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={gamecubehotkeysalt} alt="Hotkeys" />
    </div>
  );
};

const WiiControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/wii")}>Wiimote</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-nunchuck")}>Nunchuck</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-classic")}>Controller</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys-alt")}>Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={wiicontrols} alt="Hotkeys" />
    </div>
  );
};

const WiiNunchuckControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/wii")}>Wiimote</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-nunchuck")}>Nunchuck</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-classic")}>Controller</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys-alt")}>Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={wiinunchuckcontrols} alt="Hotkeys" />
    </div>
  );
};

const WiiClassicControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/wii")}>Wiimote</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-nunchuck")}>Nunchuck</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-classic")}>Controller</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys-alt")}>Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={wiiclassiccontrols} alt="Hotkeys" />
    </div>
  );
};

const WiiHotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/wii")}>Wiimote</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-nunchuck")}>Nunchuck</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-classic")}>Controller</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys-alt")}>Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={wiihotkeys} alt="Hotkeys" />
    </div>
  );
};

const WiiHotkeysAlt: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/wii")}>Wiimote</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-nunchuck")}>Nunchuck</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-classic")}>Controller</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wii-hotkeys-alt")}>Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={wiihotkeysalt} alt="Hotkeys" />
    </div>
  );
};

const PrimeHackControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/primehack")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/primehack-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/primehack-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={primehackcontrols} alt="Hotkeys" />
    </div>
  );
};
const PrimeHackHotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/primehack")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/primehack-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/primehack-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={primehackhotkeys} alt="Hotkeys" />
    </div>
  );
};
const PrimeHackHotkeysAlt: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/primehack")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/primehack-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/primehack-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={primehackhotkeysalt} alt="Hotkeys" />
    </div>
  );
};
const WiiUControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/wiiu")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wiiu-hotkeys")}>Hotkeys</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={wiiucontrols} alt="Hotkeys" />
    </div>
  );
};
const WiiUHotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/wiiu")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/wiiu-hotkeys")}>Hotkeys</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={wiiuhotkeys} alt="Hotkeys" />
    </div>
  );
};

const YuzuControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/yuzu")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/yuzu-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/yuzu-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={yuzucontrols} alt="Hotkeys" />
    </div>
  );
};

const YuzuHotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/yuzu")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/yuzu-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/yuzu-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={yuzuhotkeys} alt="Hotkeys" />
    </div>
  );
};

const YuzuHotkeysAlt: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/yuzu")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/yuzu-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/yuzu-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={yuzuhotkeysalt} alt="Hotkeys" />
    </div>
  );
};
const DuckstationControls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/duckstation")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/duckstation-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/duckstation-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={duckstationcontrols} alt="Hotkeys" />
    </div>
  );
};
const DuckstationHotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/duckstation")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/duckstation-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/duckstation-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={duckstationhotkeys} alt="Hotkeys" />
    </div>
  );
};
const DuckstationHotkeysAlt: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/duckstation")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/duckstation-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/duckstation-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={duckstationhotkeysalt} alt="Hotkeys" />
    </div>
  );
};
const PS2Controls: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/ps2")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/ps2-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/ps2-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={ps2controls} alt="Hotkeys" />
    </div>
  );
};
const PS2Hotkeys: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/ps2")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/ps2-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/ps2-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={ps2hotkeys} alt="Hotkeys" />
    </div>
  );
};
const PS2HotkeysAlt: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <div style={{ display: "flex" }}>
        <DialogButton onClick={() => Router.Navigate("/ps2")}>Controls</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/ps2-hotkeys")}>Hotkeys</DialogButton>
        <DialogButton onClick={() => Router.Navigate("/ps2-hotkeys-alt")}>Hotkeys - Expert</DialogButton>
      </div>
      <img style={{ width: "100%" }} src={ps2hotkeysalt} alt="Hotkeys" />
    </div>
  );
};

export {
  RAHotkeys,
  CitraControls,
  CitraHotkeys,
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
};
