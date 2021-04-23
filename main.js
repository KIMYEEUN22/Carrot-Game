const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const playBtn = document.querySelector('.game__playBtn');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const popup = document.querySelector('.pop-up--hide');
const popupText = document.querySelector('.pop-up__text');
const popupReplay = document.querySelector('.pop-up__replay');

const CARROT_SIZE = 80;
const CARROT_COUNT = 7;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 5;

let started = false;
let score = CARROT_COUNT;
let timer = undefined;

gameField.addEventListener('click', onfieldClick);

playBtn.addEventListener('click', (event) => {
    if(started){
        stopGame();
    } else {
        startGame();
    }
});

popupReplay.addEventListener('click', () => {
    window.location.reload(true);
})

function startGame() {
    started = true;
    initGame();
    showStopBtn();
    showScoreAndTimer();
    startTimer();
}

function stopGame() {
    started = false;
    stopTimer();
    hideGameBtn();
    showPopup('replay❓');
}

function finishGame(win){
    started = false;
    stopTimer();
    hideGameBtn();
    showPopup(win ? 'YOU WIN🎉' : 'YOU LOST💩');
}

function showStopBtn() {
    const icon = playBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
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

function showPopup(text) {
    popup.setAttribute('class', 'pop-up');
    popupText.textContent = text;
}

function initGame() {
    gameField.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onfieldClick(event) {
    if(!started){
        return;
    }
    const id = event.target.dataset.id;
    const target = event.target;

    if(target.matches('.carrot')){
        target.remove();
        score--;
        updateScoreBoard();
        if(score == 0){
            finishGame(true);
        }
    } else if(target.matches('.bug')){
        finishGame(false);
    }
}

function updateScoreBoard() {
    gameScore.innerHTML = score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i=0; i < count ; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.setAttribute('alt', className);
        item.setAttribute('data-id', `${className}${i}`);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        gameField.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min
}