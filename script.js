let ttt;
let clickCount;
let winner;

let scores = JSON.parse(localStorage.getItem("scores"));
if (!scores) {
  scores = {
    "red": {
      "wins": 0,
      "losses": 0,
      "draws": 0
    },
    "blue": {
      "wins": 0,
      "losses": 0,
      "draws": 0
    },
    "preWinner": undefined,
    "streak": 0,
    "matchCount": 0
  }
}

const PLAYERS = ["X", "O"],
  CSS = ["danger", "primary"],
  PLCOLOR = ["Red", "Blue"];

let btns = document.getElementsByTagName("button");
let p1 = document.getElementById("Red");
let p2 = document.getElementById("Blue");
let res = document.getElementById("res");
let turn = document.getElementById("turn");
let again = document.getElementById("again");
let match = document.getElementById("matchCount");
match.textContent = scores[matchCount];

p1.children.wins.textContent = scores["red"]["wins"];
p1.children.losses.textContent = scores["red"]["losses"];
p1.children.draws.textContent = scores["red"]["draws"];
p2.children.wins.textContent = scores["blue"]["wins"];
p2.children.losses.textContent = scores["blue"]["losses"];
p2.children.draws.textContent = scores["blue"]["draws"];

function play() {
  playAgain();
  document.getElementById("roundIndicator").style.display = "";
  document.getElementById("start").style.display = "none";
}

function buttonClick(btn) {
  let pos = [
    btn.parentElement.id[btn.parentElement.id.length - 1] - 1,
    btn.id[btn.id.length - 1] - 1,
  ];
  ttt[pos[0]][pos[1]] = PLAYERS[clickCount % 2];
  btn.className = `btn-lg btn-${CSS[clickCount % 2]}`;
  btn.append(ttt[pos[0]][pos[1]]);
  btn.disabled = true;
  clickCount++;
  turn.textContent = PLCOLOR[clickCount % 2] + " is playing...";
  winner = decideWinner();
  if (winner) {
    updateScores();
    finishGame(`Winner is ${winner}`);
  }
}

function decideWinner() {
  if (clickCount > 4) {
    for (let i = 0; i < 3; i++) {
      if (ttt[i][0] === ttt[i][1] && ttt[i][0] === ttt[i][2])
        if (ttt[i][0] === PLAYERS[0]) return "Red";
        else if (ttt[i][0] === PLAYERS[1]) return "Blue";
    }

    for (let j = 0; j < 3; j++) {
      if (ttt[0][j] === ttt[1][j] && ttt[0][j] === ttt[2][j])
        if (ttt[0][j] === PLAYERS[0]) return "Red";
        else if (ttt[0][j] === PLAYERS[1]) return "Blue";
    }

    if (
      (ttt[0][0] === ttt[1][1] && ttt[2][2] === ttt[1][1]) ||
      (ttt[0][2] === ttt[1][1] && ttt[2][0] === ttt[1][1])
    )
      if (ttt[1][1] === PLAYERS[0]) return "Red";
      else if (ttt[1][1] === PLAYERS[1]) return "Blue";
  }

  if (clickCount === 9 + (scores["matchCount"] % 2)) {
    winner = undefined;
    updateScores();
    finishGame("Game Draw");
  }
}

function updateScores() {
  if (scores["preWinner"] === winner) scores["streak"] += 1;
  else scores["streak"] = 1;

  if (winner === "Red") {
    p1.children.wins.textContent = ++scores["red"]["wins"]; // Number(p1.children.wins.textContent) + 1;
    p2.children.losses.textContent = ++scores["blue"]["losses"]; // Number(p2.children.losses.textContent) + 1;
  } else if (winner === "Blue") {
    p2.children.wins.textContent = ++scores["blue"]["wins"]; // Number(p2.children.wins.textContent) + 1;
    p1.children.losses.textContent = ++scores["red"]["losses"]; // Number(p1.children.losses.textContent) + 1;
  } else {
    p1.children.draws.textContent = ++scores["red"]["draws"]; // Number(p1.children.draws.textContent) + 1;
    p2.children.draws.textContent = ++scores["blue"]["draws"]; // Number(p2.children.draws.textContent) + 1;
  }
}

function finishGame(winMessage) {
  res.textContent = winMessage + " on a streak of " + scores["streak"];
  turn.textContent = "Want to play again?";
  again.style.display = "";
  for (let i = 0; i < btns.length - 1; i++) btns[i].disabled = true;

  scores["preWinner"] = winner;
  winner = undefined;
  localStorage.setItem("scores", JSON.stringify(scores));
}

function playAgain() {
  scores["matchCount"]++;
  for (let i = 0; i < btns.length - 1; i++) {
    btns[i].className = "btn btn-secondary";
    btns[i].textContent = "";
    btns[i].disabled = false;
  }
  match.textContent = scores["matchCount"]; // +1
  res.textContent = "";
  ttt = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  clickCount = 0 + (scores["matchCount"] % 2);
  turn.textContent = PLCOLOR[clickCount % 2] + " is playing...";
  again.style.display = "none";
}
