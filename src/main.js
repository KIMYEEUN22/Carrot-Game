"use strict";
import PopUp from "./popup.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(7)
  .withBugCount(7)
  .build();

game.setGameStopListner((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "REPLAY❓";
      sound.playAlert;
      break;
    case Reason.win:
      message = "YOU WIN🎉";
      sound.playWin;
      break;
    case Reason.lost:
      message = "YOU LOST💩";
      sound.playBug;
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showText(message);
});

gameFinishBanner.setClickListner(() => {
  game.start();
});
