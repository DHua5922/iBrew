const themeLocalStorageKey = "theme";
const themeDataAttribute = "data-theme";
const themeToggleBtnElem = document.querySelectorAll(".nav__theme-toggle-btn");

window.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  collapseExpandedNavbarOnDesktop();

  themeToggleBtnElem.forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });

  document
    .querySelector(".nav__menu-btn")
    ?.addEventListener("click", onExpandNavMenu);
});
window.addEventListener("resize", collapseExpandedNavbarOnDesktop);

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
  updateThemeToggleState(newTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(themeLocalStorageKey);
  if (savedTheme) {
    document.documentElement.setAttribute(themeDataAttribute, savedTheme);
  }

  updateThemeToggleState(savedTheme);
}

function updateThemeToggleState(theme) {
  const isDarkTheme = theme === "dark";

  themeToggleBtnElem.forEach((button) => {
    button.setAttribute("aria-pressed", String(isDarkTheme));
    button.setAttribute(
      "aria-label",
      isDarkTheme ? "Switch to light mode" : "Switch to dark mode",
    );
  });
}

function onExpandNavMenu() {
  const navLinks = document.querySelector(".nav__links--expandable");
  const navMenuButton = document.querySelector(".nav__menu-btn");

  if (!navLinks) return;

  navLinks.classList.toggle("expanded");

  const isExpanded = navLinks.classList.contains("expanded");
  navMenuButton?.setAttribute("aria-expanded", String(isExpanded));
  navMenuButton?.setAttribute(
    "aria-label",
    isExpanded ? "Close navigation menu" : "Open navigation menu",
  );
}

function collapseExpandedNavbarOnDesktop() {
  const navLinks = document.querySelector(".nav__links--expandable");

  if (!navLinks) return;

  if (window.innerWidth > 768) {
    navLinks.classList.remove("expanded");
    const navMenuButton = document.querySelector(".nav__menu-btn");

    navMenuButton?.setAttribute("aria-expanded", "false");
    navMenuButton?.setAttribute("aria-label", "Open navigation menu");
  }
}
