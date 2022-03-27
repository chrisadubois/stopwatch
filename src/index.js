import "./styles.css";

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const timerDiv = document.getElementById("timer");
const defaultTime = "00m:00s:00ms";

let clock = defaultTime;
let elapsed = 0;
let startTime;
let timer;

const toggle = () => {
  let startBtnAttrDisabled = startBtn.getAttribute("disabled");
  let pauseBtnAttrDisabled = pauseBtn.getAttribute("disabled");

  if (startBtnAttrDisabled) {
    startBtn.removeAttribute("disabled");
  } else if (!startBtnAttrDisabled) {
    startBtn.setAttribute("disabled", true);
  }

  if (pauseBtnAttrDisabled) {
    pauseBtn.removeAttribute("disabled");
  } else if (!pauseBtnAttrDisabled) {
    pauseBtn.setAttribute("disabled", "true");
  }

  startBtnAttrDisabled = startBtn.getAttribute("disabled");
  pauseBtnAttrDisabled = pauseBtn.getAttribute("disabled");
};

const initialize = () => {
  clock = defaultTime;
  elapsed = 0;
  startTime = undefined;
  document.getElementById("timer").innerText = clock;
  startBtn.removeAttribute("disabled");
  pauseBtn.setAttribute("disabled", "true");
};

const destroy = () => {
  if (timer) {
    clearInterval(timer);
  }
};

const getClock = (time) => {
  let diffInMinutes = time / 60000;
  let minutes = Math.floor(diffInMinutes);

  let diffInSeconds = (diffInMinutes - minutes) * 60;
  let seconds = Math.floor(diffInSeconds);

  let diffInMiliseconds = (diffInSeconds - seconds) * 100;
  let miliseconds = Math.floor(diffInMiliseconds);

  let formattedMM = minutes.toString().padStart(2, "0");
  let formattedSS = seconds.toString().padStart(2, "0");
  let formattedMS = miliseconds.toString().padStart(2, "0");

  return `${formattedMM}mm:${formattedSS}ss:${formattedMS}ms`;
};

const printClock = (value) => {
  clock = value;
  timerDiv.innerText = clock;
};

const count = () => {
  startTime = Date.now() - elapsed; // NOW minus time that will be set below
  timer = setInterval(() => {
    elapsed = Date.now() - startTime; // time since clock started
    printClock(getClock(elapsed));
  }, 10);
};

const start = () => {
  toggle();
  count();
};

const pause = () => {
  destroy();
  toggle();
};

const stop = () => {
  destroy();
  initialize();
};

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
stopBtn.addEventListener("click", stop);

initialize();
