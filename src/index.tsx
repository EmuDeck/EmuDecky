import { definePlugin, ServerAPI, staticClasses } from "decky-frontend-lib";
import { FaCloudUploadAlt } from "react-icons/fa";
import { getTranslateFunc } from "./TranslationsF";
// import { GlobalContext } from "./context/globalContext";
// import React from "react";

//
// components
//
import Content from "./components/Content";

//
// hooks
//

//
// imports & requires
//
import { logo } from "./common/images";
import configureRouter from "./router/configureRouter";

export default definePlugin((serverAPI: ServerAPI) => {
  //
  // i18
  //

  //
  // Web services
  //

  //
  // Const & Vars
  //
  const t = getTranslateFunc();
  let isFirstWatching = true;
  let isFirstUploading = true;
  let isFirstInactive = true;
  let showToast = false;
  let intervalid: any;

  //
  // Functions
  //
  // const getSettings = () => {
  //   serverAPI.callPluginMethod("getSettings", {}).then((response) => {
  //     const result: any = response.result;
  //     const config: any = JSON.parse(result);
  //     console.log(config);
  //     return config;
  //   });
  // };

  const checkCloudStatus = () => {
    console.log("checkCloudStatus");
    serverAPI
      .callPluginMethod("emudeck", { command: "cloud_decky_check_status" })
      .then((response) => {
        const result = response.result;
        let bodyMessage: string = "";
        // console.log({ result });
        if (result === "started" && isFirstWatching) {
          isFirstWatching = false;
          isFirstUploading = true;
          isFirstInactive = true;
          showToast = true;
          bodyMessage = t("startWatcherBody");
        }
        if (result === "uploading" && isFirstUploading) {
          isFirstWatching = true;
          isFirstUploading = false;
          isFirstInactive = true;
          showToast = true;
          bodyMessage = t("uploadingWatcherBody");
        }

        if (result === "finished" && isFirstInactive) {
          isFirstWatching = true;
          isFirstUploading = true;
          isFirstInactive = false;
          showToast = true;
          bodyMessage = t("exitWatcherBody");
        }

        if (result === "disabled") {
          isFirstWatching = false;
          isFirstUploading = false;
          isFirstInactive = false;
          intervalid.clearInterval();
        }

        if (showToast) {
          serverAPI.toaster.toast({
            title: "EmuDeck CloudSync",
            body: bodyMessage,
            logo: <img width="20" style={{ marginTop: "8px", marginLeft: "10px" }} src={logo} />,
          });
        }
        showToast = false;
        bodyMessage = "";
      })
      .catch((error) => {
        serverAPI.toaster.toast({
          title: "EmuDeck CloudSync",
          body: error,
          logo: <img src={logo} />,
        });
      });
  };

  //
  // States
  //

  //
  // UseEffects
  //

  //
  // Logic
  //

  // const settingsEmuDeck = getSettings();
  const cloud_sync_status = false;

  if (cloud_sync_status) {
    intervalid = setInterval(() => {
      checkCloudStatus();
    }, 1000);
  }

  configureRouter(serverAPI, true);
  //
  // Render
  //

  //   const [statePage, setStatePage] = useState<{
  //     settingsEmuDeck: any;
  //     stateAPI: ServerAPI;
  //   }>({
  //     settingsEmuDeck: getSettings(),
  //     stateAPI: serverAPI,
  //   });
  //
  //   const { settingsEmuDeck } = statePage;

  return {
    title: <div className={staticClasses.Title}>EmuDecky</div>,
    // content: (
    //   <GlobalContext.Provider value={{ statePage, setStatePage }}>
    //     <Content serverAPI={serverAPI} />
    //   </GlobalContext.Provider>
    // ),
    content: <Content serverAPI={serverAPI} />,
    icon: <FaCloudUploadAlt />,
    onDismount() {
      console.log("Dismount");
      console.log("Cleaning up Interval");
      clearInterval(intervalid);
      configureRouter(serverAPI, false);
    },
  };
});
