'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let end = true, flashId;
let level, score, point, point_display, times, great, miss, display_time, speed, alphabet_display, alphabet_time;

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
    let a_x = -90;
    let a_dx = speed;
    let a_word = Math.floor(Math.random() * 26);

    let a = new Alphabet(a_x, a_dx, a_word);
    alphabet.push(a);
};



//~~~~~~~~~~~~MAIN LOOP~~~~~~~~~~~~~
let test_x = 0;
let level_up;

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    if (alphabet.length > 0) {
        for (let i = 0; i < alphabet.length; i++) {
            ctx.drawImage(letter[alphabet[i].word], alphabet[i].x, 270);

            alphabet[i].x += alphabet[i].dx;
        };
        if (alphabet[0].x > canvas.width) {
            display_time = 30;
            great = 'MISS';
            miss--;
            alphabet.shift();
        };
    };


    alphabet_display--;
    if (alphabet_display <= 0) {
        alphabet_display = alphabet_time;
        alphabetAdd();
    }




    if (point >= 800) {
        level++;
        point = 0;
        level_up = 1000;
        alphabet_display = 0;
        alphabet = [];
        if (level % 2 == 0) {
            speed++;
            alphabet_time -= 70;
            if (alphabet_time < 70) {
                alphabet_time = 70;
            }
        } else if (level % 2 == 1) {
            times++;
        }
    }





    style_settings('#fff', '#fff', 'bold 20px sans-serif');

    if (display_time > 0) {
        display_time--;
        let textWidth = ctx.measureText(great).width;
        ctx.fillText(great, (425 - textWidth) / 2 + 600, 400);
    } else {
        great = '';
    }

    if (point > point_display) {
        point_display += 10;
    } else {
        point_display = point;
    }
    ctx.fillRect(100, 90, point_display, 10);

    ctx.font = 'bold 45px sans-serif';
    if (level_up > -300) {
        ctx.fillText('LEVEL UP!', level_up, 320);
        level_up -= 10;
    }
    ctx.fillText('SCORE：' + score, 50, canvas.height - 25);
    let lv_text = 'Lv.' + level;
    let textWidth = ctx.measureText(lv_text).width;
    ctx.fillText(lv_text, (canvas.width - textWidth) / 2, 70);
    ctx.strokeRect(100, 90, 800, 10);
    ctx.fillStyle = '#5ff';
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

    display_time = 30;
    let score_add = 0;

    if (a == alphabet[0].word) {

        if (alphabet[0].x >= 735 && alphabet[0].x <= 825) {

            great = 'GREAT!  ×1.0';
            score_add = level * 40;

            if (alphabet[0].x >= 765 && alphabet[0].x <= 795) {

                great = 'PERFECT!!  ×1.2';
                score_add = level * 40 * 1.2;
            }

            point += 800 / times
        } else {
            great = 'TIMING MISS';
            miss--;
        }
    } else {
        great = 'TYPE MISS';
        miss--;
    }

    score += score_add;
    alphabet.shift();
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
    score = 0, level = 1, point = 0, point_display = 0, times = 2, miss = 3, display_time = 0, speed = 2, alphabet_display = 0, alphabet_time = 300;


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