const $ = (el) => document.querySelector(el);

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
let tool = "pen";

let drwaChk = false;
const mouseDownListener = (e) => {
    ctx.beginPath();
    
    if(tool === "pen" || tool === "eraser"){
        drwaChk = true;
        ctx.strokeStyle = $("#color").value
        moveTo(e.clientX, e.clientY);
        return;
    }

    if( "rect"){

    }
};  
      
const mouseMoveListener = (e) => {
    if(drwaChk){
        if(e.clientX >= window.innerWidth || e.clientX <= 0 || e.clientY >= window.innerHeight- 5 || e.clientY <= 0 ) drwaChk = false;
        ctx.lineTo(e.clientX, e.clientY)
        if(tool === 'eraser' ){
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = "#fff";
        };
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
};

init();


