const $ = (el) => document.querySelector(el);

const canvas = document.querySelector("#canvas");
const canvasCopy = document.querySelector("#canvasCopy");
const ctx = canvas.getContext('2d');
const ctxCopy = canvasCopy.getContext('2d');
let tool = "pen";

let drwaChk = false;
let drawRectX; 
let drawRectY;
const mouseDownListener = (e) => {
    
    drwaChk = true;
    ctx.beginPath();
    ctx.strokeStyle = $("#color").value;
    if(tool === "rect"){
        canvasCopy.classList.remove("none");
        ctxCopy.beginPath();
        ctxCopy.strokeStyle = $("#color").value;
        drawRectX = e.clientX;
        drawRectY = e.clientY;   
        console.log(drawRectX);
        return;
    }
    ctx.moveTo(e.clientX, e.clientY);
    
};  
      
const mouseMoveListener = (e) => {
    if(drwaChk){
        if(e.clientX >= window.innerWidth - 5 || e.clientX <= 0 || e.clientY >= window.innerHeight- 5 || e.clientY <= 0 ) drwaChk = false;
        if(tool === "eraser" ){
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = "#fff";
        };
        if(tool === "rect"){
            ctxCopy.clearRect(0, 0,window.innerWidth, window.innerHeight);
            ctxCopy.fillRect(drawRectX, drawRectY, e.clientX - drawRectX, e.clientY - drawRectY);
            return;
        }
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
};

const mouseUpListener = (e) => {   
    if(tool === "rect"){
        ctx.fillRect(drawRectX, drawRectY, e.clientX - drawRectX, e.clientY - drawRectY);
        canvasCopy.classList.add("none");
    }
    drwaChk = false;            
};


document.addEventListener("mousedown", e => mouseDownListener(e));
document.addEventListener("mouseup", e => mouseUpListener(e));
document.addEventListener("mousemove", e => mouseMoveListener(e));


$("#pen").addEventListener("click", _=> tool = "pen");
$("#eraser").addEventListener("click", _=> tool = "eraser");
$("#rect").addEventListener("click", _=>  tool ="rect");
        
const rander = (canvas, ctx) =>  {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";  
};

const init = () => {
    rander(canvas, ctx);
    rander(canvasCopy, ctxCopy);
};
init();


