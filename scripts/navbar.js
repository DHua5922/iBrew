window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".nav__menu-btn")
    ?.addEventListener("click", onExpandNavMenu);
});

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
