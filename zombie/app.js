const board = document.querySelector('.board');

const cross = document.querySelector('.crosshair');
const scoreEl = document.querySelector('.score');

let score = 0;

function addScore(points) {
    score += points;
    scoreEl.innerText = score.toString().padStart(5,'0');


}

document.addEventListener('mousemove',function (e) {
    // console.log(e.pageX, e.pageY)
    cross.style.left = e.pageX + 'px';
    cross.style.top = e.pageY +'px';

});


setInterval(function () {
    const div = document.createElement('div');
    div.classList.add('zombie');
    {

        const min = 10;
        const max = 180;
        const pos = Math.floor(Math.random()*(max-min+1)+min);

        div.style.bottom= pos +'px';

        div.style.zIndex = max - pos;
    }


    {
        const min = 5;
        const max = 8;
        const time = Math.floor(Math.random()*(max-min+1)+min);
        div.style.animationDuration = `0.5s, ${time}s`;

    }

    {
        const min = 1;
        const max = 3;
        const part = Math.floor(Math.random()*(max-min+1)+min);
        const scale = 1 + part /10;
        div.style.transform = `scale(${scale})`
    }

    const zombies = board.querySelectorAll('.zombie');
    for(const el of zombies) {
        el.offsetLeft = el.offsetLeft;
    }

    div.addEventListener('animationend',function () {
        this.remove();

    });

    div.addEventListener('mousedown',function () {
        this.remove()
        addScore(79)
    });
    // div.addEventListener('touchstart',function () {
    //     this.remove()
    // });

    board.appendChild(div);

},1000);