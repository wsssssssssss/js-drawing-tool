const $ = (el) => document.querySelector(el);

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
let tool = "pen";

let drwaChk = false;
let drawRectX; 
let drawRectY;
const mouseDownListener = (e) => {
    
    ctx.beginPath();
    drwaChk = true;
    ctx.strokeStyle = $("#color").value;
    ctx.moveTo(e.clientX - 10, e.clientY - 10);
    if(tool === "rect"){
        drawRectX = e.clientX;
        drawRectY = e.clientY;
        ctx.clearRect(drawRectX, drawRectY,e.clientX - drawRectX, e.clientY - drawRectY);
    }

};  
      
const mouseMoveListener = (e) => {
    if(drwaChk){
        if(e.clientX >= window.innerWidth - 5 || e.clientX <= 0 || e.clientY >= window.innerHeight- 5 || e.clientY <= 0 ) drwaChk = false;
        if(tool === 'eraser' ){
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = "#fff";
        };
        if( tool === "rect"){
            ctx.fillRect(drawRectX, drawRectY, e.clientX - drawRectX, e.clientY - drawRectY);
            return;
        }
        ctx.lineTo(e.clientX - 10, e.clientY - 10);
        ctx.stroke();
    }
};

const mouseUpListener = (e) => {   
    drwaChk = false;            
};


canvas.addEventListener("mousedown", e => mouseDownListener(e));
canvas.addEventListener("mouseup", e => mouseUpListener(e));
canvas.addEventListener("mousemove", e => mouseMoveListener(e));


$("#pen").addEventListener("click", _=> tool = "pen");
$("#eraser").addEventListener("click", _=> tool = "eraser");
$("#rect").addEventListener("click", _=>  tool ="rect");
        
const init = () => {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    ctx.lineWidth = 10;
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
};
init();


