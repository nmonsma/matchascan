let scanLocation = 9;
let stepLocation = 0;
let matchArray = [false, false, false, false, false, false, false, false, false, false];
let paintWinIndex = 255;
let rotateWin = 0;
let win = 0;

let scanInterval = 300;
const accelerationQuotient = 0.9;

function paintMatchArray () {
    for (let i = 0; i < 10; i++) {
        const currentLight = document.getElementById(`m${i}`);
        if (matchArray[i]) {currentLight.className = 'lit-match-light'}
    }
}

function paintWin () {
    const m = Math.floor(Math.random() * 10);
    const s = Math.floor(Math.random() * 10);
    const p = Math.floor(Math.random() * 10);
    const r = Math.floor(Math.random() * paintWinIndex);
    const g = Math.floor(Math.random() * paintWinIndex);
    const b = Math.floor(Math.random() * paintWinIndex);
    rotateWin++;
    document.getElementById('game').setAttribute('style', `transform: rotate(${rotateWin}deg)`);
    document.getElementById(`m${m}`).setAttribute('style', `background-color: rgb(${r},${g},${b})`);
    document.getElementById(`s${s}`).setAttribute('style', `background-color: rgb(${g},${b},${r})`);
    document.getElementById(`p${p}`).setAttribute('style', `background-color: rgb(${b},${r},${g})`);
    paintWinIndex = paintWinIndex - 5;
    if (paintWinIndex < 0) {clearInterval(win);};
}

function checkForWin () {
    if (!(matchArray.includes(false))) {
        clearInterval(scanning);
        win = setInterval(paintWin, 50);
    }
}

function scoreMatch () {
    if (!(matchArray[stepLocation])) {
        matchArray[stepLocation] = true;
        scanInterval = scanInterval * accelerationQuotient;
        paintMatchArray ();
        clearInterval(scanning);
        scanning = setInterval(scan, scanInterval);
        checkForWin ();
    }
}

function scan () {
    document.getElementById(`s${scanLocation}`).classList.remove('lit-scan-light');
    scanLocation--;
    if (scanLocation == -1) {scanLocation = 9};
    document.getElementById(`s${scanLocation}`).classList.add('lit-scan-light');
}

function step () {
    document.getElementById(`p${stepLocation}`).classList.remove('lit-step-light');
    stepLocation++;
    if (stepLocation == 10) {stepLocation = 0};
    if (stepLocation == scanLocation) {scoreMatch ();};
    document.getElementById(`p${stepLocation}`).classList.add('lit-step-light');
}

function createLights () {
    const gameBoard = document.getElementById('game');
    for (let i = 0; i < 10; i++) {
        const mLight = document.createElement('canvas');;
        mLight.setAttribute('id',`m${i}`);
        gameBoard.appendChild(mLight);
    };
    for (let i = 0; i < 10; i++) {
        const sLight = document.createElement('canvas');;
        sLight.setAttribute('id',`s${i}`);
        gameBoard.appendChild(sLight);
    };
    for (let i = 0; i < 10; i++) {
        const pLight = document.createElement('canvas');;
        pLight.setAttribute('id',`p${i}`);
        gameBoard.appendChild(pLight);
    };
}

createLights ();
document.getElementById('p0').classList.add('lit-step-light');
let scanning = setInterval (scan, scanInterval);
window.addEventListener('click', step);