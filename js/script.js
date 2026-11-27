/* =====================================
   THE QUILLORA
   3D BOOK CAROUSEL
===================================== */

const books = [
    {
        title: "UnFading Love",
        description: "Some stories are written in ink. Others are written in the heart.",
        link: "https://malyshkarose.github.io/malyshka-stories/"
    },
    {
        title: "Tainted Temptations",
        description: "A tale of desire, secrets and dangerous attractions.",
        link: "#"
    },
    {
        title: "Coming Soon",
        description: "Another world is waiting to be discovered.",
        link: "#"
    }
];

const cards = document.querySelectorAll(".book-card");

const title = document.getElementById("book-title");
const description = document.getElementById("book-description");
const readButton = document.getElementById("read-button");

let activeIndex = 0;
let rotationTimer;


/* POSITION THE BOOKS */

function updateCarousel() {

    cards.forEach((card, index) => {

        const total = cards.length;

        let position = (index - activeIndex + total) % total;

        if (position > total / 2) {
            position -= total;
        }

        const x = position * 230;
        const z = position === 0 ? 100 : -100;
        const rotate = position * -12;
        const scale = position === 0 ? 1.15 : 0.78;
        const opacity = position === 0 ? 1 : 0.65;

        card.style.transform = `
            translateX(${x}px)
            translateZ(${z}px)
            rotateY(${rotate}deg)
            scale(${scale})
        `;

        card.style.opacity = opacity;

        card.style.zIndex = 10 - Math.abs(position);
       
       card.classList.toggle("is-active", position === 0);

    });

    updateBookInformation();
}


/* UPDATE SELECTED BOOK */

function updateBookInformation() {

    const book = books[activeIndex];

    title.textContent = book.title;

    description.textContent = book.description;

    readButton.href = book.link;

}


/* SELECT A BOOK */

cards.forEach((card, index) => {

    card.addEventListener("click", () => {

        activeIndex = index;

        updateCarousel();

        restartRotation();

    });

});


/* AUTOMATIC ROTATION */

function startRotation() {

    rotationTimer = setInterval(() => {

        activeIndex = (activeIndex + 1) % cards.length;

        updateCarousel();

    }, 8000);

}


/* RESTART ROTATION */

function restartRotation() {

    clearInterval(rotationTimer);

    startRotation();

}


/* PAUSE WHEN HOVERING */

const carousel = document.querySelector(".carousel");

carousel.addEventListener("mouseenter", () => {

    clearInterval(rotationTimer);

});

carousel.addEventListener("mouseleave", () => {

    startRotation();

});

/* MANUAL NAVIGATION */

const previousButton = document.getElementById("prev-book");
const nextButton = document.getElementById("next-book");

previousButton.addEventListener("click", () => {

    activeIndex = (activeIndex - 1 + cards.length) % cards.length;

    updateCarousel();

    restartRotation();

});

nextButton.addEventListener("click", () => {

    activeIndex = (activeIndex + 1) % cards.length;

    updateCarousel();

    restartRotation();

});

/* INITIALISE */

updateCarousel();

startRotation();
/* MANUAL CAROUSEL NAVIGATION */

document.getElementById("prev-book").addEventListener("click", () => {

    activeIndex = (activeIndex - 1 + cards.length) % cards.length;

    updateCarousel();

    restartRotation();

});

document.getElementById("next-book").addEventListener("click", () => {

    activeIndex = (activeIndex + 1) % cards.length;

    updateCarousel();

    restartRotation();

});
