const initialCondition = new Set();
initialCondition.add("Random");
document.getElementById("ic-1").innerHTML += "&#x2713";
const algorithm = new Set();
algorithm.add("Bubble Sort");
document.getElementById("a-1").innerHTML += "&#x2713";
const style = getComputedStyle(document.body);
const sortedColor = style.getPropertyValue("--sorted-color");
const comparingColor = style.getPropertyValue("--comparing-color");
const lightColor = style.getPropertyValue("--light-color");
const processingColor = style.getPropertyValue("--processing-color");
let currSize = 20;
let currSpeed = 3;
let cards = [];
let isPlaying = false;
let started = false;

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
      for (let i = 0; i < n; i += 4) {
        const tempArray = [];
        while (tempArray.length < 4) {
          const r = Math.floor(Math.random() * 4) + 1;
          if (tempArray.indexOf(r) === -1) tempArray.push(r);
        }
        for (let j = 0; j < 4; j++) {
          nearlySortedArray.push(i + tempArray[j]);
        }
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

const sortingAlgos = {
  bubble: async function (arr) {
    let sorted = false;
    let currLen = arr.length - 1;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < currLen; i++) {
        arr[i].style.setProperty("background", comparingColor);
        arr[i + 1].style.setProperty("background", comparingColor);
        await playCheck();
        await sleep((50 * 40) / (currSpeed * arr.length));
        if (
          Number(arr[i + 1].style.width.slice(0, -2)) <
          Number(arr[i].style.width.slice(0, -2))
        ) {
          sorted = false;
          let temp = arr[i].style.width;
          arr[i].style.width = arr[i + 1].style.width;
          arr[i + 1].style.width = temp;
        }
        arr[i].style.setProperty("background", lightColor);
      }
      arr[currLen].style.setProperty("background", sortedColor);
      currLen--;
    }
    for (let i = 0; i <= currLen; i++) {
      arr[i].style.setProperty("background", sortedColor);
    }
  },
  selection: async function (arr) {
    let currLen = arr.length;
    while (currLen > 1) {
      let maxEleInd = 0;
      for (let i = 1; i < currLen; i++) {
        arr[maxEleInd].style.setProperty("background", comparingColor);
        arr[i].style.setProperty("background", comparingColor);
        await playCheck();
        await sleep((50 * 40) / (currSpeed * arr.length));
        if (
          Number(arr[i].style.width.slice(0, -2)) >
          Number(arr[maxEleInd].style.width.slice(0, -2))
        ) {
          arr[maxEleInd].style.setProperty("background", lightColor);
          maxEleInd = i;
        }
        arr[i].style.setProperty("background", lightColor);
        arr[maxEleInd].style.setProperty("background", comparingColor);
      }
      let temp = arr[currLen - 1].style.width;
      arr[currLen - 1].style.width = arr[maxEleInd].style.width;
      arr[maxEleInd].style.width = temp;
      arr[maxEleInd].style.setProperty("background", lightColor);
      arr[currLen - 1].style.setProperty("background", sortedColor);
      currLen--;
    }
    arr[0].style.setProperty("background", sortedColor);
  },
  insertion: async function (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = i;
      while (
        j < arr.length &&
        Number(arr[j - 1].style.width.slice(0, -2)) >
          Number(arr[j].style.width.slice(0, -2))
      ) {
        arr[j - 1].style.setProperty("background", comparingColor);
        arr[j].style.setProperty("background", comparingColor);
        await playCheck();
        await sleep((50 * 40) / (currSpeed * arr.length));
        let temp = arr[j - 1].style.width;
        arr[j - 1].style.width = arr[j].style.width;
        arr[j].style.width = temp;
        arr[j - 1].style.setProperty("background", sortedColor);
        arr[j].style.setProperty("background", sortedColor);
        j++;
      }
      arr[i].style.setProperty("background", sortedColor);
    }
    arr[0].style.setProperty("background", sortedColor);
  },
  merge: async function (arr) {
    if (arr.length == 1) {
      return;
    }
    let mid = Math.trunc(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    await this.merge(left);
    await this.merge(right);
    await this.mergeSortedArrays(left, right, arr);
  },
  mergeSortedArrays: async function (a, b, arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.setProperty("background", processingColor);
    }
    let i = 0,
      j = 0,
      k = 0;
    const arraySize = document.getElementById("size-input").value * 4;
    while (i < a.length && j < b.length) {
      a[i].style.setProperty("background", comparingColor);
      b[j].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep((50 * 40) / (currSpeed * arraySize));
      b[j].style.setProperty("background", processingColor);
      arr[k].style.setProperty("background", sortedColor);
      if (
        Number(a[i].style.width.slice(0, -2)) <=
        Number(b[j].style.width.slice(0, -2))
      ) {
        i++;
        k++;
      } else {
        let temp = arr[k].style.width;
        arr[k].style.width = b[j].style.width;
        for (let h = k + 1; h < k + 1 + a.length - i; h++) {
          const temp2 = arr[h].style.width;
          arr[h].style.width = temp;
          temp = temp2;
        }
        temp = a[i];
        for (let h = i; h < a.length; h++) {
          a[h] = arr[k + 1 + h - i];
        }
        b[j] = temp;
        j++;
        k++;
      }
    }
    while (i < a.length) {
      a[i].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep((50 * 40) / (currSpeed * arraySize));
      a[i].style.setProperty("background", sortedColor);
      const temp = arr[k].style.width;
      arr[k].style.width = a[i].style.width;
      a[i].style.width = temp;
      i++;
      k++;
    }
    while (j < b.length) {
      b[j].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep((50 * 40) / (currSpeed * arraySize));
      b[j].style.setProperty("background", sortedColor);
      const temp = arr[k].style.width;
      arr[k].style.width = b[j].style.width;
      b[j].style.width = temp;
      j++;
      k++;
    }
    if (arraySize !== arr.length) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.setProperty("background", lightColor);
      }
    }
  },
  quick: async function (arr) {
    if (arr.length == 1) {
      arr[0].style.setProperty("background", sortedColor);
    }
    if (arr.length <= 1) {
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.setProperty("background", processingColor);
    }
    const arraySize = document.getElementById("size-input").value * 4;
    let pivotIndex = arr.length - 1;
    let leftIndex = 0;
    while (leftIndex < pivotIndex) {
      arr[leftIndex].style.setProperty("background", comparingColor);
      arr[pivotIndex].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep((50 * 40) / (currSpeed * arraySize));
      if (
        Number(arr[leftIndex].style.width.slice(0, -2)) >
        Number(arr[pivotIndex].style.width.slice(0, -2))
      ) {
        const temp = arr[leftIndex].style.width;
        arr[leftIndex].style.width = arr[pivotIndex - 1].style.width;
        arr[pivotIndex - 1].style.width = arr[pivotIndex].style.width;
        arr[pivotIndex].style.width = temp;
        arr[leftIndex].style.setProperty("background", processingColor);
        arr[pivotIndex].style.setProperty("background", processingColor);
        pivotIndex--;
        leftIndex--;
      } else {
        arr[leftIndex].style.setProperty("background", processingColor);
      }
      leftIndex++;
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.setProperty("background", lightColor);
    }
    arr[pivotIndex].style.setProperty("background", sortedColor);
    await this.quick(arr.slice(0, pivotIndex));
    await this.quick(arr.slice(pivotIndex + 1));
  },
  heap: async function (arr) {
    const arraySize = document.getElementById("size-input").value * 4;
    for (let i = 0; i < arraySize; i++) {
      arr[i].style.setProperty("background", processingColor);
    }
    for (let i = Math.trunc(arr.length / 2) - 1; i > -1; i--) {
      await playCheck();
      await sleep((50 * 40) / (currSpeed * arraySize));
      await this.heapify(arr, i, arr.length);
    }
    for (let i = arr.length - 1; i > 0; i--) {
      arr[0].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep((50 * 40) / (currSpeed * arraySize));
      arr[i].style.setProperty("background", sortedColor);
      arr[0].style.setProperty("background", processingColor);
      const temp = arr[0].style.width;
      arr[0].style.width = arr[i].style.width;
      arr[i].style.width = temp;
      await this.heapify(arr, 0, i);
    }
    arr[0].style.setProperty("background", sortedColor);
  },
  heapify: async function (arr, curr, size) {
    const arraySize = document.getElementById("size-input").value * 4;
    let largest = curr;
    let left = 2 * curr + 1;
    let right = left + 1;
    if (
      left < size &&
      Number(arr[left].style.width.slice(0, -2)) >
        Number(arr[largest].style.width.slice(0, -2))
    ) {
      largest = left;
    }
    if (
      right < size &&
      Number(arr[right].style.width.slice(0, -2)) >
        Number(arr[largest].style.width.slice(0, -2))
    ) {
      largest = right;
    }
    if (largest != curr) {
      const temp = arr[largest].style.width;
      arr[largest].style.width = arr[curr].style.width;
      arr[curr].style.width = temp;
      await playCheck();
      await sleep((50 * 40) / (currSpeed * arraySize));
      await this.heapify(arr, largest, size);
    }
  },
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

function changeSpeed() {
  currSpeed = Number(document.getElementById("speed-input").value);
}

function constructTable() {
  // Set started as false
  started = false;

  //Width and Height Items Decision

  widthItems = algorithm;
  heightItems = initialCondition;
  horizontal = "algorithm";
  bodyWidth = document.body.clientWidth;
  if (bodyWidth < 878) {
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
      if (horizontal == "algorithm") {
        newCard.style.setProperty("width", "6rem");
        newCard.style.setProperty("height", "6rem");
      } else {
        const cardWidth = (bodyWidth - 20) / 5;
        newCard.style.setProperty("font-size", `${(bodyWidth * 2) / 878}rem`);
        newCard.style.setProperty("width", `${cardWidth}px`);
        newCard.style.setProperty("height", `${cardWidth}px`);
      }
      table.appendChild(newCard);
      temp.push(newCard);
    }
    cards.push(temp);
  }

  //Create Controller

  isPlaying = false;
  cards[0][0].classList.add("controller");
  const newRandomiser = document.createElement("i");
  newRandomiser.classList.add("fas", "fa-random", "randomise");
  newRandomiser.onclick = createNewArraysAndConstructTable;
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
  const arraySize = document.getElementById("size-input").value * 4;
  newRandomArray = barWidths.random(arraySize);
  newNearlySortedArray = barWidths.nearlySorted(arraySize);
  newReversedArray = barWidths.reversed(arraySize);
  newFewUniqueArray = barWidths.fewUnique(arraySize);
  constructTable();
}

window.onload = function () {
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
          sortingAlgos[`${cards[0][j + 1].innerHTML.toLowerCase()}`]([
            ...cards[i + 1][j + 1].children,
          ]);
        } else {
          sortingAlgos[`${cards[i + 1][0].innerHTML.toLowerCase()}`]([
            ...cards[i + 1][j + 1].children,
          ]);
        }
      }
    }
  }
  started = true;
}
