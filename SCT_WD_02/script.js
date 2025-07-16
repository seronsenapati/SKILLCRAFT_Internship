// stopwatch.js (logic module)
class Stopwatch {
  constructor(displayCallback, lapCallback) {
    this.interval = null;
    this.startTime = null;
    this.accumulatedTime = 0;
    this.isRunning = false;
    this.lapCounter = 1;
    this.displayCallback = displayCallback;
    this.lapCallback = lapCallback;
  }

  displayTime(ms) {
    const minutes = Math.floor((ms / 60000) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  }

  updateDisplay() {
    const currentTime = Date.now() - this.startTime + this.accumulatedTime;
    this.displayCallback(this.displayTime(currentTime));
  }

  startStop() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.accumulatedTime += Date.now() - this.startTime;
      this.isRunning = false;
    } else {
      if (this.accumulatedTime === 0) {
        this.startTime = Date.now();
      } else {
        this.startTime = Date.now() - (this.accumulatedTime);
      }
      this.interval = setInterval(() => {
        this.updateDisplay();
        animateTick();
      }, 10);
      this.isRunning = true;
    }
  }

  reset() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.accumulatedTime = 0;
    this.lapCounter = 1;
    this.displayCallback('00:00:00');
    this.lapCallback('reset');
  }

  lap() {
    if (this.isRunning) {
      const currentTime = Date.now() - this.startTime + this.accumulatedTime;
      const lapTime = this.displayTime(currentTime);
      this.lapCallback(`Lap ${this.lapCounter}: ${lapTime}`);
      this.lapCounter++;
    }
  }
}

// UI module
const display = document.getElementById('display');
const lapTimes = document.getElementById('lapTimes');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

const stopwatch = new Stopwatch(
  (time) => {
    display.textContent = time;
    display.classList.remove('tick-animate');
    void display.offsetWidth; // force reflow
    display.classList.add('tick-animate');
  },
  (lap) => {
    if (lap === 'reset') {
      lapTimes.innerHTML = '';
    } else {
      const p = document.createElement('p');
      p.textContent = lap;
      p.classList.add('lap-animate');
      lapTimes.appendChild(p);
      setTimeout(() => p.classList.remove('lap-animate'), 700);
    }
  }
);

function animateTick() {
  // This is handled in the display callback for modularity
}

// Button event listeners
startStopBtn.addEventListener('click', () => {
  stopwatch.startStop();
  startStopBtn.textContent = stopwatch.isRunning ? 'Pause' : 'Start';
});
resetBtn.addEventListener('click', () => {
  stopwatch.reset();
  startStopBtn.textContent = 'Start';
});
lapBtn.addEventListener('click', () => stopwatch.lap());

// Animated background (simple floating bubbles)
function createAnimatedBg() {
  const bg = document.getElementById('animatedBg');
  for (let i = 0; i < 18; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = Math.random() * 100 + 'vw';
    bubble.style.animationDuration = 4 + Math.random() * 8 + 's';
    bubble.style.opacity = 0.15 + Math.random() * 0.25;
    bubble.style.width = bubble.style.height = 20 + Math.random() * 60 + 'px';
    bg.appendChild(bubble);
  }
}
createAnimatedBg();

// Bubble styles (inject for modularity)
const style = document.createElement('style');
style.textContent = `
.bubble {
  position: absolute;
  bottom: -80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff 0%, #a4508b 100%);
  filter: blur(1.5px);
  animation: floatUp linear infinite;
}
@keyframes floatUp {
  from { transform: translateY(0); }
  to { transform: translateY(-110vh); }
}
.tick-animate {
  animation: popIn 0.3s cubic-bezier(.77,0,.18,1);
}
.lap-animate {
  animation: lapEntry 0.7s cubic-bezier(.77,0,.18,1);
}
`;
document.head.appendChild(style);

// Smooth scroll for nav links
[...document.querySelectorAll('.navbar a')].forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});
