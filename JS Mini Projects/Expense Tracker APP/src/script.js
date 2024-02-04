//event-delegation technique is used for avoiding re-querying
const textInfo = document.querySelector('#infoText');
const amountInfo = document.querySelector('#infoAmount');

const btnEarning = document.querySelector('#earningButton');
const btnExpense = document.querySelector('#expenseButton');
// const btnEdit = document.querySelector('#editButton');

const earnSpan = document.querySelector('#amountEarned');
const expenseSpan = document.querySelector('#amountSpent')

const balanceTotal = document.querySelector('#totalBalance');

const cardULContainer = document.querySelector('#cardUL');

let idOfCard = 0;
let cardArray = [];

// let allBtn = Array.from(document.querySelectorAll('button'));
// const cardContainer = document.querySelector('#cardUL');

const updateSpans = (task,targetBtn)=>{
    let value_input;
    if(task==='edit'){
       value_input = targetBtn.previousElementSibling;
    }
    else{
        value_input = targetBtn.previousElementSibling.previousElementSibling;
    }
     
    if(value_input.hasAttribute('data-add-value')){
        earnSpan.innerHTML = parseFloat(earnSpan.innerHTML) - parseFloat(value_input.value);
        balanceTotal.innerHTML = parseFloat(balanceTotal.innerHTML) - parseFloat(value_input.value);
    }
    else{
        expenseSpan.innerHTML = parseFloat(expenseSpan.innerHTML) - parseFloat(value_input.value);
        balanceTotal.innerHTML = parseFloat(balanceTotal.innerHTML) + parseFloat(value_input.value);
    }
}
let idAttribute;
const updateCardArrayAdd = ()=>{
    earningAdder({"edityes":true,"ident": idAttribute},"earn");
}
const updateCardArrayRemove = ()=>{
    earningAdder({"edityes":true,"ident": idAttribute},"expense");
}


const editCard = (targetBtn)=>{
    idAttribute = parseInt(targetBtn.getAttribute("data-input-id"));
    textInfo.value = targetBtn.previousElementSibling.previousElementSibling.value;
    amountInfo.value = targetBtn.previousElementSibling.value;
    updateSpans("edit",targetBtn);
    btnEarning.removeEventListener('click',eventAdd);
    btnExpense.removeEventListener('click',eventRemove);
    btnEarning.addEventListener('click',updateCardArrayAdd);
    btnExpense.addEventListener('click',updateCardArrayRemove);
    // readBtns();
}

const deleteCard = (targetBtn)=>{
    updateSpans("delete",targetBtn);
    let idAttribute = parseInt(targetBtn.getAttribute("data-input-id"));
    cardArray = cardArray.filter((ele,index)=>{
        if(idAttribute!==ele.idCard){
            return ele;
        }
    })
    displayCardArray();
    // readBtns();
}

cardULContainer.addEventListener('click', (event) => {
    const targetBtn = event.target;

    // Check if the clicked element is a button with data-edit attribute
    if (targetBtn.matches('[data-edit]')) {
        editCard(targetBtn);
    }

    // Check if the clicked element is a button with data-delete attribute
    else if (targetBtn.matches('[data-delete]')) {
        deleteCard(targetBtn);
    }
});


// const readBtns = ()=>{
//     allBtn = Array.from(document.querySelectorAll('button'));
//     allBtn.forEach((eachBtn)=>{
//         if(eachBtn.hasAttribute("data-edit")){
//             eachBtn.addEventListener('click',(e)=>{
//                 editCard(e.target);
//             })
//         }
//         else if(eachBtn.hasAttribute("data-delete")){
//             eachBtn.addEventListener('click',(e)=>{
//                 deleteCard(e.target);
//             })
//         }
//     })
// }

const displayCardArray = () => {

    cardULContainer.innerHTML = ''
    cardArray.forEach((cardElement) => {
        cardULContainer.innerHTML = cardULContainer.innerHTML + cardElement.eleCard;
    })

}

const generateCard = (task,amnt, txtAmnt) => {
    idOfCard = idOfCard + 1;
    if(task==="add"){
        return (
            `<li class="w-full text-center">
            <input value='${txtAmnt}' type="text" class="w-[60%] rounded-md text-center bg-green-300 text-white" readonly>
            <input value='${amnt}' type="number" class="w-[20%] rounded-md text-center" readonly data-add-value="plus">
            <button data-input-id="${idOfCard}" data-edit="edit" class="fa-solid fa-pen-to-square w-[7%] rounded-xl bg-blue-200 p-1 hover:bg-blue-100"></button>
            <button data-input-id="${idOfCard}" data-delete="delete" class="fa-solid fa-trash w-[7%] rounded-xl bg-red-200 p-1 hover:bg-red-100"></button>
        </li>`
        )
    }
    else{
        return (
            `<li class="w-full text-center">
            <input value='${txtAmnt}' type="text" class="w-[60%] rounded-md text-center bg-red-300 text-white" readonly>
            <input value='${amnt}' type="number" class="w-[20%] rounded-md text-center" readonly data-sub-value="sub">
            <button data-input-id="${idOfCard}" data-edit="edit" class="fa-solid fa-pen-to-square w-[7%] rounded-xl bg-blue-200 p-1 hover:bg-blue-100"></button>
            <button data-input-id="${idOfCard}" data-delete="delete" class="fa-solid fa-trash w-[7%] rounded-xl bg-red-200 p-1 hover:bg-red-100"></button>
        </li>`
        )
    }
   
}
// {true,id}
const generateCardArray = (editOrNot,task,amnt, txtAmnt) => {
    let elementCard = generateCard(task,amnt, txtAmnt);
    if(editOrNot.edityes===true){
        cardArray = cardArray.filter((ele,index)=>{
            if(ele.idCard===editOrNot.ident){
                ele.idCard = idOfCard
                ele.eleCard = elementCard;
            }
            return ele;
        })
        btnEarning.removeEventListener('click',updateCardArrayAdd);
        btnExpense.removeEventListener('click',updateCardArrayRemove);
        btnEarning.addEventListener('click',eventAdd);
        btnExpense.addEventListener('click',eventRemove);
    }
    else{
        cardArray.push({idCard : idOfCard ,eleCard : elementCard});
    }
    displayCardArray();
    
    // readBtns();
    
}

const totalAdder = (editOrNot,task, amnt, txtAmnt) => {
    if (task === "add") {
        balanceTotal.innerHTML = parseFloat(balanceTotal.innerHTML) + amnt;
    }
    else {
        balanceTotal.innerHTML = parseFloat(balanceTotal.innerHTML) - amnt;
    }
    amountInfo.value = parseFloat(0);
    textInfo.value = '';
    generateCardArray(editOrNot,task,amnt, txtAmnt);
}


const earningAdder = (editOrNot,choice) => {
    let amnt = parseFloat(amountInfo.value);
    if (isNaN(amnt)) {
        earnSpan.innerHTML = parseFloat(0);
        expenseSpan.innerHTML = parseFloat(0)
        amnt = parseFloat(0);
    }
    let txtAmnt = textInfo.value;
    if (choice === "earn") {
        earnSpan.innerHTML = parseFloat(earnSpan.innerHTML) + amnt;
        totalAdder(editOrNot,"add", amnt, txtAmnt);
    }
    else {
        expenseSpan.innerHTML = parseFloat(expenseSpan.innerHTML) + amnt;
        totalAdder(editOrNot,"sub", amnt, txtAmnt);
    }

}

const eventAdd = ()=>{
    earningAdder({"edityes":false,"ident":NaN},"earn");
}
const eventRemove = ()=>{
    earningAdder({"edityes":false,"ident":NaN},"expense");
}

btnEarning.addEventListener('click', eventAdd)
btnExpense.addEventListener('click', eventRemove)



