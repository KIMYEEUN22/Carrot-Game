const playBtn = document.querySelector('.game__playBtn');
const game__field = document.querySelector('.game__field');
const fieldRect = game__field.getBoundingClientRect();
const CARROT_SIZE = 80;

let cnt = 0;

function initGame() {
    addItem('carrot', 7, 'img/carrot.png');
    addItem('bug', 7, 'img/bug.png');
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
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        game__field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min
}

function counter(sign) {
    const countTag = document.querySelector('.game__score');
    let cnt = game__field.getElementsByTagName("*").length - 7;
    //console.log(cnt);
    if(sign){
        countTag.innerHTML = `
        7
        `  
    }

    countTag.innerHTML = `
    ${cnt}
    `;

    return cnt;
}

function startTimer(){
    const timerTag = document.querySelector('.game__timer');
    const popup = document.querySelector('.pop-up--hide');
    const popup__msg = document.querySelector('.pop-up__msg');
    let num = 10;
    
    const timer = setInterval(() => {
        timerTag.innerHTML = ` 0 : ${num} `;
        num --;
        //console.log(num);
        if(num == -1) {
            clearInterval(timer);
            popup.setAttribute('class', 'pop-up');
            popup__msg.textContent = `you lost💩`;
        } 
    },1000);
    game__field.addEventListener('click', (event) => {
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

playBtn.addEventListener('click', (event) => {
        initGame();
        startTimer();

        playBtn.innerHTML = `
        <i class="fas fa-square" data-id="play"></i>
        `;
        console.log(event.target.dataset.id);
        if(event.target.dataset.id){
            counter(1);
        }
});

game__field.addEventListener('click', (event) => {
    const id = event.target.dataset.id;

    if(event.target.alt == 'carrot'){
        const tobeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
        tobeDeleted.remove();
        counter();
    } else if (id == 'replay'){
        window.location.reload(true);
    }

});