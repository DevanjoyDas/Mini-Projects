const devi = document.getElementsByTagName('div')[0];
const hi = document.getElementsByTagName('h1')[0];

devi.addEventListener('click',(e)=>{
    if(e.target.matches("[data-temp]")){
        alert("Hello")
    }
})