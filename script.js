// Project Carousel

const carousel = document.getElementById("project-carousel");
const projects = document.querySelectorAll(".projects");
const buttons = document.querySelectorAll(".arrow-button");

let current = 0;
let prev = 8;
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
    if (current < 8) {
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

    if (next === 9) {
        next = 0;
    }

    if (prev === -1) {
        prev = 8;
    }

    projects[current].classList.add("active");
    projects[prev].classList.add("prev");
    projects[next].classList.add("next");
}

buttons.forEach(button => button.addEventListener("click", slide))