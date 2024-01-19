const btn = document.querySelector('#gen')
let colorDiv = document.querySelector('#colorDivBox')
let bars = Array.from(document.querySelectorAll('.color-bar'))

const colorChar = "abcdef"
let colorArray = [];
const choicegen = () => {
    let choice = Math.floor(Math.random() * 2 + 1);
    switch (choice) {
        case 1:

            let charChoice = Math.floor(Math.random() * 6);
            return colorChar[charChoice];
        case 2:
            let numChoice = Math.floor(Math.random() * 9);
            return numChoice.toString();
    }
}

const digitandchargenerator = () => {
    let num = '';
    for (let i = 0; i < 6; i++) {
        num = num + choicegen();
    }
    return num;
}

const generateColors = () => {
    for (let i = 0; i < 4; i++) {

        colorArray.push(`#${digitandchargenerator().toString()}`)
    }
}

const addColorsClass = (colorArray) => {
    colorDiv.innerHTML = colorDiv.innerHTML + `
    <div class="color-bar h-1/3 w-screen" style="background-color: ${colorArray[0]}">${colorArray[0]}</div>
    <div class="color-bar h-1/4 w-screen" style="background-color: ${colorArray[1]}"><span class='text-center'>${colorArray[1]}</span></div>
    <div class="color-bar h-1/5 w-screen" style="background-color: ${colorArray[2]}"><span class='text-center'>${colorArray[2]}</span></div>
    <div class="color-bar h-[28%] w-screen" style="background-color: ${colorArray[3]}"><span class='text-center'>${colorArray[3]}</span></div>
    `;
    bars = Array.from(document.querySelectorAll('.color-bar'))
    bars.forEach((bar) => {
        bar.addEventListener('click', () => {
            bar.select
            navigator.clipboard
                .writeText(bar.innerText)
                .then(() => {
                    alert("Copied To Clipboard");
                })
                .catch((err) => {
                    alert("Could not copy");
                });
        })
    })
};


btn.addEventListener('click', () => {
    colorArray = [];
    generateColors();
    colorDiv.innerHTML = ''
    addColorsClass(colorArray);
})

bars.forEach((bar) => {
    bar.addEventListener('click', () => {
        navigator.clipboard
            .writeText(bar.innerText)
            .then(() => {
                alert("Copied to clipboard");
            })
            .catch((err) => {
                alert("Could not copy");
            });
    })
})


