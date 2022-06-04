// Pomodoro Timer

// btns
var startWorkBtn = document.querySelector("#start-work");
var startBreakBtn = document.querySelector("#start-break");
var resumeWorkBtn = document.querySelector("#resume-work");
var endWorkBtn = document.querySelector("#end-work");
// spans
var hourHtml = document.querySelectorAll(".work-hour");
var minHtml = document.querySelectorAll(".work-min");
var secHtml = document.querySelectorAll(".work-sec");
// timer varaibles
var workHour, workMin, workSec, breakHour, breakMin, breakSec;
// Intervals
var startWorkInterval;
var startBreakInterval;
var resumeWorkInterval;

var flag;

// Reset Timer in Begin
resetTimer();

//start work event
startWorkBtn.addEventListener("click", function () {
  flag = this.id;
  clearInterval(startBreakInterval);
  clearInterval(resumeWorkInterval);
  clearInterval(startWorkInterval);
  startWorkInterval = setInterval(beginTimer, 1000);
  startBreakBtn.disabled = false;
  resumeWorkBtn.disabled = false;
  endWorkBtn.disabled = false;
  startWorkBtn.disabled = true;
});

//start break event
startBreakBtn.addEventListener("click", function () {
  flag = this.id;
  clearInterval(startBreakInterval);
  clearInterval(startWorkInterval);
  clearInterval(resumeWorkInterval);
  startBreakInterval = setInterval(beginTimer, 1000);
});

//resume work event
resumeWorkBtn.addEventListener("click", function () {
  flag = this.id;
  clearInterval(startWorkInterval);
  clearInterval(startBreakInterval);
  clearInterval(resumeWorkInterval);
  resumeWorkInterval = setInterval(beginTimer, 1000);
});

//end work event
endWorkBtn.addEventListener("click", function () {
  clearInterval(startWorkInterval);
  clearInterval(startBreakInterval);
  clearInterval(resumeWorkInterval);
  endTimer();
  startWorkBtn.disabled = false;
  startBreakBtn.disabled = true;
  resumeWorkBtn.disabled = true;
  endWorkBtn.disabled = true;
  updateDom(0);
  updateDom(1);
});

// Begin Timer
function beginTimer() {
  if (flag == "start-work" || flag == "resume-work") {
    workSec++;
    if (workSec % 60 == 0) {
      workSec = 0;
      workMin++;
      if (workMin % 60 == 0) {
        workMin = 0;
        workHour++;
      }
    }
  updateDom(0);
  } else if (flag == "start-break") {
    breakSec++;
    if (breakSec % 60 == 0) {
      breakSec = 0;
      breakMin++;
      if (breakMin % 60 == 0) {
        breakMin = 0;
        breakHour++;
      }
    }
  updateDom(1);
  }
}
// End Timer
function endTimer() {
  alert("WorkTime => hour: " + workHour + " Minute: " + workMin + " Second: " + workSec);
  alert("BreakTime => hour: " + breakHour + " Minute: " + breakMin + " Second: " + breakSec);
  resetTimer();
  updateDom();
}

// Reset Timer
function resetTimer() {
  workHour = workMin = workSec = breakHour = breakMin = breakSec = 0;
}
// Format Digits
function toDoubleDigits(num) {
  return num < 10 ? "0" + parseInt(num, 10) : num;
}
// Update DOM
function updateDom(nodeIndex) {
  console.log(nodeIndex);
  if (nodeIndex == 0) {
    hourHtml[nodeIndex].textContent = workHour;
    minHtml[nodeIndex].innerText = toDoubleDigits(workMin);
    secHtml[nodeIndex].innerText = toDoubleDigits(workSec);
  } else if (nodeIndex == 1) {
    hourHtml[nodeIndex].textContent = breakHour;
    minHtml[nodeIndex].innerText = toDoubleDigits(breakMin);
    secHtml[nodeIndex].innerText = toDoubleDigits(breakSec);
  }
}


