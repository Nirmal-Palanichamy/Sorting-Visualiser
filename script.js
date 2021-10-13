const initialCondition = new Set();
initialCondition.add("Random");
document.getElementById("ic-1").innerHTML += "&#x2713";
const algorithm = new Set();
algorithm.add("Bubble Sort");
document.getElementById("a-1").innerHTML += "&#x2713";
let currSize = 25;
let currSpeed = 3;
let widthItems = 2;
let heightItems = 2;

function changeInitialCondition(condition, ic) {
  if (initialCondition.has(condition)) {
    initialCondition.delete(condition);
    document.getElementById(ic).innerHTML = document
      .getElementById(ic)
      .innerHTML.slice(0, -1);
  } else {
    initialCondition.add(condition);
    document.getElementById(ic).innerHTML += "&#x2713";
  }
  if (initialCondition.size == 0) {
    document.querySelector("#initial-condition .box-content").textContent =
      "None";
  } else if (initialCondition.size == 1) {
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
    algorithm.delete(algo);
    document.getElementById(a).innerHTML = document
      .getElementById(a)
      .innerHTML.slice(0, -1);
  } else {
    algorithm.add(algo);
    document.getElementById(a).innerHTML += "&#x2713";
  }
  if (algorithm.size == 0) {
    document.querySelector("#algorithm .box-content").textContent = "None";
  } else if (algorithm.size == 1) {
    document.querySelector("#algorithm .box-content").textContent = algorithm
      .values()
      .next().value;
  } else {
    document.querySelector("#algorithm .box-content").textContent = "Multiple";
  }
  constructTable();
}

function changeSize() {
  currSize = document.getElementById("size-input").value * 5;
}

function changeSpeed() {
  currSpeed = Number(document.getElementById("speed-input").value);
}

function constructTable() {
  icLen = initialCondition.size;
  algoLen = algorithm.size;
  if (icLen > algoLen) {
    widthItems = icLen + 1;
    heightItems = algoLen + 1;
    maxi = "ic";
  } else {
    widthItems = algoLen + 1;
    heightItems = icLen + 1;
    maxi = "algo";
  }
  if (widthItems == 1 || heightItems == 1) {
    alert("Choose atleast one algorithm and one inital condition!");
    return;
  }
}

constructTable();
