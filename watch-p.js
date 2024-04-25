let timer;
let isRunning = false;
let startTime;
let lapNumber = 1;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("startStop").classList.remove("running");
  } else {
    startTime = Date.now() - (lapNumber > 1 ? lapTimes[lapNumber - 1] : 0);
    timer = setInterval(updateDisplay, 10);
    document.getElementById("startStop").textContent = "Stop";
    document.getElementById("startStop").classList.add("running");
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timer);
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("startStop").textContent = "Start";
  document.getElementById("startStop").classList.remove("running");
  document.getElementById("laps").innerHTML = "";
  isRunning = false;
  lapNumber = 1;
}

let lapTimes = [];

function lap() {
  if (isRunning) {
    let lapTime = Date.now() - startTime;
    lapTimes.push(lapTime);
    let formattedTime = formatTime(lapTime);
    let lapListItem = document.createElement("li");
    lapListItem.textContent = `Lap ${lapNumber}: ${formattedTime}`;
    document.getElementById("laps").appendChild(lapListItem);
    lapNumber++;
  }
}

function updateDisplay() {
  let currentTime = Date.now() - startTime;
  let formattedTime = formatTime(currentTime);
  document.getElementById("display").textContent = formattedTime;
}

function formatTime(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor((milliseconds % 3600000) / 60000);
  let seconds = Math.floor((milliseconds % 60000) / 1000);
  let centiseconds = Math.floor((milliseconds % 1000) / 10);

  return (
    pad(hours, 2) +
    ":" +
    pad(minutes, 2) +
    ":" +
    pad(seconds, 2) +
    "." +
    pad(centiseconds, 2)
  );
}

function pad(number, length) {
  let str = String(number);
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}