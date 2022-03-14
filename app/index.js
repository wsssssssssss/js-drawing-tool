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

const readFile = (e) => {
    let file = e.target.files;
    console.log(file);
    const img = new Image();
  
    let reader = new FileReader();
    reader.onload = (e) => {
        let img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file[0]);
};

const fileDownload = (e) => {
    let dataURL = canvas.toDataURL("image/png");
    console.log(123123);
    $("a").download = 'from_canvas.png';
    $("a").href = dataURL;
    $("a").click();

};

document.addEventListener("mousedown", mouseDownListener);
document.addEventListener("mouseup", mouseUpListener);
document.addEventListener("mousemove", mouseMoveListener);


$("#pen").addEventListener("click", _=> tool = "pen");
$("#eraser").addEventListener("click", _=> tool = "eraser");
$("#rect").addEventListener("click", _=>  tool ="rect");
$("#img").addEventListener("change", readFile); 
$(".bx-download").addEventListener("click", fileDownload);

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


