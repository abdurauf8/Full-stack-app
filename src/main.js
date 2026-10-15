const themeBtn = document.querySelector(".theme");
const logo = document.querySelector("#logo");

let currentTheme = localStorage.getItem("theme") || null;
if (currentTheme === "dark") {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.classList.toggle("night");
    logo.setAttribute('src', 'src/assets/logo_nav.png');
}

themeBtn.addEventListener("click", () => {
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        currentTheme = 'light';
        themeBtn.classList.toggle('night');
        logo.setAttribute('src', 'src/assets/logo_nav_light.png');
    } else if (currentTheme === 'light' || !currentTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        currentTheme = 'dark';
        themeBtn.classList.toggle('night');
        logo.setAttribute('src', 'src/assets/logo_nav.png');
    }
});