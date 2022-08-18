let options = {"rock":0,
                "paper":1,
                "scissors":2
                };

let computerSelection;
let playerSelection;
let playerWins=0;
let computerWins=0;
let roundCount=0;
let result;
let keepPlaying=false;

function getKeyByValue(value)
{
    for (const[key] of Object.entries(options))
    {
        if (options[key] == value)
        {
            return key;
        }
    }
    return false;
}
function getRandomSelection()
{
    return getKeyByValue(Math.floor(Math.random()*Object.keys(options).length));   
}

function getComputerChoice()
{
    computerSelection = getRandomSelection();
}

function figureOutWinner(playerSelection,computerSelection,losingOption,winningOption)
{
    if(playerSelection==winningOption)
    {
        playerWins++;
        return `You win: ${winningOption} beats ${losingOption}!`;
    }
    else
    {
        computerWins++;
        return `Computer wins: ${winningOption} beats ${losingOption}!`;
    }
}
function playRound(playerSelection,computerSelection)
{
    ++roundCount;
    if (options[playerSelection] == options[computerSelection])
    {
        result = `Both are ${playerSelection}! No points!`;
    }
    else if (playerSelection=="rock" && computerSelection=="paper" || playerSelection=="paper" && computerSelection=="rock")
    {
        result = figureOutWinner(playerSelection,computerSelection,"rock","paper");
    }
    else if (playerSelection=="paper" && computerSelection=="scissors" || playerSelection=="scissors" && computerSelection=="paper")
    {
        result = figureOutWinner(playerSelection,computerSelection,"paper","scissors");
    }
    else if (playerSelection=="scissors" && computerSelection=="rock" || playerSelection=="rock" && computerSelection=="scissors")
    {
        result = figureOutWinner(playerSelection,computerSelection,"scissors","rock");
    }
}

function playerSelectionInput()
{
    if(getKeyByValue(this.id))
    {
        playerSelection = getKeyByValue(this.id);
        game();
    }
}

function roundResults()
{
    return (
            `Round Count: ${roundCount}     Your wins: ${playerWins}     Computer wins: ${computerWins}
            \nYour selection: ${playerSelection} 
            \nComputer selection: ${computerSelection}\n\n` + 
            result
           );
}
function gameOver()
{
    let message;
    if (playerWins<computerWins)
    {
        message = `You lose!\nYour wins: ${playerWins}     Computer wins: ${computerWins}`;
    }
    else if(playerWins>computerWins)
    {
        message = `You win!\nYour wins: ${playerWins}     Computer wins: ${computerWins}`;
    }
    else
    {
        message = `The game ends in a tie!\nYour wins: ${playerWins}     Computer wins: ${computerWins}`;
    }
    message += "\nThanks for playing!";
    bod.insertBefore(endgameContainer,resultsContainer);
    bod.removeChild(ingameContainer);
    return message;
}

function game()
{
    if (roundCount==0 || roundCount%5 != 0 || keepPlaying)
    {
        getComputerChoice();
        playRound(playerSelection,computerSelection);
        resultsDisplay.innerText = roundResults();
        keepPlaying = false; //Ensures the end game page will show
    }
    else
    {
        resultsDisplay.innerText = gameOver();
        keepPlaying = false;
    }
}

function resetGame()
{
    computerSelection;
    playerSelection;
    playerWins=0;
    computerWins=0;
    roundCount=0;
    result;
    resultsDisplay.innerText ="";
    keepPlaying = false;
    bod.insertBefore(ingameContainer,resultsContainer);
    bod.removeChild(endgameContainer);
}
function continueGame()
{
    computerSelection;
    playerSelection;
    resultsDisplay.innerText ="";
    keepPlaying = true;
    bod.insertBefore(ingameContainer,resultsContainer);
    bod.removeChild(endgameContainer);
}
const resultDisplay = document.querySelector('#resultsDisplay');
const userGameOption = Array.from(document.querySelectorAll('.option'));
const ingameContainer = document.querySelector('#ingame-container');
const endgameContainer = document.querySelector('#endgame-container');
const resultsContainer = document.querySelector('#results-Container');
const userContinue = document.querySelector('#continue');
const userReset = document.querySelector('#reset');
const bod = document.querySelector('body');

userGameOption.forEach(option => option.addEventListener('click', playerSelectionInput)); 
userContinue.addEventListener('click', continueGame);
userReset.addEventListener('click',resetGame);

bod.insertBefore(ingameContainer,resultsContainer);
bod.removeChild(endgameContainer);