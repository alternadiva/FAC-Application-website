/*-----------------------HAMBURGER MENU------------------------*/

const hamburgerMenu = document.getElementById("hamburger-menu");
const menuItems = document.getElementById("hamb-menu-items");
const closeMenuButton = document.getElementById("close-menu");

function menuOnScroll() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    hamburgerMenu.removeAttribute('hidden', '');
  } else {
    hamburgerMenu.setAttribute('hidden','');
    menuItems.setAttribute('hidden', '');
  }
}

function openMenu() {
    menuItems.removeAttribute('hidden', '');
}

function closeMenu() {
    menuItems.setAttribute('hidden', '');
}

window.addEventListener("scroll", menuOnScroll);
hamburgerMenu.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);

/*-----------------------MEMORY GAME------------------------*/

const table = document.getElementById("table");
const cards = document.querySelectorAll(".cards");
const cardOrder = table.children;

const descriptions = document.querySelectorAll(".description");
let description;
const openAllDescription = document.getElementById("open-all-description");
const descriptionContainer = document.getElementById("description-container");
const closeButton = document.querySelectorAll(".close-button");

const startingWindow = document.getElementById("game-start");
const startButton = document.getElementById("game-start-button");

let fragment = document.createDocumentFragment(); //This method creates the document fragment, then append the elements of the document to the document fragment and make the changes according to the need. It is a safe method and thus prevents destroying of the DOM structure.

function shuffleCards() {
    while (cardOrder.length) {
        fragment.appendChild(cardOrder[Math.floor(Math.random() * cardOrder.length)]);
    }
    table.appendChild(fragment);
    return cardOrder;
}

window.addEventListener("load", shuffleCards);

let isItFlipped = false;

let flippedCardOne;
let flippedCardTwo;

let lockTable;

function flipCards() {
    if (lockTable === true) {
        return;
    }

    if (this === flippedCardOne) {
        return;
    }

    this.classList.add('flip');

    if (isItFlipped === false) {
        isItFlipped = true;
        flippedCardOne = this;
        return;
    }
    else {
        isItFlipped = false;
        flippedCardTwo = this; 
    }

    isItAMatch();
}

function isItAMatch() {
    firstData = flippedCardOne.dataset.id;
    secondData = flippedCardTwo.dataset.id;

    let match = firstData === secondData;

    if (match === true) {
        popUpDescription();
        disableCards();
    }
    else {
        unflipCards();
    }
}

function disableCards() {
    flippedCardOne.removeEventListener('click', flipCards);
    flippedCardTwo.removeEventListener('click', flipCards);
    resetTable();
}

function unflipCards() {
    lockTable = true;
    setTimeout(function () {
        flippedCardOne.classList.remove('flip');
        flippedCardTwo.classList.remove('flip');
        resetTable();
    }
    , 1200);
}

function resetTable() {
    flippedCardOne = null;
    flippedCardTwo = null;

    isItFlipped = false;
    lockTable = false;
}

cards.forEach(card => card.addEventListener('click', flipCards));

function popUpDescription() {
    for (let i = 0; i < descriptions.length; i++) {
        if (descriptions[i].dataset.id === firstData) {
            setTimeout(function () {
                descriptionContainer.removeAttribute('hidden', '');
                descriptions[i].removeAttribute('hidden', '');
                startingWindow.removeAttribute('hidden', '');
                startButton.style.visibility = "hidden";
            }, 1000);
            description = descriptions[i];
        }
    }
}

function closeDescription() {
    description.setAttribute('hidden','');
    startingWindow.setAttribute('hidden', '');
    descriptionContainer.setAttribute('hidden', '')
}

function startGame() {
    startingWindow.setAttribute('hidden', '');
}

function showAllDescription() {
    descriptions.forEach(x => x.removeAttribute('hidden',''));
    descriptionContainer.removeAttribute('hidden','');
    for (let i = 0; i < descriptions.length; i++) {
        descriptions[i].style.height = "auto";
    }
    startingWindow.removeAttribute('hidden', '');
    startButton.style.visibility = 'hidden';
    closeButton.forEach(x => x.setAttribute('hidden', ''));
}

closeButton.forEach(x => x.addEventListener('click', closeDescription));
startButton.addEventListener("click", startGame);
openAllDescription.addEventListener("click", showAllDescription);



/*--------------------PROJECT CAROUSEL----------------------*/

const carousel = document.getElementById("project-carousel");
const projects = document.querySelectorAll(".projects");
const buttons = document.querySelectorAll(".arrow-button");

let current = 0;
let prev = 7;
let next = 1;

function slide() {
    if (this.dataset.id === "right") {
        nextProject();
    }
    else if (this.dataset.id === "left") {
        previousProject();
    }
}

function previousProject() {
    if (current > 0) {
        changeOrder(current - 1);
    }
    else {
        changeOrder(projects.length - 1);
    }
}

function nextProject() {
    if (current < 7) {
        changeOrder(current + 1)
    }
    else {
        changeOrder(0);
    }
}

function changeOrder(place) {
    current = place;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove("active");
        projects[i].classList.remove("prev");
        projects[i].classList.remove("next");
    }

    if (next === 8) {
        next = 0;
    }

    if (prev === -1) {
        prev = 7;
    }

    projects[current].classList.add("active");
    projects[prev].classList.add("prev");
    projects[next].classList.add("next");
}

buttons.forEach(button => button.addEventListener("click", slide))