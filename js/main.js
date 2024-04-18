'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let end = true, flashId;
let level, score, point, times, great, miss, display_time;

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
    let a_dx = 5;
    let a_word = Math.floor(Math.random() * 26);

    let a = new Alphabet(a_x, a_dx, a_word);
    alphabet.push(a);
};



//~~~~~~~~~~~~MAIN LOOP~~~~~~~~~~~~~
let test_x = 0;

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    if (alphabet.length > 0) {
        for (let i = 0; i < alphabet.length; i++) {
            ctx.drawImage(letter[alphabet[i].word], alphabet[i].x, 270);

            alphabet[i].x += alphabet[i].dx;
        };
        if (alphabet[0].x > canvas.width) {
            alphabet.shift();
        };
    };

    style_settings('#fff', '#fff', 'bold 20px sans-serif');
    if (display_time > 0) {
        display_time--;
        let textWidth = ctx.measureText(great).width;
        ctx.fillText(great, (425 - textWidth) / 2 + 600, 400);
    }

    console.log('main');

    ctx.font = 'bold 45px sans-serif';
    ctx.fillText('SCORE：' + score, 50, canvas.height - 25);
    ctx.fillText('Lv.' + level, 530, 70);
    ctx.strokeRect(700, 30, 250, 45);
    ctx.fillStyle = '#55f';
    ctx.fillRect(770, 350, 30, 5);
    ctx.fillRect(830, 350, 30, 5);
    ctx.fillStyle = '#f55';
    ctx.fillRect(800, 350, 30, 5);


    let id;
    if (end) {
        window.cancelAnimationFrame(id);
        start();
    } else {
        id = window.requestAnimationFrame(main);
    };
};

function judge(a) {

    if (a == alphabet[0].word) {

        display_time = 20;
        if (alphabet[0].x >= 770 && alphabet[0].x <= 860) {

            great = 'GREAT!  ×1.2';

            if (alphabet[0].x >= 800 && alphabet[0].x <= 830) {

                great = 'PERFECT!!  ×1.5';
            }

        } else {
            great = 'NICE ×1.0';
        }
    } else {
        miss--;
    }
}




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


    if (e.keyCode >= 65 && e.keyCode <= 90 && end == false) {
        let key = e.keyCode - 65;
        judge(key);
    }
};






start();

function start() {
    //initialize
    alphabet = [];
    score = 0, level = 0, point = 0, times = 2, miss = 3, display_time = 0;


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