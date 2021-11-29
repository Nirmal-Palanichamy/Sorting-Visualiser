"use strict";
const initialCondition = new Set();
const algorithm = new Set();
const style = getComputedStyle(document.body);
const sortedColor = style.getPropertyValue("--sorted-color");
const comparingColor = style.getPropertyValue("--comparing-color");
const lightColor = style.getPropertyValue("--light-color");
const processingColor = style.getPropertyValue("--processing-color");
let cards,
  started,
  isPlaying,
  arraySize,
  currSpeed,
  bodyWidth,
  finishedTotal,
  tableNumber,
  widthItems,
  heightItems,
  horizontal;
var newRandomArray, newNearlySortedArray, newReversedArray, newFewUniqueArray;

window.onload = function () {
  initialise();
  createNewArraysAndConstructTable();
};

window.onresize = function () {
  if (
    document.body.clientWidth < bodyWidth - 10 ||
    document.body.clientWidth > bodyWidth + 10
  ) {
    constructTable();
  }
};

function initialise() {
  initialCondition.add("Random");
  document.getElementById("ic-1").innerHTML += "&#x2713";
  algorithm.add("Bubble Sort");
  document.getElementById("a-1").innerHTML += "&#x2713";
  started = false;
  isPlaying = false;
  arraySize = document.getElementById("size-input").value * 4;
  currSpeed = Number(document.getElementById("speed-input").value);
  bodyWidth = document.body.clientWidth;
  finishedTotal = 0;
  tableNumber = 1;
}

function constructTable() {
  cards = [];
  started = false;
  isPlaying = false;
  finishedTotal = 0;
  tableNumber++;
  widthItems = algorithm;
  heightItems = initialCondition;
  horizontal = "algorithm";
  bodyWidth = document.body.clientWidth;
  if (bodyWidth < 878) {
    widthItems = initialCondition;
    heightItems = algorithm;
    horizontal = "initialCondition";
  }
  createLayout();
  createContoller();
  setHorizontalHeadings();
  setVerticalHeadings();
  setBarWidths();
}

function createLayout() {
  const table = document.querySelector("main");
  table.innerHTML = "";
  table.style.setProperty(
    "grid-template-columns",
    `repeat(${widthItems.size + 1},1fr)`
  );
  for (let i = 0; i < heightItems.size + 1; i++) {
    const temp = [];
    for (let j = 0; j < widthItems.size + 1; j++) {
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      if (horizontal == "algorithm") {
        newCard.style.setProperty("width", "6rem");
        newCard.style.setProperty("height", "6rem");
      } else {
        const cardWidth = Math.min((bodyWidth - 40) / 5, 96);
        newCard.style.setProperty("font-size", `${cardWidth / 96}rem`);
        newCard.style.setProperty("width", `${cardWidth}px`);
        newCard.style.setProperty("height", `${cardWidth}px`);
      }
      table.appendChild(newCard);
      temp.push(newCard);
    }
    cards.push(temp);
  }
}

function createContoller() {
  cards[0][0].classList.add("controller");
  const newRandomiser = document.createElement("i");
  newRandomiser.classList.add("fas", "fa-random", "randomise");
  newRandomiser.onclick = createNewArraysAndConstructTable;
  cards[0][0].appendChild(newRandomiser);
  const newPlayPauser = document.createElement("i");
  newPlayPauser.classList.add("fas", "fa-play", "play-pause");
  newPlayPauser.onclick = playPause;
  cards[0][0].appendChild(newPlayPauser);
}

function setHorizontalHeadings() {
  for (let i = 0; i < widthItems.size; i++) {
    if (horizontal == "algorithm") {
      cards[0][i + 1].innerHTML = [...widthItems][i].replace(" Sort", "");
    } else {
      cards[0][i + 1].innerHTML = [...widthItems][i];
    }
  }
}

function setVerticalHeadings() {
  for (let i = 0; i < heightItems.size; i++) {
    if (horizontal == "initialCondition") {
      cards[i + 1][0].innerHTML = [...heightItems][i].replace(" Sort", "");
    } else {
      cards[i + 1][0].innerHTML = [...heightItems][i];
    }
  }
}

function setBarWidths() {
  const barHeight = cards[0][0].clientHeight / arraySize;
  for (let i = 0; i < heightItems.size; i++) {
    for (let j = 0; j < widthItems.size; j++) {
      cards[i + 1][j + 1].style.setProperty("align-items", "flex-start");
      for (let k = 0; k < arraySize; k++) {
        const newBar = document.createElement("div");
        newBar.classList.add("bar");
        newBar.style.setProperty("height", `${barHeight}px`);
        let rowVal, colVal;
        if (horizontal == "algorithm") {
          rowVal = i + 1;
          colVal = 0;
        } else {
          rowVal = 0;
          colVal = j + 1;
        }
        newBar.style.setProperty(
          "width",
          `${
            window[
              `new${cards[rowVal][colVal].innerHTML.replace(" ", "")}Array`
            ][k] *
            ((cards[i + 1][j + 1].clientWidth - 12.8) / arraySize)
          }px`
        );
        cards[i + 1][j + 1].appendChild(newBar);
      }
    }
  }
}

function createNewArraysAndConstructTable() {
  arraySize = document.getElementById("size-input").value * 4;
  newRandomArray = barWidths.random(arraySize);
  newNearlySortedArray = barWidths.nearlySorted(arraySize);
  newReversedArray = barWidths.reversed(arraySize);
  newFewUniqueArray = barWidths.fewUnique(arraySize);
  constructTable();
}

function changeInitialCondition(condition, ic) {
  if (initialCondition.has(condition)) {
    if (initialCondition.size == 1) {
      alert("Choose atleast one inital condition!");
      return;
    }
    initialCondition.delete(condition);
    document.getElementById(ic).innerHTML = document
      .getElementById(ic)
      .innerHTML.slice(0, -1);
  } else {
    initialCondition.add(condition);
    document.getElementById(ic).innerHTML += "&#x2713";
  }
  if (initialCondition.size == 1) {
    document.querySelector("#initial-condition .box-content").textContent =
      initialCondition.values().next().value;
  } else {
    document.querySelector("#initial-condition .box-content").textContent =
      "Multiple";
  }
  constructTable();
}

function changeAlgorithm(algo, a) {
  if (algorithm.has(algo)) {
    if (algorithm.size == 1) {
      alert("Choose atleast one algorithm!");
      return;
    }
    algorithm.delete(algo);
    document.getElementById(a).innerHTML = document
      .getElementById(a)
      .innerHTML.slice(0, -1);
  } else {
    algorithm.add(algo);
    document.getElementById(a).innerHTML += "&#x2713";
  }
  if (algorithm.size == 1) {
    document.querySelector("#algorithm .box-content").textContent = algorithm
      .values()
      .next().value;
  } else {
    document.querySelector("#algorithm .box-content").textContent = "Multiple";
  }
  constructTable();
}

function changeSpeed() {
  currSpeed = Number(document.getElementById("speed-input").value);
}

function playPause() {
  const playPauseButton = document.querySelector(".play-pause");
  playPauseButton.classList.toggle("fa-play");
  playPauseButton.classList.toggle("fa-pause");
  isPlaying = isPlaying ? false : true;
  if (!isPlaying) {
    return;
  }
  if (!started) {
    for (let i = 0; i < heightItems.size; i++) {
      for (let j = 0; j < widthItems.size; j++) {
        if (horizontal == "algorithm") {
          sortingAlgos[`${cards[0][j + 1].innerHTML.toLowerCase()}`](
            [...cards[i + 1][j + 1].children],
            tableNumber
          );
        } else {
          sortingAlgos[`${cards[i + 1][0].innerHTML.toLowerCase()}`](
            [...cards[i + 1][j + 1].children],
            tableNumber
          );
        }
      }
    }
  }
  started = true;
}

function sleep() {
  return new Promise((resolve) => {
    const ms = 2000 / (currSpeed * arraySize);
    setTimeout(resolve, ms);
  });
}

function playCheck() {
  return new Promise((resolve) => {
    let newInterval = setInterval(() => {
      if (isPlaying) {
        clearInterval(newInterval);
        resolve();
      }
    }, 0);
  });
}

function finishedCheck(currCard) {
  finishedTotal++;
  const newOverlay = document.createElement("div");
  newOverlay.classList.add("overlay");
  newOverlay.innerHTML = finishedTotal;
  currCard.appendChild(newOverlay);
  if (finishedTotal == widthItems.size * heightItems.size) {
    const playPauseButton = document.querySelector(".play-pause");
    playPauseButton.classList.remove("fa-play", "fa-pause");
    playPauseButton.classList.add("fa-redo");
    playPauseButton.onclick = constructTable;
  }
}
