console.log('hello world');

const canvas = document.querySelector("#root .canvas");
const ctx = canvas.getContext('2d');
const tools = document.querySelector("#root .tools");
const addImgBtn = document.querySelector("#root .tools .add_img_btn");

ctx.fillRect(25, 25, 100, 100);


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

    // const rect = canvas.getBoundingClientRect();
    // console.log(rect);

};


const toolsClickHandle = e => {
    const target = e.target.parentElement;
    if (target.classList.contains('tool')) {
        [...tools.children].forEach(ele => ele.style.background = 'none');
        target.style.background = '#ddd';

        const kind = target.classList[0];
        switch (kind) {
            case 'add_img':
                addImgBtn.click();
                break
            default:
                break
        }

        return false;
    };
};

tools.addEventListener('click', toolsClickHandle);
addImgBtn.addEventListener('change', addImgHandle);