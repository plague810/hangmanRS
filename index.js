const guessArea = $(".guess-paragraph");
const letterArea = $(".letter-area");
const figureParts = $(".hide");

const words = ["hello", "world", "practice", "game", "adult", "airport", "baby", "backpack", "bottle", "bowl", "box", "brain", "cattle", "car", "dodge", "drive", "drain", "elephant", "eliptical", "ears", "fish", "flag", "female", "fertilize"];
const randomWord = words[Math.floor(Math.random() * words.length)];
const wordLength = randomWord.length;
console.log(randomWord);

var usersGuess;
var correctGuess;
var correctGuessNum = 0;
var lettersGuessed = [];
var wrongGuessNum = 0;
var wordLetters = [];

for(var i = 0; i < wordLength; i++){
    wordLetters.push(randomWord[i]);
}

for(var i = 0; i < wordLength; i++){
    let para = document.createElement("p");
    let node = document.createTextNode("___");
    $(para).css("display", "inline");
    para.appendChild(node);
    guessArea[0].appendChild(para);
}

function submitButton(){
    usersGuess = document.querySelector(".input-box").value;
    if(usersGuess == ""){
        return;
    }
    usersGuess = usersGuess.toLowerCase();
    document.querySelector(".input-box").value = "";
    checkDuplicateGuess(usersGuess);
}

function checkDuplicateGuess(usersGuess){
    if(usersGuess.length < 2){
        for(var i = 0; i < lettersGuessed.length; i++){
            if(usersGuess === lettersGuessed[i]){
                alert("already guessed this letter");
                return;
            }
        }
    } else if(usersGuess.length != randomWord.length){
        alert('sorry, not the word');
        wrongGuessNum += 1;
        wrongGuess(wrongGuessNum);
        checkWrongGuessCount(wrongGuessNum);
        return;
    }
    checkGuessOnWord(usersGuess);
}

function checkGuessOnWord(usersGuess){
    if(usersGuess === randomWord){
        //reveal all letters and end game
        revealAllLetters();
    }else if(usersGuess.length == randomWord.length){
        wrongGuessNum += 1;
        wrongGuess(wrongGuessNum);
        checkWrongGuessCount(wrongGuessNum);
        alert('sorry, not the word');
        return;
    } else {
        //reset correctGuess to false in case no matching letters
        correctGuess = false;
        lettersGuessed.push(usersGuess);
        addUsedLetter(usersGuess);

        for(var i = 0; i < wordLength; i++){
            if(usersGuess === wordLetters[i]){
                console.log("correct letter chosen");
                correctGuess = true;
                correctGuessNum += 1;
                revealLetter(i, usersGuess);
                checkCorrectGuessCount(correctGuessNum);
            }
        }
        
        if(!correctGuess){
            console.log("incorrect letter guessed");
            wrongGuessNum += 1;
            wrongGuess(wrongGuessNum);
            checkWrongGuessCount(wrongGuessNum);
        }
    }
}

function checkCorrectGuessCount(correctGuessNum){
    if (correctGuessNum === wordLength){
        setTimeout(function(){
            alert("you got the word! winner!");
            window.location.reload();
        }, 200);
        //end the game, guessed the word
    }
}

function checkWrongGuessCount(wrongGuessNum){
    if (wrongGuessNum === 6){
        setTimeout(function(){
            alert("Out of guesses. You Lose!");
            window.location.reload();
        }, 200);
        //end the game, out of guesses
    }
}

function wrongGuess(wrongGuessNum){
    $(figureParts[wrongGuessNum - 1]).removeClass("hide");
}

function revealLetter(index, letter){
    for (var i = 0; i < wordLength; i++){
        if(i === index){
            guessArea[0].children[i].innerHTML = letter;
        }
    }
}

function addUsedLetter(usersGuess){
    let para = document.createElement("p");
    let node = document.createTextNode(usersGuess);
    $(para).css("display", "inline");
    para.appendChild(node);
    letterArea[0].appendChild(para);
}

function revealAllLetters(){
    for (var i = 0; i < randomWord.length; i++){
        var currentLetter = randomWord[i];
        guessArea[0].children[i].innerHTML = currentLetter;
    }
    setTimeout(function(){
        alert("You Won!!!");
        window.location.reload();
    }, 200);
}