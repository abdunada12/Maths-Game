let game = false;
const button = document.querySelector('#startreset')
let score = document.querySelector('#score')
let scoreNumber = document.querySelector('#score span')
let question = document.querySelector('#question')
let correct = document.querySelector('#correct') /**/
let wrong = document.querySelector('#wrong') /**/
let timer = document.querySelector('#timer')
let timerNumber = document.querySelector('#timer span')
let gameOver = document.querySelector('#gameOver') /**/
let gameOverScoreNumber = document.querySelector('#gameOver span')
let allBoxes = document.querySelectorAll('.box')
var action;
var timerCount;
let correctAns;
let scorePoints = 0;


button.addEventListener('click', ()=>{


    if (!game){
        startGame()

    }else{
        location.reload()
    }

})



function startGame(){
    game = true;
    scorePoints = 0
    scoreNumber.innerHTML = scorePoints
    show("#timer")
    hide("#gameOver")
    button.innerHTML = 'Reset Game'
    generateQ()
    timerCount = 60
    countDown();
    allBoxes.forEach((box)=>{
        box.addEventListener('click', ()=>{
            if(game == true){
                if(box.innerHTML == correctAns){
                    hide("#wrong")
                    show("#correct")
                    setTimeout(()=>{
                        hide("#correct")
                    },750)
                    scorePoints++
                    scoreNumber.innerHTML = scorePoints
                    generateQ()
                } else if (box.innerHTML != correctAns){
                    hide("#correct")
                    show("#wrong")
                    setTimeout(()=>{
                        hide("#wrong")
                    },750)
                }
            }
        })
    })
}


function countDown(){
    action = setInterval(()=>{
        timerCount-=1
        timerNumber.innerHTML = timerCount;
        
        if (timerCount <= 0) {
            stopCount()
            show("#gameOver")
            hide("#timer")
            // game = false
            gameOverScoreNumber.innerHTML = scoreNumber.innerHTML
            button.innerHTML = "Reload Page"
            allBoxes.forEach((box)=>{
                box.innerHTML = ""
            })
            question.innerHTML = ""
            
        }
    }, 1000);
}

function stopCount(){
    clearInterval(action)
}

function hide(selector){
    document.querySelector(selector).style.display = 'none'
}
function show(selector){
    document.querySelector(selector).style.display = "block"
}
function generateQ(){
    let x = 1 + Math.round(9 * Math.random())
    let y = 1 + Math.round(9 * Math.random())
    correctAns = x*y;

    question.innerHTML = `${x} x ${y}`
    
    let correctPosition = 1 + Math.round(3 * Math.random())

    document.querySelector("#box" + correctPosition).innerHTML = correctAns

    let answers = [correctAns]
    for(i = 1; i < 5; i++){
        if (i != correctPosition){
            let wrongAnswer; 

            do {
                wrongAnswer = (1 + Math.round(9 * Math.random()))*(1 + Math.round(9 * Math.random()))
            } while (answers.indexOf(wrongAnswer) > -1);

            document.querySelector("#box" + i).innerHTML = wrongAnswer
            answers.push(wrongAnswer)
        }
    }
}




