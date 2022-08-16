
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

function getKeyByValue(value)
{
    for (const[key] of Object.entries(options))
    {
        if (options[key] == value)
        {
            return key;
        }
    }
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
    if (options[playerSelection] == options[computerSelection])
    {
        return `Both are ${playerSelection}! No points!`;
    }
    else if (playerSelection=="rock" && computerSelection=="paper" || playerSelection=="paper" && computerSelection=="rock")
    {
        return figureOutWinner(playerSelection,computerSelection,"rock","paper");
    }
    else if (playerSelection=="paper" && computerSelection=="scissors" || playerSelection=="scissors" && computerSelection=="paper")
    {
        return figureOutWinner(playerSelection,computerSelection,"paper","scissors");
    }
    else if (playerSelection=="scissors" && computerSelection=="rock" || playerSelection=="rock" && computerSelection=="scissors")
    {
        return figureOutWinner(playerSelection,computerSelection,"scissors","rock");
    }
}

function playerSelectionInput(message = "Enter your selection of rock, paper, or scissors below:")
{
    
    playerSelection = prompt(message);
    //Prevents the user from cancelling the prompt
    if (playerSelection==null)
    {
        playerSelectionInput("Error: Please enter a valid option!\nEnter your selection of rock, paper, or scissors below:")
    }
    
    playerSelection = playerSelection.toLowerCase();  
    if(options[playerSelection] == undefined)
    {
        playerSelectionInput("Error: Please enter a valid option!\nEnter your selection of rock, paper, or scissors below:");
    }
}

function roundResults()
{
    alert(
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
    alert(message);
}

function game()
{
    for(let gameCount=0;gameCount<5;gameCount++)
    {
        roundCount++;
        playerSelectionInput();
        getComputerChoice();
        result = playRound(playerSelection,computerSelection);
        roundResults();
    }
    gameOver();
}
//Plays the game
game();