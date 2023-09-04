import {
  ButtonItem,
  definePlugin,
  DialogButton,
  Menu,
  MenuItem,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  showContextMenu,
  staticClasses,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { getTranslateFunc } from "./TranslationsF";
import logo from "./assets/img/steamdecklogo.png";

// interface AddMethodArgs {
//   left: number;
//   right: number;
// }

const Content: VFC<{ serverAPI: ServerAPI }> = () => {
  // const [result, setResult] = useState<number | undefined>();

  // const onClick = async () => {
  //   const result = await serverAPI.callPluginMethod<AddMethodArgs, number>(
  //     "add",
  //     {
  //       left: 2,
  //       right: 2,
  //     }
  //   );
  //   if (result.success) {
  //     setResult(result.result);
  //   }
  // };

  return (
    <PanelSection title="Panel Section">
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() =>
            //onClick={(e) =>
            showContextMenu(
              <Menu label="Menu" cancelText="CAAAANCEL" onCancel={() => {}}>
                <MenuItem onSelected={() => {}}>Item #1</MenuItem>
                <MenuItem onSelected={() => {}}>Item #2</MenuItem>
                <MenuItem onSelected={() => {}}>Item #3</MenuItem>
              </Menu>
              //e.currentTarget ?? window
            )
          }>
          Server says yolo
        </ButtonItem>
      </PanelSectionRow>

      <PanelSectionRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} />
        </div>
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Router.CloseSideMenus();
            Router.Navigate("/decky-plugin-test");
          }}>
          Router
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>
  );
};

const DeckyPluginRouterTest: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      Hello World!
      <DialogButton onClick={() => Router.NavigateToLibraryTab()}>Go to Library</DialogButton>
    </div>
  );
};

export default definePlugin((serverAPI: ServerAPI) => {
  const t = getTranslateFunc();

  let isFirstWatching = true;
  let isFirstUploading = true;
  let isFirstInactive = true;
  let showToast = false;
  let intervalid: any;

  const checkCloudStatus = () => {
    console.log("checkCloudStatus");

    //   echo "started"
    // elif [ ! -f "$HOME/emudeck/cloud.lock" ] && [ -f "$savesPath/.gaming" ]; then
    //   echo "uploading"
    // elif [ ! -f "$HOME/emudeck/cloud.lock" ] && [ ! -f "$savesPath/.gaming" ]; then
    //   echo "finished"
    // else
    //  echo "disabled"

    serverAPI
      .callPluginMethod("cloud_decky_check_status", { parameter_a: "Hello", parameter_b: "World" })
      .then((response) => {
        const result = response.result;
        let bodyMessage: string = "";
        console.log({ result });
        console.log({ isFirstWatching }, { isFirstUploading }, { isFirstInactive });
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

  console.log("Decky Loaded");

  intervalid = setInterval(() => {
    checkCloudStatus();
  }, 5000);

  serverAPI.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
    exact: true,
  });

  return {
    title: <div className={staticClasses.Title}>Example Plugin</div>,
    content: <Content serverAPI={serverAPI} />,
    icon: <FaCloudUploadAlt />,
    onDismount() {
      console.log("Dismount");
      console.log("Cleaning up Interval");
      clearInterval(intervalid);
      serverAPI.routerHook.removeRoute("/decky-plugin-test");
    },
  };
});
