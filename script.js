let ttt = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let clickCount = 0, streak = 0;
let winner, preWinner;

const PLAYERS = ['X', 'O'], COLOR = ['red', 'blue'];

let btns = document.getElementsByTagName('button');
let p1 = document.getElementById('Player 1');
let p2 = document.getElementById('Player 2');
let res = document.getElementById('res');

function buttonClick(btn) {
    let pos = [btn.parentElement.id[btn.parentElement.id.length - 1] - 1,
                btn.id[btn.id.length - 1] - 1
            ];
    ttt[pos[0]][pos[1]] = PLAYERS[clickCount % 2];
    btn.className = `btn-${COLOR[clickCount % 2]}`;
    btn.append(ttt[pos[0]][pos[1]]);
    btn.disabled = true;
    clickCount++;
    winner = decideWinner();
    if (winner) {
        updateScores();
        finishGame(`Winner is ${winner}`);
    }
}

function decideWinner() {
    if (clickCount > 4) {
        for (let i = 0; i < 3; i++) {
            if (ttt[i][0] === ttt[i][1] && 
                ttt[i][0] === ttt[i][2])
                if (ttt[i][0] === 'X')
                    return 'Player 1';
                else if (ttt[i][0] === 'O')
                    return 'Player 2';
        }

        for (let j = 0; j < 3; j++) {
            if (ttt[0][j] === ttt[1][j] && 
                ttt[0][j] === ttt[2][j])
                if (ttt[0][j] === 'X')
                    return 'Player 1';
                else if (ttt[0][j] === 'O')
                    return 'Player 2';
        }

        if (ttt[0][0] === ttt[1][1] &&
            ttt[2][2] === ttt[1][1] ||
            ttt[0][2] === ttt[1][1] &&
            ttt[2][0] === ttt[1][1])
            if (ttt[1][1] === 'X')
                return 'Player 1';
            else if (ttt[1][1] === 'O')
                return 'Player 2';        
    }

    if (clickCount === 9) {
        winner = undefined;
        updateScores();
        finishGame('Game Draw');
    }
}

function updateScores() {
    if (preWinner === winner)
        streak += 1
    else
        streak = 1

    if (winner === 'Player 1') {
        p1.children.wins.textContent = Number(p1.children.wins.textContent) + 1;
        p2.children.losses.textContent = Number(p2.children.losses.textContent) + 1;
    }
    else if (winner === 'Player 2') {
        p2.children.wins.textContent = Number(p2.children.wins.textContent) + 1;
        p1.children.losses.textContent = Number(p1.children.losses.textContent) + 1;
    }
    else {
        p1.children.draws.textContent = Number(p1.children.draws.textContent) + 1;
        p2.children.draws.textContent = Number(p2.children.draws.textContent) + 1;
    }
}

function finishGame(winMessage) {
    res.textContent = winMessage + ' on a streak of ' + streak;

    for (let i = 0; i < btns.length - 1; i++)
        btns[i].disabled = true;
    
}

function playAgain() {
    for (let i = 0; i < btns.length - 1; i ++) {
        btns[i].className = 'btn'
        btns[i].textContent = ''
        btns[i].disabled = false;
    }
    res.textContent = '';
    ttt = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    clickCount = 0;
    preWinner = winner;
    winner = undefined;
}