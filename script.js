const initialCondition = new Set();
initialCondition.add("Random");
document.getElementById("ic-1").innerHTML += "&#x2713";
const algorithm = new Set();
algorithm.add("Bubble Sort");
document.getElementById("a-1").innerHTML += "&#x2713";
let currSize = 25;
let currSpeed = 3;

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
  const currSize = document.getElementById("size-input").value * 5;
}

function changeSpeed() {
  const currSpeed = Number(document.getElementById("speed-input").value);
}

function constructTable() {
  let widthItems = algorithm;
  let heightItems = initialCondition;
  let horizontal = "algorithm";
  if (document.body.clientWidth < 878) {
    widthItems = initialCondition;
    heightItems = algorithm;
    horizontal = "initialCondition";
  }
  const totalCards = (widthItems.size + 1) * (heightItems.size + 1);
  const table = document.querySelector("main");
  const cards = [];
  table.innerHTML = "";
  table.style.setProperty(
    "grid-template-columns",
    `repeat(${widthItems.size + 1},1fr)`
  );
  for (let i = 0; i < totalCards; i++) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    table.appendChild(newCard);
    cards.push(newCard);
  }
  cards[0].classList.add("controller");
  const newRandomiser = document.createElement("i");
  newRandomiser.classList.add("fas", "fa-redo", "randomise");
  newRandomiser.onclick = randomise;
  cards[0].appendChild(newRandomiser);
  const newPlayPauser = document.createElement("i");
  newPlayPauser.classList.add("fas", "fa-play", "play-pause");
  newPlayPauser.onclick = playPause;
  cards[0].appendChild(newPlayPauser);

  for (let i = 0; i < widthItems.size; i++) {
    if (horizontal == "algorithm") {
      cards[i + 1].innerHTML = [...widthItems][i].replace(" Sort", "");
    } else {
      cards[i + 1].innerHTML = [...widthItems][i];
    }
  }

  for (let i = 0; i < heightItems.size; i++) {
    if (horizontal == "initialCondition") {
      cards[(widthItems.size + 1) * (i + 1)].innerHTML = [...heightItems][
        i
      ].replace(" Sort", "");
    } else {
      cards[(widthItems.size + 1) * (i + 1)].innerHTML = [...heightItems][i];
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
}

function randomise() {
  console.log("bye");
}
