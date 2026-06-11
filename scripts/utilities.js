const themeLocalStorageKey = "theme";
const themeDataAttribute = "data-theme";

function animateCounter(
  element,
  target,
  elemTextContentCallback,
  duration = 1000,
) {
  const start = 0;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);

    // Calculate the current value and update the text
    const currentValue = Math.floor(progress * (target - start) + start);
    element.textContent = elemTextContentCallback(
      currentValue.toLocaleString(),
    );

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute(themeDataAttribute);
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute(themeDataAttribute, newTheme);
  localStorage.setItem(themeLocalStorageKey, newTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(themeLocalStorageKey);
  if (savedTheme) {
    document.documentElement.setAttribute(themeDataAttribute, savedTheme);
  }
}

function onExpandNavMenu() {
  const navLinks = document.querySelector(".nav__links--expandable");
  navLinks.classList.toggle("expanded");
}

function collapseExpandedNavbarOnDesktop() {
  const navLinks = document.querySelector(".nav__links--expandable");

  if (!navLinks) return;

  if (window.innerWidth > 768) {
    navLinks.classList.remove("expanded");
  }
}

window.addEventListener("load", () => {
  loadTheme();
  collapseExpandedNavbarOnDesktop();
});
window.addEventListener("resize", collapseExpandedNavbarOnDesktop);
