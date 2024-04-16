'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let end = true, flashId;
let level = 0, i = -1;
let alphabet_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const letter = [];
for (let im = 0; im < 26; im++) {
    const img = new Image();
    img.src = './img/' + im + '_.png';
    letter.push(img);
}

class Alphabet {
    constructor(x, dx, word) {
        this.x = x;
        this.dx = dx;
        this.word = word;
    };
};
let alphabet = [];

function alphabetAdd() {
    let a_x = 0;
    let a_dx = 1;
    let a_word = Math.floor(Math.random() * 26);

    let a = new Alphabet(a_x, a_dx, a_word);
    alphabet.push(a);
};



//~~~~~~~~~~~~MAIN LOOP~~~~~~~~~~~~~
let test_x = 0;

function main() {
    let id;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < alphabet.length; i++) {
        ctx.drawImage(letter[alphabet[i].word], alphabet[i].x, 270);

        alphabet[i].x += alphabet[i].dx;
        if (alphabet[i].x > canvas.width) {
            alphabet.shift();
        }
    };


    style_settings('#fff', null, 'bold 45px sans-serif');
    ctx.fillText('SCORE：', 50, canvas.height - 25);
    ctx.fillText('Lv.' + level, 530, 70);

    console.log('main');
    if (end) {
        window.cancelAnimationFrame(id);
        start();
    } else {
        id = window.requestAnimationFrame(main);
    };
};




document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 32 && end == true) {
        end = false;

        clearInterval(flashId);
        flashId = null;

        main();
    };

    if (e.keyCode == 27 && end == false) {
        end = true;
    };

    if (e.keyCode == 13 && end == false) {
        alphabetAdd();
    };
};


start();

function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    style_settings('#fff', null, 'bold 80px sans-serif');
    let startText = 'TIMING TYPING';
    let textWidth = ctx.measureText(startText).width;
    ctx.fillText(startText, (canvas.width - textWidth) / 2, 300);

    style_settings('#fff', null, 'bold 15px sans-serif');
    ctx.fillText('PRESS ESCAPE KEY TO BACK TO TITLE', 20, 615);
    ctx.fillText('© chikuwa_ah', 860, 615);

    flashId = setInterval(flashText, 800);
};

let flash = 0;
function flashText() {

    ctx.font = 'bold 40px sans-serif';
    let startText = 'PRESS SPACE!!';
    let textWidth = ctx.measureText(startText).width;
    ctx.clearRect(0, 350, canvas.width, 100);

    if (flash == 0) {
        ctx.fillStyle = '#fff';
        ctx.fillText(startText, (canvas.width - textWidth) / 2, 400);
        flash = 1;

    } else if (flash == 1) {
        ctx.fillStyle = '#ccc';
        ctx.fillText(startText, (canvas.width - textWidth) / 2, 400);
        flash = 0;

    };
};

function style_settings(fillStyle, strokeStyle, font) {
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.font = font;
};