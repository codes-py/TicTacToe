let ttt = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var clickCount = 0;
const players = ['X', 'O'];
const color = ['red', 'blue'];

function buttonClick(btn) {
    let pos = [btn.parentElement.id[btn.parentElement.id.length - 1] - 1,
                btn.id[btn.id.length - 1] - 1
            ];
    ttt[pos[0]][pos[1]] = players[clickCount % 2];
    btn.style.background = color[clickCount % 2];
    btn.append(ttt[pos[0]][pos[1]]);
    btn.disabled = true;
    clickCount++;
    let winner = decideWinner();
    if (winner)
        finishGame(`Winner is ${winner}`)
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

    if (clickCount === 9)
            finishGame('Game Draw');
}

function finishGame(winner) {
    let res = document.createElement('h2')
    res.append(winner);
    
    let container = document.getElementById('ttt');
    container.appendChild(res);

    let btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i++)
        btns[i].disabled = true;
}