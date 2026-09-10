const topGallery = document.querySelector(".top-gallery");
const bottomGallery = document.querySelector(".bottom-gallery");
const entertainmentSection = document.querySelector(".entertainment-section");

topGallery.innerHTML += topGallery.innerHTML;
bottomGallery.innerHTML += bottomGallery.innerHTML;

let topPosition = 0;
let bottomPosition = 0;
let isVisible = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
    });
});

observer.observe(entertainmentSection);

function animateGalleries() {

    if (isVisible) {

        topPosition -= 0.5;
        bottomPosition += 0.5;

        const topHalf = topGallery.scrollWidth / 2;
        const bottomHalf = bottomGallery.scrollWidth / 2;

        if (Math.abs(topPosition) >= topHalf) {
            topPosition = 0;
        }

        if (bottomPosition >= 0) {
            bottomPosition = -bottomHalf;
        }

        topGallery.style.transform =
            `translateX(${topPosition}px)`;

        bottomGallery.style.transform =
            `translateX(${bottomPosition}px)`;
    }

    requestAnimationFrame(animateGalleries);
}

bottomPosition = -(bottomGallery.scrollWidth / 2);

animateGalleries();