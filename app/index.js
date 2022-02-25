console.log('hello world');

const root = document.querySelector("#root");
const canvas = document.querySelector("#root .canvas");
const ctx = canvas.getContext('2d');
const tools = document.querySelector("#root .tools");
const addImgBtn = document.querySelector("#root .tools .add_img_btn");
const colorBtn = document.querySelector("#root .tools .color input");
const saveBtn = document.querySelector("#root .tools .save input");

const rectInfo = {
    startX: 0,
    startY: 0
};

let painting = false;
let rectPainting = false;
let rect = undefined;


const removeEvent = _ => {
    // 선그리는 이벤트 제거 + (지우개)
    canvas.removeEventListener('mousedown', lineMouseDownHandle);
    canvas.removeEventListener('mousemove', lineMouseMoveHandle);
    window.removeEventListener('mouseup', lineMouseUpHandle);
    window.removeEventListener('blur', lineMouseUpHandle);

    // 도형 그리는 이벤트 제거
    canvas.removeEventListener('mousedown', rectMouseDownHandle);
    canvas.removeEventListener('mousemove', rectMouseMoveHandle);
    window.removeEventListener('mouseup', rectMouseUpHandle);
    window.removeEventListener('blur', rectMouseUpHandle);

    ctx.globalCompositeOperation = 'source-over';
    canvas.style.cursor = 'default';
    ctx.fillStyle = "#000000";
};

const lineMouseDownHandle = _ => {
    painting = true;
};

const lineMouseMoveHandle = e => {
    const x = e.offsetX;
    const y = e.offsetY;

    ctx.lineWidth = 5;
    if (painting) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
};

const lineMouseUpHandle = _ => {
    if (painting) {
        painting = false;
    }
};


const rectMouseDownHandle = e => {
    rectPainting = true;
    rect = document.createElement('div');
    root.appendChild(rect);
    rectInfo.startX = e.offsetX;
    rectInfo.startY = e.offsetY;
};

const rectMouseMoveHandle = e => {
    if (rectPainting) {
        const x = e.offsetX;
        const y = e.offsetY;

        const left = x - rectInfo.startX < 0 ? rectInfo.startX + (x - rectInfo.startX) : rectInfo.startX;
        const top = y - rectInfo.startY < 0 ? rectInfo.startY + (y - rectInfo.startY) : rectInfo.startY;
        const width = x - rectInfo.startX < 0 ? (x - rectInfo.startX) * -1 : x - rectInfo.startX;
        const height = y - rectInfo.startY < 0 ? (y - rectInfo.startY) * -1 : y - rectInfo.startY;

        Object.assign(rect.style, {
            position: 'fixed',
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px',
            background: '#333'
        });
    };
};

const rectMouseUpHandle = _ => {
    if (rectPainting) {
        rectPainting = false;

        const rectRect = rect.getBoundingClientRect();

        ctx.fillRect(rectRect.left, rectRect.top, rectRect.width, rectRect.height);
        rect.remove();
        rect = undefined;
    }
};


const colorChangeHandle = e => {
    ctx.fillStyle = e.target.value;
    ctx.strokeStyle = e.target.value;
};


const addImgHandle = async e => {
    const imgReader = (img) => {
        return new Promise((res) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => res(reader.result);
        })
    };

    const img = e.currentTarget.files[0];
    const src = await imgReader(img).then((src) => { return src });
    const imgTag = new Image();

    imgTag.src = src;
    imgTag.onload = _ => {
        ctx.drawImage(imgTag, 0, 0, 1920, 969);
    };
};

const canvasSaveHandle = e => {
    const imgURL = canvas.toDataURL("image/jpeg");
    const aTag = document.createElement('a');

    aTag.href = imgURL;
    aTag.download = 'img';
    aTag.click();
};

const toolsClickHandle = e => {
    const target = e.target.parentElement;

    if (target.classList.contains('tool')) {
        [...tools.children].forEach(ele => ele.style.background = 'none');
        removeEvent();
        target.style.background = '#ddd';

        const tool = target.classList[0];
        switch (tool) {
            case 'pencil':
                canvas.addEventListener('mousedown', lineMouseDownHandle);
                canvas.addEventListener('mousemove', lineMouseMoveHandle);
                window.addEventListener('mouseup', lineMouseUpHandle);
                window.addEventListener('blur', lineMouseUpHandle);
                break

            case 'earser':
                ctx.globalCompositeOperation = 'destination-out';
                canvas.addEventListener('mousedown', lineMouseDownHandle);
                canvas.addEventListener('mousemove', lineMouseMoveHandle);
                window.addEventListener('mouseup', lineMouseUpHandle);
                window.addEventListener('blur', lineMouseUpHandle);
                break

            case 'rect':
                canvas.style.cursor = 'crosshair';
                canvas.addEventListener('mousedown', rectMouseDownHandle);
                canvas.addEventListener('mousemove', rectMouseMoveHandle);
                window.addEventListener('mouseup', rectMouseUpHandle);
                window.addEventListener('blur', rectMouseUpHandle);
                break

            case 'add_img':
                addImgBtn.click();
                break

            default:
                break
        };

        return false;
    };
};

const init = _ => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    tools.addEventListener('click', toolsClickHandle);
    addImgBtn.addEventListener('change', addImgHandle);
    colorBtn.addEventListener('change', colorChangeHandle);
    saveBtn.addEventListener('click', canvasSaveHandle);

    document.querySelector("#root .tools .pencil img").click();
};


window.addEventListener('load', init);