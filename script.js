const initialCondition = new Set();
initialCondition.add("Random");
document.getElementById("ic-1").innerHTML += "&#x2713";
const algorithm = new Set();
algorithm.add("Bubble Sort");
document.getElementById("a-1").innerHTML += "&#x2713";
let currSize = 25;
let currSpeed = 3;
let cards = [];
let isPlaying = false;

const barWidths = {
  random: function (n) {
    const randomArray = [];
    let sorted = true;
    while (randomArray.length < n) {
      const r = Math.floor(Math.random() * n) + 1;
      if (randomArray.indexOf(r) === -1) randomArray.push(r);
    }
    for (let i = 0; i < n - 1; i++) {
      if (randomArray[i] > randomArray[i + 1]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      return this.random(n);
    }
    return randomArray;
  },
  nearlySorted: function (n) {
    const nearlySortedArray = [];
    let sorted = true;
    while (nearlySortedArray.length < n) {
      for (let i = 0; i < n; i += 2) {
        const tempArray = [];
        while (tempArray.length < 2) {
          const r = Math.floor(Math.random() * 2) + 1;
          if (tempArray.indexOf(r) === -1) tempArray.push(r);
        }
        nearlySortedArray.push(i + tempArray[0]);
        nearlySortedArray.push(i + tempArray[1]);
      }
    }
    for (let i = 0; i < n - 1; i++) {
      if (nearlySortedArray[i] > nearlySortedArray[i + 1]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      return this.nearlySorted(n);
    }
    return nearlySortedArray;
  },
  reversed: function (n) {
    const reversedArray = [];
    for (let i = n; i > 0; i--) {
      reversedArray.push(i);
    }
    return reversedArray;
  },
  fewUnique: function (n) {
    const fewUniqueArray = [];
    let unique = false;
    let sorted = true;
    while (fewUniqueArray.length < n) {
      const r = Math.floor(Math.random() * 4) + 1;
      fewUniqueArray.push((r * n) / 4);
    }
    for (let i = 0; i < n - 1; i++) {
      if (fewUniqueArray[i] !== fewUniqueArray[i + 1]) {
        unique = true;
        break;
      }
    }
    for (let i = 0; i < n - 1; i++) {
      if (fewUniqueArray[i] > fewUniqueArray[i + 1]) {
        sorted = false;
        break;
      }
    }
    if (unique || !sorted) {
      return fewUniqueArray;
    }
    return this.fewUnique(n);
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const sortingAlgos = {
  bubble: async function (arr) {
    let sorted = false;
    let currLen = arr.length - 1;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < currLen; i++) {
        if (!isPlaying) {
          return;
        }
        await sleep(100);
        if (
          Number(arr[i + 1].style.width.slice(0, -2)) <
          Number(arr[i].style.width.slice(0, -2))
        ) {
          sorted = false;
          let temp = arr[i].style.width;
          arr[i].style.width = arr[i + 1].style.width;
          arr[i + 1].style.width = temp;
        }
      }
      currLen--;
    }
  },
  selection: function (arr) {},
  insertion: function (arr) {},
  merge: function (arr) {},
  quick: function (arr) {},
  heap: function (arr) {},
};

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

function changeSize() {
  const currSize = document.getElementById("size-input").value * 4;
  constructTable();
}

function changeSpeed() {
  const currSpeed = Number(document.getElementById("speed-input").value);
}

function constructTable() {
  //Width and Height Items Decision

  widthItems = algorithm;
  heightItems = initialCondition;
  horizontal = "algorithm";
  if (document.body.clientWidth < 878) {
    widthItems = initialCondition;
    heightItems = algorithm;
    horizontal = "initialCondition";
  }

  //Create Table Layout

  const table = document.querySelector("main");
  cards = [];
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
      table.appendChild(newCard);
      temp.push(newCard);
    }
    cards.push(temp);
  }

  //Create Controller

  isPlaying = false;
  cards[0][0].classList.add("controller");
  const newRandomiser = document.createElement("i");
  newRandomiser.classList.add("fas", "fa-redo", "randomise");
  newRandomiser.onclick = randomise;
  cards[0][0].appendChild(newRandomiser);
  const newPlayPauser = document.createElement("i");
  newPlayPauser.classList.add("fas", "fa-play", "play-pause");
  newPlayPauser.onclick = playPause;
  cards[0][0].appendChild(newPlayPauser);

  //Set Horizontal Headings

  for (let i = 0; i < widthItems.size; i++) {
    if (horizontal == "algorithm") {
      cards[0][i + 1].innerHTML = [...widthItems][i].replace(" Sort", "");
    } else {
      cards[0][i + 1].innerHTML = [...widthItems][i];
    }
  }

  //Set Vertical Headings

  for (let i = 0; i < heightItems.size; i++) {
    if (horizontal == "initialCondition") {
      cards[i + 1][0].innerHTML = [...heightItems][i].replace(" Sort", "");
    } else {
      cards[i + 1][0].innerHTML = [...heightItems][i];
    }
  }

  //Create Array

  const arraySize = document.getElementById("size-input").value * 4;
  const barHeight = cards[0][0].clientHeight / (2 * arraySize);
  newRandomArray = barWidths.random(arraySize);
  newNearlySortedArray = barWidths.nearlySorted(arraySize);
  newReversedArray = barWidths.reversed(arraySize);
  newFewUniqueArray = barWidths.fewUnique(arraySize);
  for (let i = 0; i < heightItems.size; i++) {
    for (let j = 0; j < widthItems.size; j++) {
      cards[i + 1][j + 1].style.setProperty("align-items", "flex-start");
      for (let k = 0; k < arraySize; k++) {
        const newBar = document.createElement("div");
        newBar.classList.add("bar");
        newBar.style.setProperty("height", `${barHeight}px`);
        newBar.style.setProperty("margin-bottom", `${barHeight}px`);
        if (k == arraySize - 1) {
          newBar.style.setProperty("margin-bottom", "0px");
        }
        if (horizontal == "algorithm") {
          newBar.style.setProperty(
            "width",
            `${
              window[`new${cards[i + 1][0].innerHTML.replace(" ", "")}Array`][
                k
              ] *
              ((cards[i + 1][j + 1].clientWidth - 12.8) / arraySize)
            }px`
          );
        } else {
          newBar.style.setProperty(
            "width",
            `${
              window[`new${cards[0][j + 1].innerHTML.replace(" ", "")}Array`][
                k
              ] *
              ((cards[i + 1][j + 1].clientWidth - 12.8) / arraySize)
            }px`
          );
        }
        cards[i + 1][j + 1].appendChild(newBar);
      }
    }
  }
}

constructTable();

window.onresize = function () {
  constructTable();
};

function playPause() {
  const playPauseButton = document.querySelector(".play-pause");
  playPauseButton.classList.toggle("fa-play");
  playPauseButton.classList.toggle("fa-pause");
  isPlaying = isPlaying ? false : true;
  if (!isPlaying) {
    return;
  }
  for (let i = 0; i < heightItems.size; i++) {
    for (let j = 0; j < widthItems.size; j++) {
      if (horizontal == "algorithm") {
        sortingAlgos[`${cards[0][j + 1].innerHTML.toLowerCase()}`](
          cards[i + 1][j + 1].children
        );
      } else {
        sortingAlgos[`${cards[i + 1][0].innerHTML.toLowerCase()}`](
          cards[i + 1][j + 1].children
        );
      }
    }
  }
}

function randomise() {
  constructTable();
}
