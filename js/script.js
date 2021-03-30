let scanLocation = 9;
let stepLocation = 0;
let matchArray = [false, false, false, false, false, false, false, false, false, false];
let paintWinIndex = 255;
let win = 0;

// The intial duration each scan light is on
let scanInterval = 300;

// The decay in the scanInterval upon every match:
const accelerationQuotient = 0.9;

// **
// Main Functions:
// **
// Paint the top row of lights to correspond to matchArray:
function paintMatchArray () {
    for (let i = 0; i < 10; i++) {
        const currentLight = document.getElementById(`m${i}`);
        if (matchArray[i]) {currentLight.className = 'lit-match-light'}
    }
}

// Celebrate winning with a sequence of flickering lights as paintWinIndex decays from 255 to 0:
function andThereWasLight () {
    const m = Math.floor(Math.random() * 10);
    const s = Math.floor(Math.random() * 10);
    const p = Math.floor(Math.random() * 10);

    // Dazzle:    
    // const r = Math.floor(Math.random() * paintWinIndex);
    // const g = Math.floor(Math.random() * paintWinIndex);
    // const b = Math.floor(Math.random() * paintWinIndex);
    // document.getElementById(`m${m}`).setAttribute('style', `background-color: rgb(${r},${g},${b})`);
    // document.getElementById(`s${s}`).setAttribute('style', `background-color: rgb(${g},${b},${r})`);
    // document.getElementById(`p${p}`).setAttribute('style', `background-color: rgb(${b},${r},${g})`);
    
    //Flicker:
    document.getElementById(`m${m}`).setAttribute('style', `background-color: rgb(${paintWinIndex},0,0)`);
    document.getElementById(`s${s}`).setAttribute('style', `background-color: rgb(0,${paintWinIndex},0)`);
    document.getElementById(`p${p}`).setAttribute('style', `background-color: rgb(0,0,${paintWinIndex})`);
    document.getElementById(`m${s}`).setAttribute('style', `background-color: rgb(0,0,0)`);
    document.getElementById(`s${p}`).setAttribute('style', `background-color: rgb(0,0,0)`);
    document.getElementById(`p${m}`).setAttribute('style', `background-color: rgb(0,0,0)`);
    paintWinIndex = paintWinIndex - 5;
    if (paintWinIndex < 0) {clearInterval(win);};
}

// Check to see if any of the items in the matchArray are false. If not, trigger the win celebration.
function checkForWin () {
    if (!(matchArray.includes(false))) {
        clearInterval(scanning);
        win = setInterval(andThereWasLight, 75);
    }
}

// If the match between scan and step has not already been made (if it is a newly-scored match), record the score in the matchArray, speed up the scan, paint the match row, and check to see if there is a win.
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

// Turn off the previous scan light, advance the scanLocation index, and light up the next light:
function scan () {
    document.getElementById(`s${scanLocation}`).classList.remove('lit-scan-light');
    scanLocation--;
    if (scanLocation == -1) {scanLocation = 9};
    document.getElementById(`s${scanLocation}`).classList.add('lit-scan-light');
}

// Advance the step light and check for match with the scan light:
function step () {
    document.getElementById(`p${stepLocation}`).classList.remove('lit-step-light');
    stepLocation++;
    if (stepLocation == 10) {stepLocation = 0};
    if (stepLocation == scanLocation) {scoreMatch ();};
    document.getElementById(`p${stepLocation}`).classList.add('lit-step-light');
}

// Create the light board:
function letThereBeLight () {
    const gameBoard = document.getElementById('game');
    for (let i = 0; i < 10; i++) {
        const mLight = document.createElement('canvas');;
        mLight.setAttribute('id',`m${i}`);
        mLight.classList.add('match');
        gameBoard.appendChild(mLight);
    };
    for (let i = 0; i < 10; i++) {
        const sLight = document.createElement('canvas');;
        sLight.setAttribute('id',`s${i}`);
        sLight.classList.add('scan');
        gameBoard.appendChild(sLight);
    };
    for (let i = 0; i < 10; i++) {
        const pLight = document.createElement('canvas');;
        pLight.setAttribute('id',`p${i}`);
        pLight.classList.add('step');
        gameBoard.appendChild(pLight);
    };
}

// **
// Main Events:
// **
letThereBeLight ();
document.getElementById('p0').classList.add('lit-step-light');
let scanning = setInterval (scan, scanInterval);
document.getElementById('main-section').addEventListener('click', step);
document.getElementById('main-section').addEventListener('touchstart', step);
setInterval(function () {document.getElementsByTagName('h1')[0].classList.add('visible');document.getElementsByTagName('p')[0].classList.add('visible')}, 200);