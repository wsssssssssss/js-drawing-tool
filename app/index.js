console.log('hello world');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const nav = document.querySelector("nav");
const addImg = nav.querySelector(".addImg");
const selectPen = nav.querySelector(".selectPen")
const eraser = nav.querySelector(".eraser");
const addSquare = nav.querySelector(".addSquare");
const selectColor = nav.querySelector(".selectColor > div");
const save = nav.querySelector(".save");
const root = document.querySelector("#root");
const color = document.querySelector('input[type="color"]');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let drawing = false;
let erase;
let tool = "selectPen";

ctx.lineWidth = 50;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = color.value;

nav.addEventListener('click', e => {
    if (e.target.className === 'addImg') {
        tool = "addImg";
    } else if (e.target.className === 'selectPen') {
        tool = "selectPen";
    } else if (e.target.className === 'eraser') {
        tool = "eraser";
    } else if (e.target.className === 'addSquare') {
        tool = "addSquare";
    } else if (e.target === selectColor || e.target === color) {
        tool = "selectColor";
        color.classList.remove("none");
    } else {
        tool = "save";
    }
});
canvas.addEventListener("mousedown", e => {
    const x = e.offsetX;
    const y = e.offsetY;
    if (tool === "selectPen") {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (tool === "selectColor") {
        ctx.strokeStyle = color.value;
    } else if (tool === "eraser") {
        erase = true;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
});
canvas.addEventListener("mousemove", e => {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!drawing) {
        return;
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    if(!erase) {
        return;
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});
root.addEventListener("mouseup", () => {
    if (tool === "selectPen") {
        drawing = false;
    } else if (tool === "eraser") {
        erase = false;
    }
});
root.addEventListener('click', e => {
    if(e.target != selectColor && e.target != color) {
        color.classList.add("none");
    }
});