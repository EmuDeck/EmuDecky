import { VFC, useState, useEffect } from "react";
import { Tabs, Button, Focusable, SteamSpinner } from "decky-frontend-lib";
import { launchApp } from "../common/steamshortcuts";

const Games: VFC<{ serverAPI: any }> = ({ serverAPI }) => {
  const [state, setState] = useState<any>({ games: undefined, tabs: undefined });
  let { games, tabs } = state;
  const [currentTab, setCurrentTab] = useState<string>("Tab1");

  const getDataGames = async () => {
    const cacheGames = localStorage.getItem("emudecky_gamelist");

    if (cacheGames) {
      const gameList: any = JSON.parse(cacheGames);
      setState({ ...state, games: gameList });
    } else {
      serverAPI.callPluginMethod("emudeck_dirty", { command: `generateGameLists` }).then((response: any) => {
        //serverAPI.callPluginMethod("generate_roms_json").then((response: any) => {
        const result: any = response.result;
        const gameList: any = JSON.parse(result);
        gameList.sort((a: any, b: any) => a.title.localeCompare(b.title));
        console.log({ gameList });
        localStorage.setItem("emudecky_gamelist", result);
        setState({ ...state, games: gameList });
      });
    }
  };

  useEffect(() => {
    getDataGames();
  }, []);

  useEffect(() => {
    if (games) {
      const tabs = games.map((item: any) => {
        return {
          title: item.title,
          id: item.id,
          content: (
            <Focusable className="games">
              {item["games"].map((game: any) => {
                return (
                  <Button
                    className="game"
                    key={game.name}
                    onClick={() => {
                      launchGame(item.launcher, game.filename, game.name);
                    }}>
                    <img className="game__img" src={game.img} alt={game.name} />
                    <img className="game__bg" src={game.img} alt={game.name} />
                  </Button>
                );
              })}
            </Focusable>
          ),
        };
      });
      setState({ ...state, tabs: tabs });
    }
  }, [games]);

  const launchGame = (launcher: string, game: string, name: string) => {
    const launcherComplete = launcher.replace(/{file.path}/g, `"${game}"`);
    launchApp(serverAPI, {
      name: name,
      exec: `${launcherComplete}`,
    });
  };

  return (
    <div
      style={{
        marginTop: "40px",
        height: "calc(100% - 40px)",
        background: "#0e141b",
      }}>
      <style>{`
        .games{
          // display: flex;
          // flex-wrap: wrap;
          // gap:15px;
          // height:100%;
          grid-template-columns: repeat(auto-fill, 133px);
          grid-auto-rows: 199.5px;
          gap: 42px 16px;
          font-size: 18.1364px;
          padding-left: 8px;
          padding-right: 8px;
          display: grid;
          box-sizing: border-box;
          user-select: none;
          width: 100%;
          height: auto;
          padding: 8px 0px;
          grid-auto-flow: row;
          justify-content: space-between;
        }
        .game{
          //position:relative;
          //width: calc(20% - 15px);
          // transition: .5s;
          border:0px;
          padding:0;
          line-height:0;
          // max-height:218px;
          overflow: visible;
          border: none;
          box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, .25);
          filter: brightness(0.9);
          transition: filter, box-shadow, transform .1s cubic-bezier(0.16, 0.86, 0.43, 0.99);
          outline: none;
          box-sizing: content-box;
          width: 100%;
          height: 100%;
          margin: 0;
          position: relative;
          cursor: pointer;
          transform-origin: 50% 50%;
          transform-style: preserve-3d;
          transform: scale(0.98)
          background:#efefef

        }
        .game.gpfocus, .game:hover{
          transition-duration: .05s;
          transition-timing-function: ease-out;
          filter: brightness(0.8) contrast(1.05) saturate(1);
          transform: scale(1.08)
        }
        .game__img{
          display: inline-block;
           font-family: Arial, sans-serif;
           font-weight: 300;
           line-height: 2;
           text-align: center;
           width:100%;
           position: relative;
        }

        .game__img:before{
          content: '';
           width: 100%;
           height: 100%;
           background-color: #efefef;
           position: absolute;
           top: 0;
           left: 0;
        }

        .game__img:after{
          content: attr(alt);
           font-size: 18px;
           color: rgb(100, 100, 100);
           display: block;
           position: absolute;
           z-index: 2;
           top: 5px;
           left: 0;
           width: 100%;
           height: 100%;
        }

        .game__bg{
           width: 130px;
           height: 200px;
           position: absolute;
           z-index: -99;
           transform: translateY(0%) translateX(-100%) scaleX(0.8) scaleY(0.8);
           margin: auto;
           padding-top: 0 !important;
           filter: saturate(3) brightness(200%) blur(50px);
           opacity: 0;
           object-fit: fill;
           pointer-events: none;
           transition-property: opacity, transform;
           transition-duration: .4s;
           transition-timing-function: ease-in-out;
        }
        .game.gpfocus  .game__bg, .game:hover  .game__bg{
          opacity: 0.4;
          transform: translateY(0%) translateX(-100%) scaleX(1) scaleY(1);
          transition-property: opacity, transform;
        }
      `}</style>
      {!tabs && (
        <div>
          <div style={{ textAlign: "center", height: "100vh" }}>
            <SteamSpinner>
              <p>Generating Database, please be patient</p>
              <p>Each game takes about 1 second to be scraped for the first time</p>
            </SteamSpinner>
          </div>
        </div>
      )}

      {tabs && (
        <Tabs
          title="Theme Manager"
          activeTab={currentTab}
          onShowTab={(tabID: string) => {
            setCurrentTab(tabID);
          }}
          tabs={tabs}
        />
      )}
    </div>
  );
};

export { Games };
