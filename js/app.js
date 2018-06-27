/**
 * @param  {} ".deck"
 */
const deck = document.querySelector(".deck");
let clockId;
let clockOff = true;
let matched = 0;
let moves = 0;
let playingCards = [];
let time = 0;
/**
 * Shuffles the deck
 * @param  {} {constindividualCards=Array.from(document.querySelectorAll(".deckli"
 * @param  {} ;constshuffledCards=shuffle(individualCards
 * @param  {} ;for(cardofshuffledCards
 * @param  {} {deck.appendChild(card
 * @param  {} ;}}shuffleDeck(
    */
function shuffleDeck() {
    const individualCards = Array.from(document.querySelectorAll(".deck li"));
    const shuffledCards = shuffle(individualCards);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

shuffleDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
/**
 * @param  {} array
 * @param  {} {letcurrentIndex=array.length
 * @param  {} temporaryValue
 * @param  {} randomIndex;while(currentIndex!==0
 * @param  {} {randomIndex=Math.floor(Math.random(
 * @param  {} *currentIndex
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Event Listener
 * @param  {} "click"
 * @param  {} event=>{constcore=event.target;if(isClicked(core
 * @param  {} {if(clockOff
 * @param  {} {beginTimer(
 * @param  {} ;clockOff=false;}exchange(core
 * @param  {} ;addPlayingCards(core
 * @param  {} ;if(playingCards.length===2
 * @param  {} {checkMatch(core
 * @param  {} ;addMove(
 * @param  {} ;score(
 * @param  {} ;}}}
 */
deck.addEventListener("click", event => {
    const core = event.target;
    if (isClicked(core)) {
        if (clockOff) {
            beginTimer();
            clockOff = false;
        }
        exchange(core);
        addPlayingCards(core);
        if (playingCards.length === 2) {
            checkMatch(core);
            addMove();
            score();
        }
    }
});
/**
 * @param  {} core
 * @param  {} {return(core.classList.contains("card"
 * @param  {} &&!core.classList.contains("match"
 * @param  {} &&playingCards.length<2&&!playingCards.includes(core
 */
function isClicked(core) {
    return (
        core.classList.contains("card") && !core.classList.contains("match") && playingCards.length < 2 && !playingCards.includes(core)
    );
}

/**
 * Function starts the clock
 * @param  {} {clockId=setInterval((
 * @param  {} =>{time++;showTime(
 * @param  {} ;}
 * @param  {} 900
 */
function beginTimer() {
    clockId = setInterval(() => {
        time++;
        showTime();
    }, 900);
}
/**
 * Function creates clock to use minutes and seconds
 * @param  {} {constclock=document.querySelector(".clock"
 * @param  {} ;constminutes=Math.floor(time/60
 * @param  {} ;constseconds=time%60;if(seconds<10
 * @param  {0${seconds}`;}else{clock.innerHTML=`${minutes}:${seconds}`;}}} {clock.innerHTML=`${minutes}
 * @returns seconds
 */
function showTime() {
    const clock = document.querySelector(".clock");
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}
/**
 * Function allows cards to flip
 * @param  {} card
 * @param  {} {card.classList.toggle("open"
 * @param  {} ;card.classList.toggle("show"
 */
function exchange(card) {
    card.classList.toggle("open");
    card.classList.toggle("show");
}
/**
 * @param  {} core
 * @param  {} {playingCards.push(core
 */
function addPlayingCards(core) {
    playingCards.push(core);
}
/**
 * Function checks for matches
 * @param  {} {constpairs=8;if(playingCards[0].firstElementChild.className===playingCards[1].firstElementChild.className
 * @param  {} {playingCards[0].classList.toggle("match"
 * @param  {} ;playingCards[1].classList.toggle("match"
 * @param  {} ;playingCards=[];matched++;if(matched===pairs
 * @param  {} {gameOver(
 * @param  {} ;}}else{setTimeout((
 * @param  {} =>{exchange(playingCards[0]
 * @param  {} ;exchange(playingCards[1]
 * @param  {} ;playingCards=[];}
 * @param  {} 1000
 */
function checkMatch() {
    const pairs = 8;
    if (
        playingCards[0].firstElementChild.className ===
        playingCards[1].firstElementChild.className
    ) {
        playingCards[0].classList.toggle("match");
        playingCards[1].classList.toggle("match");
        playingCards = [];
        matched++;
        if (matched === pairs) {
            gameOver();
        }
    } else {
        setTimeout(() => {
            exchange(playingCards[0]);
            exchange(playingCards[1]);
            playingCards = [];
        }, 1000);
    }
}
/**
 * Function ends the game
 * @param  {} {endClock(
 * @param  {} ;toggleModal(
 * @param  {} ;writeModalStats(
 */
function gameOver() {
    endClock();
    toggleModal();
    writeModalStats();
}
/**
 * Function stops the clock
 * @param  {} {clearInterval(clockId
 */
function endClock() {
    clearInterval(clockId);
}
/**
 * Function displays modal
 * @param  {} {constmodal=document.querySelector(".modal-screen"
 * @param  {} ;modal.classList.toggle("hide"
 */
function toggleModal() {
    const modal = document.querySelector(".modal-screen");
    modal.classList.toggle("hide");
}
/**
 * Function calculates statistics from game
 * @param  {} {constclockTime=document.querySelector(".clock"
 * @param  {} .innerHTML;constmovesStat=document.querySelector(".modal-moves"
 * @param  {} ;conststars=getStars(
 * @param  {} ;conststarsStat=document.querySelector(".modal-stars"
 * @param  {} ;consttimeStat=document.querySelector(".modal-time"
 */
function writeModalStats() {
    const clockTime = document.querySelector(".clock").innerHTML;
    const movesStat = document.querySelector(".modal-moves");
    const stars = getStars();
    const starsStat = document.querySelector(".modal-stars");
    const timeStat = document.querySelector(".modal-time");
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
    timeStat.innerHTML = `Time = ${clockTime}`;
}
/**
 * @param  {} {stars=document.querySelectorAll(".starsli"
 * @param  {} ;starCount=0;for(starofstars
 * @param  {} {if(star.style.display!=="none"
 */
function getStars() {
    stars = document.querySelectorAll(".stars li");
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== "none") {
            starCount++;
        }
    }
    return starCount;
}
/**
 * Function gives stars value
 * @param  {} {if(moves===20||moves===30||moves===40
 * @param  {} {removeStar(
 */
function score() {
    if (moves === 20 || moves === 30 || moves === 40) {
        removeStar();
    }
}
/**
 * Function counts moves
 * @param  {} {moves++;constnextMoves=document.querySelector(".moves"
 */
function addMove() {
    moves++;
    const nextMoves = document.querySelector(".moves");
    nextMoves.innerHTML = moves;
}
/**
 * Function removes stars
 * @param  {} {conststarLi=document.querySelectorAll(".starsli"
 * @param  {} ;for(starofstarLi
 * @param  {} {if(star.style.display!=="none"
 */
function removeStar() {
    const starLi = document.querySelectorAll(".stars li");
    for (star of starLi) {
        if (star.style.display !== "none") {
            star.style.display = "none";
            break;
        }
    }
}
/**
 * Modal buttons
 * @param  {} ".btn-secondary"
 * @param  {} .addEventListener("click"
 * @param  {} (
 * @param  {} =>{toggleModal(
 * @param  {} ;}
 * @param  {} ;document.querySelector(".btn-primary"
 * @param  {} .addEventListener("click"
 * @param  {} resetGame
 */
document.querySelector(".btn-secondary").addEventListener("click", () => {
    toggleModal();
});

document.querySelector(".btn-primary").addEventListener("click", resetGame);

/**
 * Function resets game
 * @param  {} {resetGame(
 * @param  {} ;toggleModal(
 */
function replayGame() {
    resetGame();
    toggleModal();
}
/**
 * Allows user to click arrow and restart game
 * @param  {} ".restart"
 * @param  {} .addEventListener("click"
 * @param  {} resetGame
 */
document.querySelector(".restart").addEventListener("click", resetGame);

//Resets game
/**
 * Function resets game
 * @param  {} {location.reload(
 * @param  {} ;resetMoves(
 * @param  {} ;resetStars(
 * @param  {} ;resetTimer(
 * @param  {} ;shuffleDeck(
 */
function resetGame() {
    location.reload();
    resetMoves();
    resetStars();
    resetTimer();
    shuffleDeck();
}
/**
 *Function resets moves
 * @param  {} {moves=0;document.querySelector(".moves"
 */
function resetMoves() {
    moves = 0;
    document.querySelector(".moves").innerHTML = moves;
}
/**
 * Function resets stars
 * @param  {} {stars=0;conststarLi=document.querySelectorAll(".starsli"
 * @param  {} ;for(starofstarLi
 */
function resetStars() {
    stars = 0;
    const starLi = document.querySelectorAll(".stars li");
    for (star of starLi) {
        star.style.display = "inline";
    }
}
/**
 * Function resets timer
 * @param  {} {clockOff=true;endClock(
 * @param  {} ;showTime(
 */
function resetTimer() {
    clockOff = true;
    endClock();
    showTime();
    time = 0;
}