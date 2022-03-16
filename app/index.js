console.log('hello world');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const nav = document.querySelector('nav');
const addImg = nav.querySelector('.addImg');
const selectPen = nav.querySelector('.selectPen');
const eraser = nav.querySelector('.eraser');
const addSquare = nav.querySelector('.addSquare');
const selectColor = nav.querySelector('.selectColor > label');
const save = nav.querySelector('.save');
const root = document.querySelector('#root');
const color = document.querySelector('input[type="color"');
const image = document.querySelector('input[type="file"');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
ctx.lineWidth = 50;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.strokeStyle = color.value;
let startX, startY, x, y;

let drawing = false;
let tool = "selectPen";

const navClickHendler = e => {
    if (e.target.className === 'selectPen') {
        tool = 'selectPen';
        ctx.globalCompositeOperation = 'source-over';
        return;
    }
    if (e.target.className === 'eraser') {
        tool = 'eraser';
        ctx.globalCompositeOperation = 'destination-out';
        return;
    }
    if (e.target.className === 'addSquare') {
        tool = 'addSquare';
        return;
    }
}

const canvasMousedownHendler = e => {
    x = e.offsetX;
    y = e.offsetY;
    startX = x;
    startY = y;
    drawing = true;
    if (tool === 'selectPen' || tool === 'eraser') {
        ctx.strokeStyle = color.value;
        ctx.beginPath();
        ctx.moveTo(x, y);
        return;
    }
}
const canvasMousemoveHendler = e => {
    x = e.offsetX;
    y = e.offsetY;
    if (tool === 'selectPen' || tool === 'eraser') {
        if (!drawing) {
            return;
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    if (tool === 'addSquare') {
        if (!drawing) {
            return;
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color.value;
            ctx.fillRect(startX, startY, x - startX, y - startY);
        }
    }
}
const canvasMouseupHendler = () => {
    drawing = false;
}

nav.addEventListener('click', navClickHendler);
canvas.addEventListener('mousedown', canvasMousedownHendler);
canvas.addEventListener('mousemove', canvasMousemoveHendler);
canvas.addEventListener('mouseup', canvasMouseupHendler);

/*
js canvas shapes painting
canvas add image
canvas save image to file
*/