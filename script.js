const wordEl = document.getElementById("word");
const playButton = document.getElementById("play-button");
const notification = document.getElementById("notification-container");
const finishedGamePopup = document.getElementById("popup-container");
const wrongLettersEl = document.getElementById("wrong-letter")
const figureParts = document.getElementsByClassName("figure_parts");

const words = ["programming","python","wizard","narnia","hobbit"];
let wordSelected =words[ Math.floor(Math.random() * words.length)];
const correctLetters=[];
const wrongLetters=[];
function displayWord() {
    wordEl.innerHTML=`
        ${wordSelected.split('').map(letter =>
        `<span class="letter">
             ${correctLetters.includes(letter) ? letter : ''}
            </span>`).join('')
    }`;
}

function enterLetter(e){
    if(e.key>='A' && e.key<='z') {
        let letter = e.key;
        if (wordSelected.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else
                showNotification();
        } else if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter)
            showWrongLetters();
        }
    }
    else
        showNotification()
    finishedGame()

}
function showWrongLetters() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length>0?`<span>wrong</span>`:''}
    ${wrongLetters.map(letter=> `<span> ${letter} </span>`)}
    `;
    let num = wrongLetters.length;
    [...figureParts].forEach((part,index)=>{
        if(index<num)
            part.style.display='block'
        else
            part.style.display='none'
    })
}
function finishedGame() {
    const innerWord = wordEl.innerText.replace(/\n/g,'');
    if(innerWord===wordSelected) {
        finishedGamePopup.style.display = "flex"
    }
}
function showNotification(){

}
window.addEventListener("keypress",enterLetter);
displayWord();


