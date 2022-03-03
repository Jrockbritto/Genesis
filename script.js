let order = [];
let clickCount = 0;
let score = 0;

//0 = verde, 1 = vermleho 2 = amarelo, 3 = azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aleatoria de cores
const lightUp = (elementColor) => {
    elementColor.classList.add('selected');
}
        
function lightOff(elementColor) {
    elementColor.classList.remove('selected');
}


let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    setTimeout(() => { //tempo para inicio
        const blink = async () => {
            for(let i in order) {
                let elementColor = createColorElement(order[i]);
                await new Promise((cooldown) => setTimeout(cooldown, time)) //tempo ligado blink
                .then(new Promise((r) => lightUp(elementColor,r)))
                new Promise((reso) => lightOff(elementColor,reso));
                await new Promise((cooldown1) => setTimeout(cooldown1, time))
            }
        }
        blink();
    }, 500);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = (color) => {
    let success = true;
    if(color != order[clickCount]){
        success = false;
        return gameOver();
    }else{
        clickCount++;
    }

    if(clickCount == order.length && success) {
        score ++;
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nivel`);
        return nextLevel();
    }
}
// funcao para o clique do usuario
let click = (color) => {
    if(clickCount <= order.length){
        createColorElement(color).classList.add('selected');

        setTimeout(() => {
            createColorElement(color).classList.remove('selected');
            checkOrder(color,clickCount);
        }, 250)  
    }
}

//criar a função que retorna a cor

let createColorElement = (color) => {
    if(color == 0){
        return green;
    }
    else if(color == 1){
        return red;
    }
    else if(color == 2) {
        return yellow;
    }
    else if(color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo

let nextLevel = () => {
    clickCount = 0;
    shuffleOrder();
}

//funcao para game over

let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nclique em OK para reiniciar o jogo`);
    order = [];
    score = 0;

    menu();

}

// funcao de inicio do jogo
let playGame = () => {
    alert("Bem vindo ao Genesis\nIniciando novo jogo!")
    order = [];
    score = 0;
    time = Math.floor(1000 / document.getElementById('Difficulty').value)
    console.log(time)
    nextLevel();
}

let time = 0;

//funcao de click das cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
