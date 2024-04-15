'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let end = true, flashId;
let level = 0;





//~~~~~~~~~~~~MAIN LOOP~~~~~~~~~~~~~

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let id;


    ctx.font = 'bold 45px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('SCORE：', 50, canvas.height - 25);
    ctx.fillText('Lv.' + level, 530, 70);

    console.log('main');
    if (end) {
        window.cancelAnimationFrame(id);
        start();
    } else {
        id = window.requestAnimationFrame(main);
    }
}




document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 32 && end == true) {
        console.log('start');
        end = false;

        clearInterval(flashId);
        flashId = null;

        main();
    }

    if (e.keyCode == 27 && end == false) {
        console.log('stop');
        end = true;
    }

}


start();

function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 80px sans-serif';
    ctx.fillStyle = '#fff';
    let startText = 'TIMING TYPING';
    let textWidth = ctx.measureText(startText).width;
    ctx.fillText(startText, (canvas.width - textWidth) / 2, 300);

    flashId = setInterval(flashText, 800);
}

let flash = 0;
function flashText() {

    ctx.font = 'bold 40px sans-serif';
    let startText = 'PRESS SPACE!!';
    let textWidth = ctx.measureText(startText).width;

    if (flash == 0) {
        ctx.clearRect(0, 350, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fillText(startText, (canvas.width - textWidth) / 2, 400);
        flash = 1;

    } else if (flash == 1) {
        ctx.clearRect(0, 350, canvas.width, canvas.height);
        ctx.fillStyle = '#ccc';
        ctx.fillText(startText, (canvas.width - textWidth) / 2, 400);
        flash = 0;

    }
}