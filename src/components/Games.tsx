import { VFC, useState } from "react";
import { Tabs, Button, Focusable } from "decky-frontend-lib";

const Games: VFC<{ serverAPI: any }> = ({ serverAPI }) => {
  const [currentTab, setCurrentTab] = useState<string>("Tab1");

  //Fake Json from the backend for testing
  const jsonTabs = [
    {
      title: "Super Nintendo",
      id: "snes",
      launcher: "/home/deck/Emulation/tools/launchers/retroarch.sh -L /core/snes9x.dll",
      games: [
        {
          name: "Super Mario World",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
        {
          name: "Super Mario World 2",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart 2",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
        {
          name: "Super Mario World 3",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart 3",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
        {
          name: "Super Mario World 4",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart 4",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
        {
          name: "Super Mario World 5",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart 5",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
        {
          name: "Super Mario World 6",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart 7",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
        {
          name: "Super Mario World 8",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart 8",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
        {
          name: "Super Mario World 9",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart 9",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
        {
          name: "Super Mario World 10",
          img: "https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Super Mario Kart 10",
          img: "https://cdn2.steamgriddb.com/thumb/366db7a591a75efd125cb44641124f2e.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
      ],
    },
    {
      title: "Nintendo Wii",
      id: "n64",
      launcher: "/home/deck/Emulation/tools/launchers/retroarch.sh -L /core/snes9x.dll",
      games: [
        {
          name: "Super Mario Galaxy 2",
          img: "https://cdn2.steamgriddb.com/thumb/e407ebda50100920810c87e64a79abd8.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario World (USA).zip",
        },
        {
          name: "Mario Kart Wii",
          img: "https://cdn2.steamgriddb.com/thumb/3fb22546e0a13fb8b5d7345218eef2a5.jpg",
          filename: "/home/deck/Emulation/roms/Super Mario Kart (USA).zip",
        },
      ],
    },
  ];

  const launchGame = (launcher: string, game: string) => {
    console.log("Lontana do your magic", launcher, game);
  };

  //We push the image
  // Lontana magic again

  //We build the tabs
  const tabs = jsonTabs.map((item) => {
    return {
      title: item.title,
      id: item.id,
      content: (
        <Focusable className="games">
          {item["games"].map((game) => {
            return (
              <Button
                className="game"
                key={game.name}
                onClick={() => {
                  launchGame(item.launcher, game.filename);
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

  console.log({ tabs });

  // const tabs = [
  //   {
  //     title: "Super Nintendo",
  //     id: "snes",
  //     launcher: "/home/deck/Emulation/tools/launchers/retroarch.sh",
  //     content: games,
  //   },
  //   { title: "Nintendo", id: "nes", launcher: "/home/deck/Emulation/tools/launchers/retroarch.sh", content: games2 },
  // ];

  //   const games = (
  //     <Focusable>
  //       <div className="games">
  //         <div className="game">
  //           <img className="game__img" src="https://cdn2.steamgriddb.com/thumb/8908077ce7fd405516d81c2c929de429.jpg" />
  //           <img className="game__bg" src="https://cdn2.steamgriddb.com/thumb/8908077ce7fd405516d81c2c929de429.jpg" />
  //         </div>
  //         <div className="game">
  //           <img className="game__img" src="https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg" />
  //           <img className="game__bg" src="https://cdn2.steamgriddb.com/thumb/5414ac8f3723b3b3b411cdd6e8b9f01b.jpg" />
  //         </div>
  //       </div>
  //     </Focusable>
  //   );
  //
  //   const games2 = (
  //     <Focusable>
  //       <div className="games">
  //         <div className="game">
  //           <img className="game__img" src="https://cdn2.steamgriddb.com/thumb/8908077ce7fd405516d81c2c929de429.jpg" />
  //           <img className="game__bg" src="https://cdn2.steamgriddb.com/thumb/8908077ce7fd405516d81c2c929de429.jpg" />
  //         </div>
  //       </div>
  //     </Focusable>
  //   );

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

        }
        .game.gpfocus, .game:hover{
          transition-duration: .05s;
          transition-timing-function: ease-out;
          filter: brightness(0.8) contrast(1.05) saturate(1);
          transform: scale(1.08)
        }
        .game__img{
          position:relative;
          width:100%;

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
