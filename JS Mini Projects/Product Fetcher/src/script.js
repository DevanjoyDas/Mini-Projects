document.addEventListener('DOMContentLoaded',()=>{

const inputbox = document.querySelector('#searchbar');
const btn = document.querySelector('#searchbtn');
let cardContain = document.querySelector('#carddiv')
const apiLink = "https://fakestoreapi.com/products";

let arr = [];

function showElements(val){
    cardContain.innerHTML = ''
    val.forEach(element => {
        cardContain.innerHTML = cardContain.innerHTML + `
        <div class="w-full flex bg-slate-200 mt-6 border-black border-[10px]">
          <div><img class="w-[20vw] h-[40vh]" src=${element.image} alt="Image"></div>
          <div class="flex flex-col justify-center items-center text-xl gap-8">
              <h1>${element.title}</h1>
              <p class="text-blue-400 text-center">${element.description}</p>
              <button class="bg-orange-300 rounded-xl p-5">${element.price}</button>
          </div>
      </div>`
    });
}


const fetchFunction = ()=>{
    fetch(apiLink).then((res)=>{
        return res.json();
    }).then((val)=>{
        arr = val;
        showElements(val)
    })
}


function generateArray(searchText){
   return (arr.filter((obj)=>{
        return (obj.title.toString().toLowerCase().includes(searchText)) || (obj.description.toString().toLowerCase().includes(searchText)) || (obj.price.toString().toLowerCase().includes(searchText))
    }))
}

btn.addEventListener('click',()=>{
    let searchText = inputbox.value.toString().toLowerCase();
    let productsArray = generateArray(searchText);
    showElements(productsArray);

})

//another way of searching without using the search button
// inputbox.addEventListener('keyup',()=>{
//     let searchText = inputbox.value.toString().toLowerCase();
//     let productsArray = generateArray(searchText);
//     showElements(productsArray);

// })





fetchFunction();

})