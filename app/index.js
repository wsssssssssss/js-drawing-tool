console.log('hello world');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const nav = document.querySelector("nav");
const addImg = nav.querySelector(".addImg");
const selectPen = nav.querySelector(".selectPen")
const eraser = nav.querySelector(".eraser");
const addSquare = nav.querySelector(".addSquare");
const selectColor = nav.querySelector(".selectColor");
const save = nav.querySelector(".save");
const root = document.querySelector("#root");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let drawing = false;
let tool = "selectPen";

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

nav.addEventListener('click', e => {
    if (e.target.className === 'addImg') {
        tool = "addImg";
    } else if (e.target.className === 'selectPen') {
        tool = "selectPen";
    } else if (e.target.className === 'eraser') {
        tool = "eraser";
    } else if (e.target.className === 'addSquare') {
        tool = "addSquare";
    } else if (e.target.className === 'selectColor') {
        tool = "selecColor";
    } else {
        tool = "save";
    }
})

canvas.addEventListener("mousedown", e => {
    const x = e.offsetX;
    const y = e.offsetY;
    if (tool === "selectPen") {
        drawing = true
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
});
canvas.addEventListener("mousemove", e => {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!drawing) return;
    ctx.lineTo(x, y);
    ctx.stroke();
});
root.addEventListener("mouseup", () => {
    drawing = false
});


// let mouseX;
// let mouseY;
// function onMouseMove(e) {
//     mouseX = parseInt(e.clientX-offsetX);
//     mouseY = parseInt(e.clientY-offsetY);

//     if
// }