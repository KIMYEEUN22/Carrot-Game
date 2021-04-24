'use strict';
import PopUp from './popup.js';
import GameField from './game-field.js';
import * as sound from './sound.js';

const playBtn = document.querySelector('.game__playBtn');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');

const CARROT_COUNT = 7;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 5;

let started = false;
let score = CARROT_COUNT;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListner(() => {
    startGame();
});

const gameField = new GameField(CARROT_COUNT, BUG_COUNT);
gameField.setClickListner(onItemClick);

function onItemClick(item){
    if(!started){
        return;
    }
    if(item === 'carrot'){
        score--;
        updateScoreBoard();
        if(score == 0){
            sound.playWin();
            finishGame(true);
        }
    } else if(item === 'bug'){
        finishGame(false);
    }
}

playBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started = true;
    initGame();
    showStopBtn();
    showScoreAndTimer();
    startTimer();
    sound.playBackground();
}

function stopGame() {
    started = false;
    stopTimer();
    hideGameBtn();
    gameFinishBanner.showText('replay❓');
    sound.playAlert();
    sound.stopBackground();
}

function finishGame(win){
    started = false;
    stopTimer();
    hideGameBtn();
    sound.stopBackground();
    gameFinishBanner.showText(win ? 'YOU WIN🎉' : 'YOU LOST💩');
}

function showStopBtn() {
    const icon = playBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    playBtn.style.visibility = 'visible';
}

function hideGameBtn() {
    playBtn.style.visibility = 'hidden';
}

function showScoreAndTimer() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
    if(remainingTimeSec <= 0) {
        finishGame(false);
        return;
    } 
    updateTimerText(--remainingTimeSec);
    },1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = ` ${minutes} : ${seconds} `;
}

function initGame() {
    gameField.init();
    score = CARROT_COUNT;
    gameScore.innerHTML = CARROT_COUNT;
}

function updateScoreBoard() {
    gameScore.innerHTML = score;
}
