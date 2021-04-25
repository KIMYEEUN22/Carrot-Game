'use strict';
import GameField from './game-field.js';
import * as sound from './sound.js';

export default class GameBuilder {
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }

    withBugCount(num){
        this.bugCount = num;
        return this;
    }

    build() {
        console.log(this);
        return new Game(
            this.gameDuration, //
            this.carrotCount,
            this.bugCount
        )
    }
}

class Game {
    constructor(durationSec, carrotCount, bugCount) {
        this.durationSec = durationSec;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameScore = document.querySelector('.game__score');
        this.gameTimer = document.querySelector('.game__timer');
        this.playBtn = document.querySelector('.game__playBtn');
        this.playBtn.addEventListener('click', () => {
            if(this.started){
                this.stop();
            } else {
                this.start();
            }
        });

        this.gameField = new GameField(carrotCount, bugCount);
        this.gameField.setClickListner(this.onItemClick);
        
        this.started = false;
        this.score = carrotCount;
        this.timer = undefined;

    }

    setGameStopListner(onGameStop){
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopBtn();
        this.showScoreAndTimer();
        this.startTimer();
        sound.playBackground();
    }
    
    stop() {
        this.started = false;
        this.stopTimer();
        this.hideGameBtn();
        sound.playAlert();
        sound.stopBackground();
        this.onGameStop && this.onGameStop('cancel');
    }

    finish(win){
        this.started = false;
        this.stopTimer();
        this.hideGameBtn();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lost');
    }
    

    onItemClick = (item) => {
        if(!this.started){
            return;
        }
        if(item === 'carrot'){
            this.score--;
            this.updateScoreBoard();
            if(this.score == 0){
                sound.playWin();
                this.finish(true);
            }
        } else if(item === 'bug'){
            this.finish(false);
        }
    }
 
    showStopBtn() {
        const icon = this.playBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.playBtn.style.visibility = 'visible';
    }
    
    hideGameBtn() {
        this.playBtn.style.visibility = 'hidden';
    }
    
    showScoreAndTimer() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    startTimer(){
        let remainingTimeSec = this.durationSec;
        console.log(this.durationSec);
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
            this.finish(false);
            return;
        } 
        this.updateTimerText(--remainingTimeSec);
        },1000);
    }
    
    stopTimer() {
        clearInterval(this.timer);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerHTML = ` ${minutes} : ${seconds} `;
    }
    
    initGame() {
        this.gameField.init();
        this.score = this.carrotCount;
        this.gameScore.innerHTML = this.carrotCount;
    }
    
    updateScoreBoard() {
        this.gameScore.innerHTML = this.score;
    }
}
