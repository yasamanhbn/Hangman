const wordEl = document.getElementById("word");
const playButton = document.getElementById("play-button");
const notification = document.getElementById("notification-container");
const finishedGamePopup = document.getElementById("popup-container");
const wrongLettersEl = document.getElementById("wrong-letter")
const figureParts = document.getElementsByClassName("figure_parts");

const words = ["programming","python","wizard","narnia","hobbit","computer","chair"];
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
    if(e.key>='a' && e.key<='z') {
        let letter = e.key;
        if (wordSelected.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else
                showNotification("you entered this letter");
        } else if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter)
            showWrongLetters();
        }
        else
            showNotification("you entered this letter");
    }
    else
        showNotification("enter a valid letter")
    finishedGame()

}
function showWrongLetters() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length>0?`<span>wrong</span><br/>`:''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}`;
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
        finishedGamePopup.style.display = "flex";
        finishedGamePopup.querySelector("h2").innerHTML = "you have won";
    }
    else if(wrongLetters.length===figureParts.length) {
        finishedGamePopup.style.display = "flex";
        finishedGamePopup.querySelector("h2").innerHTML = "OOPS,you lost";
    }

}
function showNotification(message){
    notification.innerHTML = `<h2>${message}</h2>`
    notification.classList.add("show");
    setTimeout(()=>{
        notification.classList.remove("show");
    },2000)
}
window.addEventListener("keypress",enterLetter);
playButton.addEventListener("click",()=>{
    wrongLetters.splice(0);
    correctLetters.splice(0);
    wordSelected = words[Math.floor(Math.random() * words.length)];
    displayWord();
    showWrongLetters();
    showWrongLetters();
    finishedGamePopup.style.display='none';
})
displayWord();


