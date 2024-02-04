DateButton = document.getElementById('btn')
dis = document.getElementById('dis')
maintext = document.getElementById('MainText')
dateIn = document.getElementById('dateInput')
gearBtn = document.getElementById('gear')
dateDiv = document.getElementById('datediv')

let first = true;

function eventHandle (dob){

    let currDate = new Date();
    let milliseconds = currDate - dob;
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    let months = Math.floor(days / 30.44); 
    let years = Math.floor(days / 365);

    document.getElementById('years').innerHTML = years;
    document.getElementById('months').innerHTML = months % 12;
    document.getElementById('days').innerHTML = days % 30;
    document.getElementById('hours').innerHTML = hours % 24
    document.getElementById('minutes').innerHTML = minutes % 60;
    document.getElementById('seconds').innerHTML = seconds % 60;

    setInterval(eventHandle,1000,(dob));
}

DateButton.addEventListener('click',(e)=>{
    if(first){
        dis.classList.toggle('hidden')
        maintext.classList.toggle('hidden')
        first = !first
    }
    dobString = dateIn.value
    dob = new Date(dobString)
    eventHandle(dob);
})

gear.addEventListener('click',(e)=>{
    DateButton.classList.toggle('hidden')
    dateDiv.classList.toggle('hidden')
})
