const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const playBtn = document.querySelector('.game__playBtn');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const popup = document.querySelector('.pop-up--hide');
const popup__msg = document.querySelector('.pop-up__msg');

const CARROT_SIZE = 80;
const CARROT_COUNT = 7;
const BUG_COUNT = 7;

let started = false;
let score = 0;
let timer = undefined;

playBtn.addEventListener('click', (event) => {
    if(started){
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});

function startGame() {
    initGame();
    showStopBtn();
    showScoreAndTimer();
    startTimer();
}

function stopGame() {

}

function showStopBtn() {
    const icon = playBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showScoreAndTimer() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame() {
    gameField.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
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

function counter() {
    let cnt = gameField.getElementsByTagName("*").length - 7;
    //console.log(cnt);

    gameScore.innerHTML = `
    ${cnt}
    `;

    return cnt;
}

function startTimer(){
    let num = 10;
    
    const timer = setInterval(() => {
        gameTimer.innerHTML = ` 0 : ${num} `;
        num --;
        //console.log(num);
        if(num == -1) {
            clearInterval(timer);
            popup.setAttribute('class', 'pop-up');
            popup__msg.textContent = `you lost💩`;
        } 
    },1000);
    gameField.addEventListener('click', (event) => {
        if(event.target.alt == 'bug'){
            console.log('bug');
            clearInterval(timer);
            popup.setAttribute('class', 'pop-up');
            popup__msg.textContent = `you lost💩`;
        } else if(event.target.alt == 'carrot'){
            let cnt = counter();
            console.log(cnt,'ouo');
            if(cnt == 0){
                clearInterval(timer);
                popup.setAttribute('class', 'pop-up');
            }
        }
    });
}

gameField.addEventListener('click', (event) => {
    const id = event.target.dataset.id;

    if(event.target.alt == 'carrot'){
        const tobeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
        tobeDeleted.remove();
        counter();
    } else if (id == 'replay'){
        window.location.reload(true);
    }

});