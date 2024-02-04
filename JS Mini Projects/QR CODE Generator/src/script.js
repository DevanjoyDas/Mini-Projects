const btngen = document.querySelector('#genbtn');
const divqr = document.querySelector('#qrdiv');
const inText = document.querySelector('#textInput');


const generateQrCode = ()=>{
    let txt = inText.value;
    divqr.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${txt}" alt="QR CODE" />`
}

btngen.addEventListener('click',()=>{
    generateQrCode();
});
