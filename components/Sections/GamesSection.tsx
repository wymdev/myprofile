"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

// Snake Game - Mobile Friendly
function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canvasSize, setCanvasSize] = useState(320);

  const gridSize = 16;
  const cellSize = canvasSize / gridSize;

  const gameStateRef = useRef({
    snake: [{ x: 8, y: 8 }],
    food: { x: 12, y: 12 },
    direction: { x: 0, y: 0 },
    nextDirection: { x: 0, y: 0 },
  });

  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(320, window.innerWidth - 80);
      setCanvasSize(size);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const resetGame = useCallback(() => {
    gameStateRef.current = {
      snake: [{ x: 8, y: 8 }],
      food: { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) },
      direction: { x: 0, y: 0 },
      nextDirection: { x: 0, y: 0 },
    };
    setScore(0);
    setGameOver(false);
  }, []);

  const handleDirection = useCallback((dir: { x: number; y: number }) => {
    const { direction } = gameStateRef.current;
    if ((dir.x !== 0 && direction.x !== -dir.x) || (dir.y !== 0 && direction.y !== -dir.y)) {
      gameStateRef.current.nextDirection = dir;
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": handleDirection({ x: 0, y: -1 }); break;
        case "ArrowDown": handleDirection({ x: 0, y: 1 }); break;
        case "ArrowLeft": handleDirection({ x: -1, y: 0 }); break;
        case "ArrowRight": handleDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver, handleDirection]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = setInterval(() => {
      const state = gameStateRef.current;
      const currentCellSize = canvasSize / gridSize;

      if (state.nextDirection.x !== 0 || state.nextDirection.y !== 0) {
        state.direction = { ...state.nextDirection };
      }
      if (state.direction.x === 0 && state.direction.y === 0) {
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        ctx.fillStyle = "#4ec9b0";
        state.snake.forEach((s) => ctx.fillRect(s.x * currentCellSize + 1, s.y * currentCellSize + 1, currentCellSize - 2, currentCellSize - 2));
        ctx.fillStyle = "#f14c4c";
        ctx.beginPath();
        ctx.arc(state.food.x * currentCellSize + currentCellSize / 2, state.food.y * currentCellSize + currentCellSize / 2, currentCellSize / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      const head = { x: state.snake[0].x + state.direction.x, y: state.snake[0].y + state.direction.y };
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize ||
        state.snake.some((s) => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        setHighScore(prev => Math.max(prev, score));
        return;
      }
      state.snake.unshift(head);
      if (head.x === state.food.x && head.y === state.food.y) {
        setScore((s) => s + 10);
        state.food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
      } else {
        state.snake.pop();
      }

      ctx.fillStyle = "#1e1e1e";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      state.snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#4ec9b0" : "#3da890";
        ctx.fillRect(s.x * currentCellSize + 1, s.y * currentCellSize + 1, currentCellSize - 2, currentCellSize - 2);
      });
      ctx.fillStyle = "#f14c4c";
      ctx.beginPath();
      ctx.arc(state.food.x * currentCellSize + currentCellSize / 2, state.food.y * currentCellSize + currentCellSize / 2, currentCellSize / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
    }, 250);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, score, canvasSize]);

  return (
    <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between w-full mb-4 text-[13px] max-w-[320px] font-mono">
        <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">SCORE: {score.toString().padStart(4, '0')}</span>
        <span className="text-slate-500">HI: {highScore.toString().padStart(4, '0')}</span>
      </div>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="relative rounded-xl shadow-2xl" style={{ border: "2px solid #1e293b", background: "#020617" }} />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl" style={{ background: "rgba(2, 6, 23, 0.9)", backdropFilter: "blur(8px)" }}>
            <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-white/10 shadow-2xl">
              {gameOver && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-red-500 tracking-[0.3em] mb-1">GAME OVER</p>
                  <p className="text-4xl font-black text-white">{score}</p>
                </div>
              )}
              <h4 className="text-white font-black text-lg mb-1 tracking-tight">NEON SNAKE</h4>
              <p className="text-[10px] mb-8 text-slate-400 uppercase tracking-widest font-medium">Classic arcade re-imagined</p>
              <button 
                onClick={() => { resetGame(); setIsPlaying(true); }} 
                className="group relative px-10 py-4 bg-white text-black rounded-xl font-black tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                {gameOver ? "PLAY AGAIN" : "START SESSION"}
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-3 p-1 bg-slate-900/50 rounded-2xl border border-white/5 md:hidden">
        <div />
        <button onClick={() => handleDirection({ x: 0, y: -1 })} className="w-14 h-14 rounded-xl flex items-center justify-center text-xl bg-slate-800 border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all text-white">↑</button>
        <div />
        <button onClick={() => handleDirection({ x: -1, y: 0 })} className="w-14 h-14 rounded-xl flex items-center justify-center text-xl bg-slate-800 border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all text-white">←</button>
        <button onClick={() => handleDirection({ x: 0, y: 1 })} className="w-14 h-14 rounded-xl flex items-center justify-center text-xl bg-slate-800 border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all text-white">↓</button>
        <button onClick={() => handleDirection({ x: 1, y: 0 })} className="w-14 h-14 rounded-xl flex items-center justify-center text-xl bg-slate-800 border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all text-white">→</button>
      </div>
    </div>
  );
}


// Mini Sudoku (4x4)
function SudokuGame() {
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [original, setOriginal] = useState<boolean[][]>([]);
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const generatePuzzle = useCallback(() => {
    // Simple 4x4 Sudoku
    const solution = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ];
    // Shuffle rows within groups and columns
    const shuffled = [...solution];
    const puzzle: (number | null)[][] = shuffled.map(row => [...row]);
    const orig: boolean[][] = shuffled.map(() => [false, false, false, false]);

    // Remove some numbers (keep ~8 out of 16)
    let removed = 0;
    while (removed < 8) {
      const r = Math.floor(Math.random() * 4);
      const c = Math.floor(Math.random() * 4);
      if (puzzle[r][c] !== null) {
        puzzle[r][c] = null;
        removed++;
      }
    }

    // Mark original cells
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        orig[r][c] = puzzle[r][c] !== null;
      }
    }

    setBoard(puzzle);
    setOriginal(orig);
    setIsComplete(false);
    setSelected(null);
  }, []);

  useEffect(() => { generatePuzzle(); }, [generatePuzzle]);

  const handleCellClick = (row: number, col: number) => {
    if (!original[row]?.[col]) {
      setSelected({ row, col });
    }
  };

  const handleNumberInput = (num: number) => {
    if (selected && !original[selected.row][selected.col]) {
      const newBoard = board.map(row => [...row]);
      newBoard[selected.row][selected.col] = num === 0 ? null : num;
      setBoard(newBoard);

      // Check if complete
      const complete = newBoard.every(row => row.every(cell => cell !== null));
      if (complete) {
        // Validate
        const valid = validateSudoku(newBoard as number[][]);
        setIsComplete(valid);
      }
    }
  };

  const validateSudoku = (b: number[][]): boolean => {
    // Check rows and columns
    for (let i = 0; i < 4; i++) {
      const row = new Set(b[i]);
      const col = new Set(b.map(r => r[i]));
      if (row.size !== 4 || col.size !== 4) return false;
    }
    // Check 2x2 boxes
    for (let boxRow = 0; boxRow < 2; boxRow++) {
      for (let boxCol = 0; boxCol < 2; boxCol++) {
        const box = new Set<number>();
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 2; c++) {
            box.add(b[boxRow * 2 + r][boxCol * 2 + c]);
          }
        }
        if (box.size !== 4) return false;
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4 text-center">
        <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>Fill in numbers 1-4 (no repeats in rows, columns, or 2x2 boxes)</p>
      </div>

      {/* Board */}
      <div className="grid grid-cols-4 gap-0.5 p-1 rounded-xl" style={{ background: "var(--border-color)" }}>
        {board.map((row, rIdx) => row.map((cell, cIdx) => (
          <button
            key={`${rIdx}-${cIdx}`}
            onClick={() => handleCellClick(rIdx, cIdx)}
            className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl font-bold transition-all ${(rIdx < 2 && cIdx < 2) || (rIdx >= 2 && cIdx >= 2) ? "bg-opacity-50" : ""
              }`}
            style={{
              background: selected?.row === rIdx && selected?.col === cIdx
                ? "var(--accent)"
                : (rIdx < 2 && cIdx < 2) || (rIdx >= 2 && cIdx >= 2)
                  ? "rgba(255,255,255,0.03)"
                  : "var(--editor-bg)",
              color: original[rIdx]?.[cIdx]
                ? "var(--text-primary)"
                : cell
                  ? "var(--syntax-type)"
                  : "var(--text-muted)",
              borderRadius: `${rIdx === 0 && cIdx === 0 ? "10px" : "0"} ${rIdx === 0 && cIdx === 3 ? "10px" : "0"} ${rIdx === 3 && cIdx === 3 ? "10px" : "0"} ${rIdx === 3 && cIdx === 0 ? "10px" : "0"}`,
            }}
          >
            {cell || ""}
          </button>
        )))}
      </div>

      {/* Number Buttons */}
      <div className="flex gap-2 mt-4">
        {[1, 2, 3, 4, 0].map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all"
            style={{
              background: num === 0 ? "rgba(241,76,76,0.2)" : "var(--list-active)",
              color: num === 0 ? "#f14c4c" : "var(--text-primary)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {num === 0 ? "✕" : num}
          </button>
        ))}
      </div>

      {isComplete && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-4 p-4 rounded-xl text-center"
          style={{ background: "rgba(78,201,176,0.2)", border: "1px solid rgba(78,201,176,0.4)" }}
        >
          <p className="text-lg font-bold" style={{ color: "#4ec9b0" }}>Congratulations!</p>
          <button onClick={generatePuzzle} className="mt-2 text-[12px] underline" style={{ color: "var(--text-muted)" }}>
            New Puzzle
          </button>
        </motion.div>
      )}

      <button onClick={generatePuzzle} className="mt-4 text-[12px]" style={{ color: "var(--text-muted)" }}>
        New Puzzle
      </button>
    </div>
  );
}

// Memory Game - More Attractive
function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; symbol: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);

  const initGame = useCallback(() => {
    const symbols = ["◆", "●", "■", "▲", "◇", "○", "□", "△"];
    const shuffled = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false, matched: false }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setChecking(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const flipCard = (id: number) => {
    if (checking || flippedCards.length >= 2) return;

    setCards(prev => {
      if (prev[id].flipped || prev[id].matched) return prev;
      const newCards = [...prev];
      newCards[id] = { ...newCards[id], flipped: true };
      return newCards;
    });

    setFlippedCards(prev => {
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  useEffect(() => {
    if (flippedCards.length !== 2) return;

    setChecking(true);
    setMoves((m) => m + 1);

    const [first, second] = flippedCards;
    const firstCard = cards[first];
    const secondCard = cards[second];

    if (firstCard?.symbol === secondCard?.symbol) {
      // Match found
      setCards(prev => {
        const newCards = [...prev];
        newCards[first] = { ...newCards[first], matched: true };
        newCards[second] = { ...newCards[second], matched: true };
        return newCards;
      });
      setFlippedCards([]);
      setChecking(false);
    } else {
      // No match - flip back after delay
      setTimeout(() => {
        setCards(prev => {
          const newCards = [...prev];
          newCards[first] = { ...newCards[first], flipped: false };
          newCards[second] = { ...newCards[second], flipped: false };
          return newCards;
        });
        setFlippedCards([]);
        setChecking(false);
      }, 800);
    }
  }, [flippedCards.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check win condition separately
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setBestMoves(prev => prev === null ? moves : Math.min(prev, moves));
    }
  }, [cards, moves]);

  const isWon = cards.length > 0 && cards.every((c) => c.matched);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full mb-4 text-[13px] max-w-[300px]">
        <span style={{ color: "var(--syntax-type)" }}>Moves: {moves}</span>
        <span style={{ color: "var(--text-muted)" }}>{bestMoves ? `Best: ${bestMoves}` : ""}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => flipCard(card.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl text-2xl flex items-center justify-center transition-all"
            style={{
              background: card.matched
                ? "linear-gradient(135deg, #4ec9b0, #3da890)"
                : card.flipped
                  ? "linear-gradient(135deg, var(--accent), #0066b3)"
                  : "var(--list-active)",
              border: `2px solid ${card.matched ? "#4ec9b0" : card.flipped ? "var(--accent)" : "var(--border-subtle)"}`,
              boxShadow: card.flipped || card.matched ? "0 4px 15px rgba(0,0,0,0.3)" : "none",
            }}
          >
            {card.flipped || card.matched ? card.symbol : "?"}
          </motion.button>
        ))}
      </div>
      {isWon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-xl font-bold mb-2" style={{ color: "#4ec9b0" }}>You Won!</p>
          <p className="text-[13px] mb-3" style={{ color: "var(--text-muted)" }}>Completed in {moves} moves</p>
          <button onClick={initGame} className="px-4 py-2 rounded-lg text-[13px]" style={{ background: "var(--accent)", color: "#fff" }}>
            Play Again
          </button>
        </motion.div>
      )}
      {!isWon && (
        <button onClick={initGame} className="mt-4 text-[12px]" style={{ color: "var(--text-muted)" }}>
          Reset Game
        </button>
      )}
    </div>
  );
}

// Tic Tac Toe
function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every(s => s) ? "Draw" : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(checkWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4 text-center">
        {winner ? (
          <p className="text-lg font-bold" style={{ color: winner === "Draw" ? "var(--text-muted)" : "#4ec9b0" }}>
            {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
          </p>
        ) : (
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: isXNext ? "var(--accent)" : "var(--syntax-string)" }}>{isXNext ? "X" : "O"}</span>&apos;s turn
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            onClick={() => handleClick(index)}
            whileHover={{ scale: cell ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl font-bold flex items-center justify-center"
            style={{
              background: cell ? (cell === "X" ? "rgba(0,120,212,0.2)" : "rgba(206,145,120,0.2)") : "var(--list-active)",
              border: `2px solid ${cell ? (cell === "X" ? "var(--accent)" : "var(--syntax-string)") : "var(--border-subtle)"}`,
              color: cell === "X" ? "var(--accent)" : "var(--syntax-string)",
            }}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      <button onClick={resetGame} className="mt-4 px-4 py-2 rounded-lg text-[12px]" style={{ background: "var(--list-active)", color: "var(--text-secondary)" }}>
        New Game
      </button>
    </div>
  );
}

// Typing Speed Game
function TypingGame() {
  const words = ["const", "function", "return", "import", "export", "async", "await", "interface", "useState", "useEffect", "component", "render", "developer", "react", "typescript"];
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestWPM, setBestWPM] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const startGame = () => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setInput("");
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsPlaying(false);
          const wpm = score * 2;
          setBestWPM(prev => Math.max(prev, wpm));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value === currentWord) {
      setScore((s) => s + 1);
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="flex justify-between w-full mb-4 text-[13px]">
        <span style={{ color: "var(--syntax-type)" }}>Words: {score}</span>
        <span style={{ color: timeLeft <= 10 ? "#f14c4c" : "var(--text-muted)" }}>{timeLeft}s</span>
      </div>

      {isPlaying ? (
        <>
          <div className="w-full p-6 rounded-xl mb-4 text-center" style={{ background: "var(--list-active)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-2xl md:text-3xl font-mono">
              {currentWord.split("").map((char, i) => (
                <span key={i} style={{ color: i < input.length ? (input[i] === char ? "#4ec9b0" : "#f14c4c") : "var(--syntax-keyword)" }}>
                  {char}
                </span>
              ))}
            </p>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            className="w-full px-4 py-3 rounded-xl text-center text-lg outline-none"
            style={{ background: "var(--editor-bg)", border: "2px solid var(--accent)", color: "var(--text-primary)" }}
            autoFocus
            placeholder="Type here..."
          />
        </>
      ) : (
        <div className="text-center py-8">
          {timeLeft === 0 && (
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2" style={{ color: "var(--accent)" }}>{score * 2} WPM</p>
              <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Words: {score}</p>
              {bestWPM > 0 && <p className="text-[12px] mt-1" style={{ color: "#4ec9b0" }}>Best: {bestWPM} WPM</p>}
            </div>
          )}
          <button onClick={startGame} className="px-6 py-3 rounded-xl font-medium" style={{ background: "var(--accent)", color: "#fff" }}>
            {timeLeft === 0 ? "Try Again" : "Start Typing Test"}
          </button>
        </div>
      )}
    </div>
  );
}

// Galaxy Shooter - Simple 2D Shooter
function GalaxyShooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canvasSize, setCanvasSize] = useState(320);

  const gameStateRef = useRef({
    player: { x: 160, y: 280, width: 30, height: 30 },
    bullets: [] as { x: number; y: number }[],
    enemies: [] as { x: number; y: number; speed: number }[],
    lastSpawn: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(320, window.innerWidth - 80);
      setCanvasSize(size);
      gameStateRef.current.player.x = size / 2;
      gameStateRef.current.player.y = size - 40;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const resetGame = useCallback(() => {
    gameStateRef.current = {
      player: { x: canvasSize / 2, y: canvasSize - 40, width: 30, height: 30 },
      bullets: [],
      enemies: [],
      lastSpawn: 0,
    };
    setScore(0);
    setGameOver(false);
  }, [canvasSize]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = setInterval(() => {
      const state = gameStateRef.current;

      // Spawn enemies - Slower spawn
      const now = Date.now();
      if (now - state.lastSpawn > 1800) {
        state.enemies.push({
          x: Math.random() * (canvasSize - 20),
          y: -20,
          speed: 0.6 + Math.random() * 1.2, // Slower enemy speed
        });
        state.lastSpawn = now;
      }

      // Update bullets
      state.bullets = state.bullets.filter(b => b.y > 0);
      state.bullets.forEach(b => b.y -= 4); // Slower bullet speed


      // Update enemies
      state.enemies.forEach(e => e.y += e.speed);
      const hitEnemy = state.enemies.findIndex(e => e.y > canvasSize);
      if (hitEnemy > -1) {
          setGameOver(true);
          setIsPlaying(false);
      }

      // Collision detection
      state.bullets.forEach((b, bi) => {
        state.enemies.forEach((e, ei) => {
          if (b.x > e.x && b.x < e.x + 20 && b.y > e.y && b.y < e.y + 20) {
            state.bullets.splice(bi, 1);
            state.enemies.splice(ei, 1);
            setScore(s => s + 10);
          }
        });
      });

      // Draw
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Player
      ctx.fillStyle = "#0078d4";
      ctx.beginPath();
      ctx.moveTo(state.player.x, state.player.y);
      ctx.lineTo(state.player.x - 15, state.player.y + 20);
      ctx.lineTo(state.player.x + 15, state.player.y + 20);
      ctx.fill();

      // Bullets
      ctx.fillStyle = "#ff0000";
      state.bullets.forEach(b => ctx.fillRect(b.x - 2, b.y, 4, 10));

      // Enemies
      ctx.fillStyle = "#f14c4c";
      state.enemies.forEach(e => ctx.fillRect(e.x, e.y, 20, 20));

    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, canvasSize]);

  const move = (dir: number) => {
    const s = gameStateRef.current;
    s.player.x = Math.max(15, Math.min(canvasSize - 15, s.player.x + dir * 20));
  };

  const shoot = () => {
    gameStateRef.current.bullets.push({ x: gameStateRef.current.player.x, y: gameStateRef.current.player.y });
  };

  return (
    <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between w-full mb-4 text-[13px] max-w-[320px] font-mono">
        <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">SCORE: {score.toString().padStart(4, '0')}</span>
        <span className="text-slate-500">SECTOR-7</span>
      </div>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="relative rounded-xl shadow-2xl" style={{ border: "2px solid #1e293b", background: "radial-gradient(circle at center, #1e293b 0%, #020617 100%)" }} />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl" style={{ background: "rgba(2, 6, 23, 0.85)", backdropFilter: "blur(8px)" }}>
            <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-white/10 shadow-2xl">
              {gameOver && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-red-500 tracking-[0.3em] mb-1">MISSION FAILED</p>
                  <p className="text-4xl font-black text-white">{score}</p>
                </div>
              )}
              <h4 className="text-white font-black text-lg mb-1 tracking-tight">GALAXY DEFENDER</h4>
              <p className="text-[10px] mb-8 text-slate-400 uppercase tracking-widest font-medium">Clear the sector of all hostiles</p>
              <button 
                onClick={() => { resetGame(); setIsPlaying(true); }} 
                className="group relative px-10 py-4 bg-white text-black rounded-xl font-black tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                {gameOver ? "REDEPLOY" : "INITIATE MISSION"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 flex gap-8 items-end">
        <div className="flex gap-2 p-1 bg-slate-900/50 rounded-2xl border border-white/5">
          <button onClick={() => move(-1)} className="w-14 h-14 rounded-xl flex items-center justify-center text-xl bg-slate-800 border-b-4 border-slate-950 hover:bg-slate-700 active:border-b-0 active:translate-y-1 transition-all text-white">←</button>
          <button onClick={() => move(1)} className="w-14 h-14 rounded-xl flex items-center justify-center text-xl bg-slate-800 border-b-4 border-slate-950 hover:bg-slate-700 active:border-b-0 active:translate-y-1 transition-all text-white">→</button>
        </div>
        <button onClick={shoot} className="w-24 h-20 rounded-2xl flex flex-col items-center justify-center bg-red-600 border-b-[6px] border-red-900 hover:bg-red-500 active:border-b-0 active:translate-y-1.5 transition-all text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] group">
          <span className="text-2xl mb-1 group-active:scale-125 transition-transform">🔥</span>
          <span className="text-[10px] font-black tracking-widest">FIRE</span>
        </button>
      </div>
    </div>
  );
}


const games = [
  { id: "snake", name: "Snake", description: "Classic arcade", component: SnakeGame, color: "#4ec9b0" },
  { id: "galaxy", name: "Galaxy Shooter", description: "2D space combat", component: GalaxyShooter, color: "#0078d4" },
  { id: "sudoku", name: "Sudoku", description: "4x4 puzzle", component: SudokuGame, color: "#dcdcaa" },
  { id: "memory", name: "Memory", description: "Match pairs", component: MemoryGame, color: "#569cd6" },
  { id: "tictactoe", name: "Tic Tac Toe", description: "X vs O", component: TicTacToe, color: "#ce9178" },
  { id: "typing", name: "Typing", description: "Test WPM", component: TypingGame, color: "#f14c4c" },
];

export default function GamesSection() {
  const [activeGame, setActiveGame] = useState("snake");
  const ActiveGameComponent = games.find((g) => g.id === activeGame)?.component || SnakeGame;
  const activeGameData = games.find((g) => g.id === activeGame);

  return (
    <div className="h-full overflow-auto" style={{ background: "var(--editor-bg)" }}>
      <div className="min-h-full px-4 md:px-12 py-8 md:py-12 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Header */}
          <div className="mb-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ background: "linear-gradient(135deg, var(--text-primary), var(--syntax-function))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Mini Games
            </motion.h2>
            <p className="text-[13px] md:text-[14px]" style={{ color: "var(--text-muted)" }}>
              Take a break and have some fun! Built with React
            </p>
          </div>

          {/* Game Selection - Scrollable on mobile */}
          <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-2 md:gap-3 min-w-max">
              {games.map((game) => (
                <motion.button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 md:p-4 rounded-xl text-left transition-all min-w-[110px] md:min-w-[130px]"
                  style={{
                    background: activeGame === game.id
                      ? `linear-gradient(135deg, ${game.color}30, ${game.color}10)`
                      : "rgba(255,255,255,0.02)",
                    border: `2px solid ${activeGame === game.id ? game.color : "var(--border-subtle)"}`,
                    boxShadow: activeGame === game.id ? `0 4px 20px ${game.color}20` : "none",
                  }}
                >
                  <p className="font-semibold text-[13px] md:text-[14px]" style={{ color: activeGame === game.id ? game.color : "var(--text-primary)" }}>
                    {game.name}
                  </p>
                  <p className="text-[10px] md:text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {game.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Game Area */}
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 rounded-2xl flex justify-center"
            style={{
              background: `linear-gradient(135deg, ${activeGameData?.color}08, transparent)`,
              border: `1px solid ${activeGameData?.color}20`,
            }}
          >
            <ActiveGameComponent />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
