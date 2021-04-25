'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();
const game = new Game(5, 3, 3);
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
