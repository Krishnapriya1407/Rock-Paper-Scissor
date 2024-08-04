let score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,
    lose:0,
    tie:0};

JSON.parse(localStorage.getItem('score'));
updatedScore();

// for rock button
document.querySelector('.rock').addEventListener('click',()=>{playGame('rock');});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
         playGame('rock');
    } 
    else if (event.key === 'p') {
        playGame('paper');
    } 
    else if (event.key === 's') {
        playGame('scissor');
    }
     });

function playGame(playerMove){

    const compMove=pickCompMove();
    let result='';
    if (playerMove === compMove) {
      result = `Tie.`;
      score.tie += 1;

    } else if (
      (playerMove === 'rock' && compMove === 'scissor') ||
      (playerMove === 'paper' && compMove === 'rock') ||
      (playerMove === 'scissor' && compMove === 'paper')
    ) {
      result= `You Win.`;
      score.wins += 1;

    } else {
      result = `You Lose.`;
      score.lose += 1;
    }

localStorage.setItem('score',JSON.stringify(score));

document.querySelector('.result').innerHTML=result;

document.querySelector('.move').innerHTML=`You   <img class="move-icon" src="images/${playerMove}.png"> 
        <img class="move-icon" src="images/${compMove}.png"> computer`;
        
updatedScore();
}

function updatedScore(){
    document.querySelector('.score').innerHTML= `wins: ${score.wins} , lose: ${score.lose} , tie: ${score.tie}`;
}

function pickCompMove(){
    const randomNumber=Math.random();
    let compMove='';
    if (randomNumber < (1/3)){
        compMove='rock';
    }
     else if (randomNumber < (2 / 3)){
        compMove='paper';
    }
    else {
        compMove='scissor';
    }
    return compMove;
}

let isPlaying = false;
let intervalId;

function autoPlay() {
    if (!isPlaying) {
      
          intervalId = setInterval(function() {
            const playerMove = pickCompMove();
            playGame(playerMove);
          }, 1000);
          
          isPlaying = true;

          document.querySelector('.autoplay')
            .innerHTML = 'Stop Play';

        } else {
          isPlaying = false;
          clearInterval(intervalId);

          document.querySelector('.autoplay')
            .innerHTML = 'Auto Play';
        }
      }
