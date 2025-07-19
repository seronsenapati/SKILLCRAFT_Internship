console.log("Welcome to Tic Tac Toe - Neon Edition")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X"
}

// Animate cell pop
function animateCell(cell) {
  cell.classList.remove('cell-pop');
  void cell.offsetWidth;
  cell.classList.add('cell-pop');
  setTimeout(() => cell.classList.remove('cell-pop'), 350);
}

// Animate win highlight
function highlightWin(indices) {
  indices.forEach(i => {
    const cell = document.getElementsByClassName('box')[i];
    cell.classList.add('win-glow');
    setTimeout(() => cell.classList.remove('win-glow'), 1800);
  });
}

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName('boxtext');
  // Adjusted for 8vw cell size
  let wins = [
    [0, 1, 2, 4, 4, 0],    // top row
    [3, 4, 5, 4, 12, 0],   // middle row
    [6, 7, 8, 4, 20, 0],   // bottom row
    [0, 3, 6, -4, 12, 90], // left col
    [1, 4, 7, 4, 12, 90],  // mid col
    [2, 5, 8, 12, 12, 90], // right col
    [0, 4, 8, 4, 12, 45],  // diag TL-BR
    [2, 4, 6, 4, 12, 135], // diag TR-BL
  ]
  wins.forEach(e => {
    if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
      document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
      isgameover = true;
      document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
      document.querySelector(".line").style.width = "16vw";
      highlightWin([e[0], e[1], e[2]]);
    }
  })
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click', () => {
    if (boxtext.innerText === '' && !isgameover) {
      boxtext.innerText = turn;
      animateCell(boxtext);
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
      }
    }
  })
})
reset.addEventListener('click', () => {
  let boxtexts = document.querySelectorAll('.boxtext');
  Array.from(boxtexts).forEach(element => {
    element.innerText = ""
    element.classList.remove('cell-pop', 'win-glow');
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})

// Add cell pop and win glow styles dynamically for modularity
const style = document.createElement('style');
style.textContent = `
.cell-pop {
  animation: cellPop 0.35s cubic-bezier(.77,0,.18,1);
}
@keyframes cellPop {
  0% { transform: scale(0.7); color: #fff; }
  80% { transform: scale(1.2); color: #00ffe7; }
  100% { transform: scale(1); color: #ff00cc; }
}
.win-glow {
  box-shadow: 0 0 32px #ff00cc, 0 0 64px #00ffe7;
  background: rgba(255,0,204,0.12);
  color: #ff00cc !important;
  transition: box-shadow 0.3s, background 0.3s, color 0.3s;
}
`;
document.head.appendChild(style);

// Animated background (floating neon dots)
function createAnimatedBg() {
  const bg = document.querySelector('.animated-bg');
  for (let i = 0; i < 16; i++) {
    const dot = document.createElement('div');
    dot.className = 'neon-dot';
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.animationDuration = 4 + Math.random() * 8 + 's';
    dot.style.opacity = 0.12 + Math.random() * 0.18;
    dot.style.width = dot.style.height = 18 + Math.random() * 32 + 'px';
    bg.appendChild(dot);
  }
}
createAnimatedBg();

const bgStyle = document.createElement('style');
bgStyle.textContent = `
.neon-dot {
  position: absolute;
  bottom: -60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffe7 0%, #ff00cc 100%);
  filter: blur(2px);
  animation: floatUpNeon linear infinite;
}
@keyframes floatUpNeon {
  from { transform: translateY(0); }
  to { transform: translateY(-110vh); }
}
`;
document.head.appendChild(bgStyle);
