//buttons

let red = document.querySelector(".red");
let blue = document.querySelector(".blue");
let green = document.querySelector(".green");
let yellow = document.querySelector(".yellow");
let allBtn = document.querySelectorAll(".box");

let turns = document.querySelector(".turn");
let score = document.querySelector(".totolScore");

let randomSequence = [];
let userSequence = [];
let level = 1;

let colorarray = [red, blue, green, yellow];
let startBtn = document.querySelector(".start");
let userTurn = false;
let playerWon = false;



startBtn.addEventListener("mousedown", () => {
    console.log("start button is clicked")
    startBtn.style.color = "black";
    startBtn.disabled = true;
    startBtn.innerHTML = level;
    allBtn.forEach((e) => {
        e.disabled = false;
        e.style.opacity = "30%";

    })
    level = 1;
    userSequence = [];
    randomSequence = [];
    score.style.display = "none";


    play();



})


const userInput = () => {
    let userInput;

    return new Promise((resolve, reject) => {
        if (userTurn) {
            allBtn.forEach((e) => {
                e.disabled = false;
            })
            allBtn.forEach((e) => {
                e.addEventListener("click", () => {

                    allBtn.forEach((e) => {
                        e.disabled = true;
                    })

                    userInput = e.id;
                    console.log("input of user " + userInput)
                    resolve(userInput);

                })
            })

        }

    })


}

const nextLevel = () => {
    play();
    userSequence = [];
    level++
    startBtn.innerHTML = level;
}


const play = () => {
    randomSequence.push(randomNum());
    console.log('blick called')
    blinck();
}



const randomNum = () => {
    let randomNum = Math.round(Math.random() * 3);
    return randomNum;
}





const delay = (s) => {
    console.log("delay block called " + s)
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            colorarray[s].style.opacity = "100%"
            setTimeout(() => {

                colorarray[s].style.opacity = "30%"
                resolve();
            }, 800);


        }, 800);
    })



}


const blinck = async () => {
    for (const iterator of randomSequence) {

        turns.innerHTML = "Wait";
        await delay(iterator);


    }
    userTurn = true;
    getInput();
}

const getInput = async () => {

    for (let i = 0; i < randomSequence.length; i++) {
        turns.innerHTML = "Go";
        let playerNO = await userInput();
        userSequence.push(parseInt(playerNO));
        if (userSequence[i] !== randomSequence[i]) {
            break;
        }
    }


    userTurn = false;





    console.log("userturn " + userTurn)
    if (!userTurn)
        checkWin();
}


const checkWin = () => {


    console.log("user sequence " + userSequence)
    console.log("random sequence " + randomSequence)
    for (let i = 0; i < level; i++) {
        if (userSequence[i] !== randomSequence[i]) {
            console.log("You Lose! Mismatch at element", i);
            playerWon = false;
            score.style.display = "block";
            score.innerHTML = `Total score ${level}`;

            turns.innerHTML = "You Lose!"
            startBtn.innerHTML = "New Game";
            startBtn.style.color = "black";
            startBtn.disabled = false;
            level = 1;
            break; // Exit the loop on mismatch
        }
        playerWon = true;




    }


    if (playerWon && userSequence.length === randomSequence.length) {
        nextLevel();
    }

}

