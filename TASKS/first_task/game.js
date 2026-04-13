/**
 * Tic-Tac-Toe AI — game.js
 * Minimax algorithm with Alpha-Beta Pruning
 *
 * Usage: <script src="game.js" defer></script>
 * Requires the HTML structure from index.html and style.css
 */

"use strict";

// ── Constants ──────────────────────────────────────────────────────────────

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

// ── Game State ─────────────────────────────────────────────────────────────

let board       = Array(9).fill(null); // null | "X" | "O"
let xIsNext     = true;
let gameOver    = false;
let aiThinking  = false;
let mode        = 0;          // 0 = vs AI, 1 = vs Human
let firstPlayer = "X";        // tracks who goes first (alternates each game)
let scores      = { X: 0, O: 0, D: 0 };
let aiTimer     = null;

// ── Minimax with Alpha-Beta Pruning ────────────────────────────────────────

/**
 * Check for a winner or draw on the given board.
 * @param {Array} b - 9-element board array
 * @returns {{ winner: string, line: number[] } | null}
 */
function checkWinner(b) {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return { winner: b[a], line: [a, c, d] };
    }
  }
  if (b.every(Boolean)) return { winner: "draw", line: [] };
  return null;
}

/**
 * Minimax with Alpha-Beta Pruning.
 * AI is the maximizing player (O), human is minimizing (X).
 *
 * @param {Array}   b          - current board state (mutated in place, restored after)
 * @param {number}  depth      - current recursion depth
 * @param {number}  alpha      - best score guaranteed for maximizer
 * @param {number}  beta       - best score guaranteed for minimizer
 * @param {boolean} isMax      - true if it's the AI's (O) turn
 * @returns {number} heuristic score
 */
function minimax(b, depth, alpha, beta, isMax) {
  const result = checkWinner(b);
  if (result) {
    if (result.winner === "O") return 10 - depth; // AI wins (faster = better)
    if (result.winner === "X") return depth - 10; // Human wins
    return 0;                                      // Draw
  }

  if (isMax) {
    // AI's turn — maximize score
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = "O";
        best = Math.max(best, minimax(b, depth + 1, alpha, beta, false));
        b[i] = null;
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break; // Beta cut-off
      }
    }
    return best;
  } else {
    // Human's turn — minimize score
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = "X";
        best = Math.min(best, minimax(b, depth + 1, alpha, beta, true));
        b[i] = null;
        beta = Math.min(beta, best);
        if (beta <= alpha) break; // Alpha cut-off
      }
    }
    return best;
  }
}

/**
 * Find the optimal move for the AI using minimax.
 * @param {Array} b - current board state
 * @returns {number} index of the best move (0–8), or -1 if none
 */
function getBestMove(b) {
  let bestVal  = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = "O";
      const val = minimax(b, 0, -Infinity, Infinity, false);
      b[i] = null;
      if (val > bestVal) {
        bestVal  = val;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

// ── Render ─────────────────────────────────────────────────────────────────

function render() {
  const boardEl = document.getElementById("board");
  const result  = checkWinner(board);
  const winLine = result ? result.line : [];

  // Render cells
  boardEl.innerHTML = "";
  board.forEach((val, i) => {
    const isWin    = winLine.includes(i);
    const disabled = gameOver || aiThinking || (mode === 0 && !xIsNext);
    const cell     = document.createElement("div");

    cell.className = [
      "cell",
      val               ? "taken"    : "",
      disabled && !val  ? "disabled" : "",
      isWin             ? "win-cell" : "",
    ].filter(Boolean).join(" ");

    if (val) {
      const span = document.createElement("span");
      span.className   = `mark mark-${val.toLowerCase()}`;
      span.textContent = val;
      cell.appendChild(span);
    } else {
      const hint = document.createElement("span");
      hint.className   = "cell-hint";
      hint.textContent = "·";
      cell.appendChild(hint);
    }

    if (!val && !disabled) {
      cell.addEventListener("click", () => handleClick(i));
    }
    boardEl.appendChild(cell);
  });

  // Status message
  const statusEl = document.getElementById("status");
  if (aiThinking) {
    statusEl.textContent = "AI Thinking…";
    statusEl.className   = "status thinking";
  } else if (result) {
    if (result.winner === "draw") {
      statusEl.textContent = "Draw!";
      statusEl.className   = "status draw";
    } else if (result.winner === "X") {
      statusEl.textContent = mode === 0 ? "You Win!" : "X Wins!";
      statusEl.className   = "status won-x";
    } else {
      statusEl.textContent = mode === 0 ? "AI Wins!" : "O Wins!";
      statusEl.className   = "status won-o";
    }
  } else {
    statusEl.textContent = mode === 0
      ? (xIsNext ? "Your Turn" : "AI's Turn")
      : (xIsNext ? "X's Turn"  : "O's Turn");
    statusEl.className   = "status playing";
  }

  // Turn pips
  document.getElementById("pip-x").className =
    "turn-pip" + (!gameOver && xIsNext  ? " x-active" : "");
  document.getElementById("pip-o").className =
    "turn-pip" + (!gameOver && !xIsNext ? " o-active" : "");

  // Scores
  document.getElementById("score-x").textContent = scores.X;
  document.getElementById("score-o").textContent = scores.O;
  document.getElementById("score-d").textContent = scores.D;
}

// ── Game Logic ─────────────────────────────────────────────────────────────

/**
 * Handle a cell click at index i.
 * @param {number} i - board index 0–8
 */
function handleClick(i) {
  if (board[i] || gameOver || aiThinking) return;
  if (mode === 0 && !xIsNext) return; // Block clicks during AI turn

  board[i] = xIsNext ? "X" : "O";
  const result = checkWinner(board);

  if (result) {
    gameOver = true;
    if (result.winner === "draw")  scores.D++;
    else if (result.winner === "X") scores.X++;
    else                            scores.O++;
  } else {
    xIsNext = !xIsNext;
    if (mode === 0 && !xIsNext) scheduleAI();
  }
  render();
}

/**
 * Schedule the AI move with a short delay so it "feels" like thinking.
 */
function scheduleAI() {
  aiThinking = true;
  render();
  clearTimeout(aiTimer);
  aiTimer = setTimeout(() => {
    const move = getBestMove([...board]);
    if (move !== -1) {
      board[move] = "O";
      const result = checkWinner(board);
      if (result) {
        gameOver = true;
        if (result.winner === "draw")  scores.D++;
        else if (result.winner === "O") scores.O++;
        else                            scores.X++;
      } else {
        xIsNext = true;
      }
    }
    aiThinking = false;
    render();
  }, 450);
}

// ── Controls ───────────────────────────────────────────────────────────────

/** Start a new game, alternating who goes first. */
function resetGame() {
  clearTimeout(aiTimer);
  board       = Array(9).fill(null);
  gameOver    = false;
  aiThinking  = false;
  firstPlayer = firstPlayer === "X" ? "O" : "X";
  xIsNext     = firstPlayer === "X";
  render();
  if (mode === 0 && !xIsNext) scheduleAI();
}

/** Reset scores and start fresh. */
function resetAll() {
  clearTimeout(aiTimer);
  board       = Array(9).fill(null);
  gameOver    = false;
  aiThinking  = false;
  firstPlayer = "X";
  xIsNext     = true;
  scores      = { X: 0, O: 0, D: 0 };
  render();
}

/**
 * Switch game mode.
 * @param {number} m - 0 = vs AI, 1 = vs Human
 */
function changeMode(m) {
  mode = m;
  document.getElementById("btn-ai").classList.toggle("active",    m === 0);
  document.getElementById("btn-human").classList.toggle("active", m === 1);
  document.getElementById("label-x").textContent = m === 0 ? "You (X)" : "X";
  document.getElementById("label-o").textContent = m === 0 ? "AI (O)"  : "O";
  resetAll();
}

// ── Init ───────────────────────────────────────────────────────────────────
render();