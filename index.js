const back = document.querySelector('#back');
const next = document.querySelector('#next');
const slideImage = document.querySelector('#slide');

const reviewBack = document.querySelector('#review-back');
const reviewNext = document.querySelector('#review-next');
const reviewSlide = document.querySelector('.review-slide');

const photos = 
["certificates/certificat_1.jpeg", 
"certificates/certificat_2.jpeg",
"certificates/certificat_3.png",
"certificates/certificat_4.jpg",
"certificates/certificat_5.jpg",
"certificates/certificat_6.jpg"
];

const reviews = [
    "photos/review_1.JPG",
    "photos/review_2.JPG",
    "photos/review_3.JPG",
    "photos/review_4.JPG",
    "photos/review_5.jpeg"
]

let i = 0;
if (next && back && slideImage) {
next.addEventListener('click', () => {
i++;
if(i > photos.length - 1){
i = 0;
}
slideImage.src = photos[i];
});
back.addEventListener('click', () => {
i--;
if(i < 0){
i = photos.length - 1;
}
slideImage.src = photos[i];
});
}

let j = 0;
if (reviewNext && reviewBack && reviewSlide) {
reviewNext.addEventListener('click', () => {
j++;
if(j > reviews.length - 1){
j = 0;
}
reviewSlide.src = reviews[j];
});
reviewBack.addEventListener('click', () => {
j--;
if(j < 0){
j = reviews.length - 1;
}
reviewSlide.src = reviews[j];
});
}

const homeSection = document.querySelector('#container-home');
const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;

const revealSectionsSelector = isMobileViewport
? 'section[id^="container-"]:not(#container-home):not(#container-services)'
: 'section[id^="container-"]:not(#container-home)';

const revealSections = document.querySelectorAll(revealSectionsSelector);
const homeContent = document.querySelector('.home-content');

const revealItems = [
{ selector: '.services-container .service-style', step: 55, cap: 320 },
{ selector: '.price-grid .price-card, .price-grid .menu-btn', step: 85, cap: 520 },
{ selector: '.reviewa-container .review-item', step: 120, cap: 700 }
];

const revealTextItems = [
{ selector: '#container-about .title-aboutMe, #container-about .about-header, #container-about .about-par', step: 70, cap: 700 },
{ selector: '#container-why-me .title-aboutMe, #container-why-me .benefit-item, #container-why-me .why-me-btn', step: 90, cap: 720 },
{ selector: '#container-contacts .contacts-item h5, #container-contacts .contacts-item h6, #container-contacts .contacts-item p, #container-contacts .contacts-item .social-media .contact-me', step: 55, cap: 520 }
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
revealItems.forEach(({ selector, step, cap }) => {
const items = document.querySelectorAll(selector);
items.forEach((item, index) => {
item.classList.add('reveal-item');
item.style.setProperty('--reveal-delay', `${Math.min(index * step, cap)}ms`);
if (selector.includes('.review-item')) {
item.classList.add('reveal-item-smooth');
}
});
});
revealTextItems.forEach(({ selector, step, cap }) => {
const items = document.querySelectorAll(selector);
items.forEach((item, index) => {
item.classList.add('reveal-item', 'reveal-item-text');
item.style.setProperty('--reveal-delay', `${Math.min(index * step, cap)}ms`);
});
});
if (prefersReducedMotion) {
if (homeSection) {
homeSection.classList.add('is-visible');
}
if (homeContent) {
homeContent.classList.add('is-visible');
}
revealSections.forEach((section) => {
section.classList.add('is-visible');
});
document.querySelectorAll('.reveal-item').forEach((item) => {
item.classList.add('is-visible');
});
} else {
if (homeSection || homeContent) {
requestAnimationFrame(() => {
if (homeSection) void homeSection.offsetHeight;
if (homeContent) void homeContent.offsetHeight;
setTimeout(() => {
if (homeSection) homeSection.classList.add('is-visible');
if (homeContent) homeContent.classList.add('is-visible');
}, 60);
});
}
const sectionObserver = new IntersectionObserver((entries, observer) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) {
return;
}
entry.target.classList.add('is-visible');
observer.unobserve(entry.target);
});
}, {
threshold: 0.08,
rootMargin: '0px 0px 8% 0px'
});
revealSections.forEach((section) => {
section.classList.add('section-reveal');
sectionObserver.observe(section);
});
const itemObserver = new IntersectionObserver((entries, observer) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) {
return;
}
entry.target.classList.add('is-visible');
observer.unobserve(entry.target);
});
}, {
threshold: 0.2,
rootMargin: '0px 0px -8% 0px'
});
document.querySelectorAll('.reveal-item').forEach((item) => {
itemObserver.observe(item);
});
}