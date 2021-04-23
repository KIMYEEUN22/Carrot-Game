const playBtn = document.querySelector('.playBtn');
const main = document.querySelector('main');
const imgBox = document.querySelector('.img');
const msgBox = document.querySelector('.alert');

let cnt = 0;

function getImage(){
    let x = new Array();
    let y = new Array();
    let x1 = new Array();
    let y1 = new Array();

    for(let i = 0 ; i < 7 ; i++){
        x[i] = Math.floor(Math.random() * 181) + 230;
        y[i] = Math.floor(Math.random() * 500) + 50;
        x1[i] = Math.floor(Math.random() * 181) + 230;
        y1[i] = Math.floor(Math.random() * 500) + 50;
    }
    console.log(x);
    console.log(y);

    imgBox.innerHTML = `
    <img src="/img/carrot.png" alt="carrot" class="carrot" data-id="c1" style="display: flex ; position: absolute; top: ${x[0]}px; left: ${y[0]}px">
    <img src="/img/carrot.png" alt="carrot" class="carrot" data-id="c2" style="display: flex ; position: absolute; top: ${x[1]}px; left: ${y[1]}px">
    <img src="/img/carrot.png" alt="carrot" class="carrot" data-id="c3" style="display: flex ; position: absolute; top: ${x[2]}px; left: ${y[2]}px">
    <img src="/img/carrot.png" alt="carrot" class="carrot" data-id="c4" style="display: flex ; position: absolute; top: ${x[3]}px; left: ${y[3]}px">
    <img src="/img/carrot.png" alt="carrot" class="carrot" data-id="c5" style="display: flex ; position: absolute; top: ${x[4]}px; left: ${y[4]}px">
    <img src="/img/carrot.png" alt="carrot" class="carrot" data-id="c6" style="display: flex ; position: absolute; top: ${x[5]}px; left: ${y[5]}px">
    <img src="/img/carrot.png" alt="carrot" class="carrot" data-id="c7" style="display: flex ; position: absolute; top: ${x[6]}px; left: ${y[6]}px">

    <img src="/img/bug.png" alt="bug" class="bug" data-id="b1" style="display: flex ; position: absolute; top: ${x1[0]}px; left: ${y1[0]}px">
    <img src="/img/bug.png" alt="bug" class="bug" data-id="b2" style="display: flex ; position: absolute; top: ${x1[1]}px; left: ${y1[1]}px">
    <img src="/img/bug.png" alt="bug" class="bug" data-id="b3" style="display: flex ; position: absolute; top: ${x1[2]}px; left: ${y1[2]}px">
    <img src="/img/bug.png" alt="bug" class="bug" data-id="b4" style="display: flex ; position: absolute; top: ${x1[3]}px; left: ${y1[3]}px">
    <img src="/img/bug.png" alt="bug" class="bug" data-id="b5" style="display: flex ; position: absolute; top: ${x1[4]}px; left: ${y1[4]}px">
    <img src="/img/bug.png" alt="bug" class="bug" data-id="b6" style="display: flex ; position: absolute; top: ${x1[5]}px; left: ${y1[5]}px">
    <img src="/img/bug.png" alt="bug" class="bug" data-id="b7" style="display: flex ; position: absolute; top: ${x1[6]}px; left: ${y1[6]}px">
    `
}

function count(sign) {
    const countTag = document.querySelector('.counter');
    let cnt = imgBox.getElementsByTagName("*").length - 7;
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
    const timerTag = document.querySelector('.timer');
    let num = 10;
    
    const timer = setInterval(() => {
        timerTag.innerHTML = ` 0 : ${num} `;
        num --;
        //console.log(num);
        if(num == -1) {
            clearInterval(timer);
            msgBox.innerHTML = `
            <footer class="footer">
                <div class="box">
                    <button class="replay">
                        <i class="fas fa-redo-alt" data-id="replay"></i>
                    </button>
                    <span class="msg">you lost💩</span> 
                </div>
            </footer>
            `;
        } 
    },1000);
    imgBox.addEventListener('click', (event) => {
        if(event.target.alt == 'bug'){
            console.log('bug');
            clearInterval(timer);
            msgBox.innerHTML = `
            <footer class="footer">
                <div class="box">
                    <button class="replay">
                        <i class="fas fa-redo-alt" data-id="replay"></i>
                    </button>
                    <span class="msg">you lost💩</span> 
                </div>
            </footer>
            `;
        } else if(event.target.alt == 'carrot'){
            let cnt = count();
            console.log(cnt);
            if(cnt == 1){
                clearInterval(timer);
                msgBox.innerHTML = `
                <footer class="footer">
                    <div class="box">
                        <button class="replay">
                            <i class="fas fa-redo-alt" data-id="replay"></i>
                        </button>
                        <span class="msg">you won🎉</span> 
                    </div>
                </footer>
                `;
            }
        }
    });
}

playBtn.addEventListener('click', (event) => {
        getImage();
        startTimer();

        playBtn.innerHTML = `
        <i class="fas fa-square" data-id="play"></i>
        `;
        console.log(event.target.dataset.id);
        if(event.target.dataset.id){
            count(1);
        }
});

main.addEventListener('click', (event) => {
    const id = event.target.dataset.id;

    if(event.target.alt == 'carrot'){
        const tobeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
        tobeDeleted.remove();
        count();
    } else if (id == 'replay'){
        window.location.reload(true);
    }

});