var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// 0 is empty 1 is a cross and 2 is a nought

var playersSide = 1;
var aisSide = 0;
var turn = 0;

// 0 is crosses and 1 is noughts

function printBoard() {
  var square = 0;
  var line1 = [];
  var line2 = [];
  var line3 = [];
  for (square = 0; square < 9; square++) {
    if (board[square] === 0) {
      if (square < 3) {
        line1.push('.');
      } else if (square < 6) {
        line2.push('.');
      } else if (square < 9) {
        line3.push('.');
      }
    } else if (board[square] === 1) {
      if (square < 3) {
        line1.push('x');
      } else if (square < 6) {
        line2.push('x');
      } else if (square < 9) {
        line3.push('x');
      }
    } else if (board[square] === 2) {
      if (square < 3) {
        line1.push('o');
      } else if (square < 6) {
        line2.push('o');
      } else if (square < 9) {
        line3.push('o');
      }
    }
  }
  console.log(line1[0] + '|' + line1[1] + '|' + line1[2]);
  console.log('-+-+-');
  console.log(line2[0] + '|' + line2[1] + '|' + line2[2]);
  console.log('-+-+-');
  console.log(line3[0] + '|' + line3[1] + '|' + line3[2]);
  console.log("\n")
}

function resetBoard() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function placeCross(square) {
  board[square] = 1;
  turn = 1;
}

function placeNought(square) {
  board[square] = 2;
  turn = 0;
}

function emptySquare(square, lastTurn) {
  board[square] = 0;
  turn = lastTurn;
}

function getMoves() {
  var moves = [];
  for (var i = 0; i < 9; i++) {
    if (board[i] === 0) {
      moves.push(i);
    }
  }
  return moves;
}

function isPlayersTurn() {
  if (turn == playersTurn) return true;
  return false;
}

function getBestMove() {
  var moves = getMoves();
  var bestScore = -999999
  var bestMove;
  for (var i = 0; i < moves.length; i++) {
    if(playersSide === 0) {
      placeNought(moves[i]);
    } else {
      placeCross(moves[i]);
    }
    var score = (aisSide === 0) ? -negamax(1) :negamax(-1);
    console.log(score);
    emptySquare(moves[i], aisSide);
    if (score > bestScore) {
      bestScore = score;
      bestMove = moves[i];
    } 
  }
  return bestMove;
}

function negamax(colour) {
  var moves = getMoves();
  if (moves.length === 0 ||
  (board[0] == 1 && board[1] == 1 && board[2] == 1) ||
  (board[3] == 1 && board[4] == 1 && board[5] == 1) ||
  (board[6] == 1 && board[7] == 1 && board[8] == 1) ||
  (board[0] == 1 && board[3] == 1 && board[6] == 1) ||
  (board[1] == 1 && board[4] == 1 && board[7] == 1) ||
  (board[2] == 1 && board[5] == 1 && board[6] == 1) ||
  (board[0] == 1 && board[4] == 1 && board[8] == 1) ||
  (board[2] == 1 && board[4] == 1 && board[6] == 1) ||
  (board[0] == 2 && board[1] == 2 && board[2] == 2) ||
  (board[3] == 2 && board[4] == 2 && board[5] == 2) ||
  (board[6] == 2 && board[7] == 2 && board[8] == 2) ||
  (board[0] == 2 && board[3] == 2 && board[6] == 2) ||
  (board[1] == 2 && board[4] == 2 && board[7] == 2) ||
  (board[2] == 2 && board[5] == 2 && board[6] == 2) ||
  (board[0] == 2 && board[4] == 2 && board[8] == 2) ||
  (board[2] == 2 && board[4] == 2 && board[6] == 2)) {
    //console.log((aisSide === 0) ? -getScore() : getScore())
    return getScore() * colour;
  }
  var bestScore = -999999;
  for (var i = 0; i < moves.length; i++) {
    if ((aisSide === 0 && colour == -1) || (aisSide === 1 && colour === 1)) {
      if (playersSide === 0) {
        placeCross(moves[i]);
      } else {
        placeNought(moves[i])
      }
    } else {
      if (playersSide === 0) {
        placeNought(moves[i]);
      } else {
        placeCross(moves[i]);
      }
    }
    var score = -negamax(-colour);
    //console.log(score);
    if ((aisSide === 0 && colour == -1) || (aisSide === 1 && colour === 1)) {
      emptySquare(moves[i], playersSide);
    } else {
      emptySquare(moves[i], aisSide);
    }
    if (score > bestScore) bestScore = score;
  }
  return bestScore;
}

function getScore() {
  if ((board[0] == 1 && board[1] == 1 && board[2] == 1) ||
  (board[3] == 1 && board[4] == 1 && board[5] == 1) ||
  (board[6] == 1 && board[7] == 1 && board[8] == 1) ||
  (board[0] == 1 && board[3] == 1 && board[6] == 1) ||
  (board[1] == 1 && board[4] == 1 && board[7] == 1) ||
  (board[2] == 1 && board[5] == 1 && board[6] == 1) ||
  (board[0] == 1 && board[4] == 1 && board[8] == 1) ||
  (board[2] == 1 && board[4] == 1 && board[6] == 1)) {
    return -10;
  } else if ((board[0] == 2 && board[1] == 2 && board[2] == 2) ||
  (board[3] == 2 && board[4] == 2 && board[5] == 2) ||
  (board[6] == 2 && board[7] == 2 && board[8] == 2) ||
  (board[0] == 2 && board[3] == 2 && board[6] == 2) ||
  (board[1] == 2 && board[4] == 2 && board[7] == 2) ||
  (board[2] == 2 && board[5] == 2 && board[6] == 2) ||
  (board[0] == 2 && board[4] == 2 && board[8] == 2) ||
  (board[2] == 2 && board[4] == 2 && board[6] == 2)) {
    return 10;
  } else if (board[0] != 0 && board[1] != 0 && board[2] != 0 && board[3] != 0 && board[4] != 0 && board[5] != 0 && board[6] != 0 && board[7] != 0 && board[8] != 0) {
    return 0;
  }
}

placeCross(getBestMove());
printBoard();
