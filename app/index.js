console.log('hello world');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const nav = document.querySelector("nav");
const addImg = nav.querySelector(".addImg");
const selectPen = nav.querySelector(".selectPen")
const eraser = nav.querySelector(".eraser");
const addSquare = nav.querySelector(".addSquare");
const selectColor = nav.querySelector(".selectColor > label");
const save = nav.querySelector(".save");
const root = document.querySelector("#root");
const color = document.querySelector('input[type="color"]');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
const $ = canvas.addEventListener;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let drawing = false;
let erase;
let tool = "selectPen";
let squareTool = false;

// let square = {
//     startX: 0,
//     startY: 0,
//     x: 0,
//     y: 0
// };
// let squares = [];
let startX, startY, x, y;
let img = new Image();
img.src = '';

ctx.lineWidth = 50;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = color.value;

const navClickHendler = e => {
    if (e.target.className === 'addImg') {
        console.log('이미지 추가');
        return;
    }
    if (e.target.className === 'selectPen') {
        tool = "selectPen";
        ctx.globalCompositeOperation = 'source-over';
        return;
    }
    if (e.target.className === 'eraser') {
        tool = "eraser";
        ctx.globalCompositeOperation = 'destination-out';
        return;
    }
    if (e.target.className === 'addSquare') {
        tool = "addSquare";
        return;
    }
    if (e.target.className === 'save') {
        tool = "save";
        return;
    }
}
const canvasMousedownHendler = e => {
    const x = e.offsetX;
    const y = e.offsetY;
    startX = x;
    startY = y;
    // square.startX = x;
    // square.startY = y;
    if (tool === "selectPen") {
        drawing = true;
        ctx.strokeStyle = color.value;
        ctx.beginPath();
        ctx.moveTo(x, y);
        return;
    }
    if (tool === "eraser") {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
        return;
    }
    if (tool === 'addSquare') {
        squareTool = true;
        return;
    }
}
const canvasPenToolMousemoveHendler = e => {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!drawing) {
        return;
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
const canvasSquareToolMousemoveHendler = e => {
    x = e.offsetX;
    y = e.offsetY;
    if (!squareTool) {
        return;
    } else {
        // square.x = e.offsetX;
        // square.y = e.offsetY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // for(let i = 0; i < squares.length; i++) {
        //     ctx.fillRect(squares[i].square.startX, squares[i].square.startY, squares[i].square.x - square.startX, squares[i].square.y - square.startY);
        // }
        ctx.fillStyle = color.value;
        ctx.fillRect(startX, startY, x - startX, y - startY);
        // ctx.fillRect(startX, startY, square.x - startX, square.y - startY);
    }
}
const canvasMouseupHendler = () => {
    drawing = false;
    squareTool = false;
    // squares.push(square);
    // square = {
    //     x: 0,
    //     y: 0,
    //     startX: 0,
    //     startY: 0
    // };
}
const canvasMouseoutHendler = () => {
    drawing = false;
    squareTool = false;
}

nav.addEventListener('click', navClickHendler);
$("mousedown", canvasMousedownHendler);
$("mousemove", canvasPenToolMousemoveHendler);
$("mousemove", canvasSquareToolMousemoveHendler);
$("mouseup", canvasMouseupHendler);
$('mouseout', canvasMouseoutHendler)