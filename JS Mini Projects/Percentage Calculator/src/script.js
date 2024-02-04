document.addEventListener('DOMContentLoaded',(e)=>{

    let inputElements = Array.from(document.querySelectorAll('#marksForm input[type="number"]'));

let formsub = document.getElementById('marksForm')

let stat = document.getElementById('statement')

let marks;

function calc(){
    marks = 0;
    inputElements.forEach((ele)=>{
        marks = marks + parseInt(ele.value);
    })
    stat.innerHTML = `<div>You got ${marks} out of 400 and Percentage = ${marks/4}</div>`
}

formsub.addEventListener('submit',(e)=>{
    e.preventDefault()
    calc(e);
})

})



