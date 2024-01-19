document.addEventListener('DOMContentLoaded',(e)=>{

const sc = document.querySelector("#score");
const frm = document.querySelector("#ansform");


const f = document.querySelector("#first");
const op = document.querySelector("#operator");
const s = document.querySelector("#second");

const ans = document.querySelector("#answer");

const upop = document.querySelector("#popup")

let output;
let val1,val2,val3;
let marks = 0;

const create = ()=>{
    ans.value = ''
    val1 = Math.floor(Math.random()*10 + 1);
    val2 = Math.floor(Math.random()*10 + 1);
    val3 = Math.floor(Math.random()*4 + 1);

    f.innerHTML = `${val1}`;
    s.innerHTML = `${val2}`;

    switch (val3) {
        case 1:
            op.innerHTML = '+'
            output = val1 + val2;
            break;
        case 2:
            op.innerHTML = '-'
            output = val1 - val2;
            break;
        case 3:
            op.innerHTML = '*'
            output = val1 * val2;
            break;
        default:
            op.innerHTML = '/'
            output = val1 / val2;
            break;
    }

}

(()=>{
    create();
})()

frm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(output==(ans.value)){
        marks = marks + 1;
        upop.innerHTML = "You are Correct"
        upop.classList.toggle('hidden')
    }
    else{
        if(marks!==0) marks = marks - 1;
        upop.innerHTML = "You are Wrong"
        upop.classList.toggle('hidden')
        
    }
    sc.innerHTML = `${marks}`
    create();
    setTimeout(() => {
        upop.classList.toggle('hidden')
    }, 5000);
})

})