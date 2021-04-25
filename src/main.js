'use strict';
import PopUp from './popup.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .withGameDuration(5)
    .withCarrotCount(3)
    .withBugCount(3)
    .build();

game.setGameStopListner((reason => {
    console.log(reason);
    let message;
    switch(reason){
        case 'cancel':
            message = 'REPLAY❓';
            break;
        case 'win':
            message = 'YOU WIN🎉';
            break;
        case 'lost':
            message = 'YOU LOST💩';
            break;
        default: throw new Error('not valid reason');

    }
    gameFinishBanner.showText(message);
}))

gameFinishBanner.setClickListner(() => {
    game.start();
});