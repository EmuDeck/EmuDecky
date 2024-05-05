import { VFC, useState } from "react";
import { Tabs, Button, Focusable } from "decky-frontend-lib";

const Games: VFC = () => {
  const [currentTab, setCurrentTab] = useState<string>("Tab1");

  //Fake Json from the backend.
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
     }}
   >
      <style>{`
        .games{
          display: flex;
          flex-wrap: wrap;
          gap:15px;
          height:100%;
        }
        .game{
          position:relative;
          width: calc(20% - 15px);
          border-radius:10px;
          transition: .5s;
          border:0px;
          padding:0;
          line-height:0;
          max-height:218px;
        }
        .game.gpfocus{
          transform: scale(1.1);
          transition: .5s
        }
        .game__img{
          position:relative;
          width:100%;
          border-radius:10px;
        }
        .game__bg{
          position:absolute;
          z-index: -1;
          top:5px;
          left:-5%;
          filter:blur(100px);
          opacity:0;
          width:100%;
        }
        .game.gpfocus.game__bg{
          opacity:0.2
        }
      `}</style>
      <Tabs
        title="Theme Manager"
        activeTab={currentTab}
        onShowTab={(tabID: string) => {
          setCurrentTab(tabID);
        }}
        tabs={tabs}
      />
    </div>
  );
};

export { Games };
