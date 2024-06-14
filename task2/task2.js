const but = document.querySelector(".but");
const icon1 = document.querySelector(".icon-1");
const icon2 = document.querySelector(".icon-2");

but.addEventListener('click', () => {
    icon1.classList.toggle('higgen');
    icon2.classList.toggle('higgen');
});