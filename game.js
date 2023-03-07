const optionsObject = {
    rock: 'ROCK', paper: 'PAPER', scissors: 'SCISSORS'
}

let playerChoice = null;
let computerChoice = null;
let roundCount = 1;

let playerWins = 0;
let computerWins = 0;
const options = Object.values(optionsObject)

function updateScoresInTable() {

    const [playerChoiceTD, computerChoiceTD] = table.lastChild.children
    playerChoiceTD.innerText = playerWins
    computerChoiceTD.innerText = computerWins
}

function generateComputerChoice() {

    pComputerChoice.innerText = 'loading choice....'
    setTimeout(() => {
        computerChoice = options[Math.floor(Math.random() * options.length)]

        pComputerChoice.innerText = `COMPUTER CHOICE: ${computerChoice}`
        pPlayerChoice.innerText = `YOUR CHOICE: ${playerChoice}`

        playRound()
        updateScoresInTable()
        checkWinner()
        changeDisabledStateButtons(false)
    }, 500);
}

function changeDisabledStateButtons(newDisabledState) {
    for (const button of document.getElementsByTagName('button')) {
        if (newDisabledState) {
            button.setAttribute('disabled', newDisabledState)
        } else {
            button.removeAttribute('disabled')
        }
    }
}


function restartGame() {
    const result = confirm('DO YOU WANNA PLAY ANOTHER GAME?')
    if (result) {
        playerChoice = null;
        computerChoice = null;
        roundCount = 1;
        playerWins = 0;
        computerWins = 0;
        pRoundCount.innerText = `ROUND: ${roundCount}`
        pRoundCount.innerText = ''
        updateScoresInTable()
        console.log('restart')
    } else {
        console.log('finish')
        changeDisabledStateButtons(true)
    }
}

function checkWinner() {
    if (playerWins === 2) {
        gameRoundResult.innerText = `PLAYER WINS`
        restartGame()
    }
    if (computerWins === 2) {
        gameRoundResult.innerText = `COMPUTER WINS`
        restartGame()
    }
}

function playRound() {

    if (playerChoice === computerChoice) {
        // alert('DRAW!')
        gameRoundResult.innerText = 'DRAW. PLAY AGAIN ROUND'
        return;
    }
    roundCount++
    pRoundCount.innerText = `ROUND: ${roundCount}`
    // if (playerChoice === optionsObject.rock && computerChoice === optionsObject.scissors){}

    if (computerChoice === optionsObject.rock) {
        return (playerChoice === optionsObject.paper) ? playerWins++ : computerWins++
    }

    if (computerChoice === optionsObject.paper) {
        return (playerChoice === optionsObject.scissors) ? playerWins++ : computerWins++
    }

    if (computerChoice === optionsObject.scissors) {
        return (playerChoice === optionsObject.rock) ? playerWins++ : computerWins++
    }

}

// while (playerWins <= 1 && computerWins <= 1) {
//     // playRound()
//     // alert(JSON.stringify({ playerWins, computerWins }))
// }

if (playerWins > computerWins) {
    // alert('Player wins')
} else {
    // alert('Computer wins')
}

const pPlayerChoice = document.createElement('p');
const pComputerChoice = document.createElement('p');
const gameRoundResult = document.createElement('p');
const pRoundCount = document.createElement('p');

const table = document.createElement('table');
const rowWithNames = document.createElement('tr');

const tableCellPlayerName = document.createElement('td');
tableCellPlayerName.innerText = 'Your score'
const tableCellComputerName = document.createElement('td');
tableCellComputerName.innerText = 'PC score'

rowWithNames.append(tableCellPlayerName, tableCellComputerName)

const rowWithScores = document.createElement('tr');

const tableCellPlayerScore = document.createElement('td');
tableCellPlayerScore.innerText = playerWins
const tableCellComputerScore = document.createElement('td');
tableCellComputerScore.innerText = computerWins

rowWithScores.append(tableCellPlayerScore, tableCellComputerScore)

table.append(rowWithNames, rowWithScores)

gameRoundResult.innerText = `WAITING FOR CHOICES`
pRoundCount.innerText = `ROUND: ${roundCount}`

Object.values(optionsObject).forEach((option) => {
    const button = document.createElement('button');
    button.innerText = option;

    button.addEventListener('click', () => {

        playerChoice = option
        pPlayerChoice.innerText = `YOUR CHOICE: *****`
        changeDisabledStateButtons(true)
        generateComputerChoice()
    })
    document.body.append(button)
})

document.body.append(pPlayerChoice)
document.body.append(pComputerChoice)
document.body.append(gameRoundResult)
document.body.append(pRoundCount)
document.body.append(table)
document.querySelectorAll('td').forEach((td) => td.classList.add('cell'))

// console.log(document.querySelectorAll('[data-email]'));