const mapElem = document.getElementById("map");
const breweryDescriptionElem = document.querySelector(".brewery__description");

window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".brewery__button--refresh")
    ?.addEventListener("click", loadBrewery);

  loadBrewery();
});

async function loadBrewery() {
  setContentAnimation(false);
  displaySkeletonLoader();

  try {
    const brewery = await getRandomBreweryApi();
    displayBrewery(brewery);
    initMap(brewery);
  } catch (error) {
    displayLoadError();
  }

  setContentAnimation(true);
}

function setContentAnimation(isVisible) {
  mapElem.classList.toggle("animate-slide-in-left", isVisible);
  breweryDescriptionElem.classList.toggle(
    "animate-slide-in-right",
    isVisible,
  );
}

function formatAddress(brewery) {
  return [
    brewery.street,
    brewery.address_2,
    brewery.address_3,
    brewery.city,
    brewery.state,
  ]
    .filter(Boolean)
    .join(", ");
}

function detailRow(iconClass, content) {
  return `<div class="row align-items-center brewery__row">
    <i class="fa-solid ${iconClass} text-dark" aria-hidden="true"></i>
    <p class="brewery__para text-dark">${content}</p>
  </div>`;
}

function displayBrewery(brewery) {
  const typeHtml = brewery.brewery_type
    ? `<p class="brewery__para text-dark">Type: ${brewery.brewery_type}</p>`
    : "";
  const addressHtml = detailRow("fa-location-dot", formatAddress(brewery));
  const phoneHtml = brewery.phone
    ? detailRow("fa-phone", brewery.phone)
    : "";
  const websiteHtml = brewery.website_url
    ? detailRow(
        "fa-earth-americas",
        `<a class="dark-outline-on-focus" href="${brewery.website_url}" target="_blank" rel="noopener noreferrer">${brewery.website_url}</a>`,
      )
    : "";

  breweryDescriptionElem.innerHTML = `<div>
    <h2 class="text-dark">${brewery.name}</h2>
    ${typeHtml}
    ${addressHtml}
    ${phoneHtml}
    ${websiteHtml}
  </div>`;
}

function displayLoadError() {
  breweryDescriptionElem.innerHTML = `<p class="brewery__message--error">Failed to load brewery. Please try again.</p>`;
  mapElem.innerHTML = `
    <span class="fa-stack fa-lg brewery__map--error">
      <i class="fas fa-map fa-stack-1x" aria-hidden="true"></i>
      <i class="fas fa-ban fa-stack-2x" style="color: Tomato;" aria-hidden="true"></i>
    </span>
  `;
}

function displaySkeletonLoader() {
  breweryDescriptionElem.innerHTML = `
    <div>
        <div class="skeleton skeleton-title" aria-hidden="true"></div>
        <div class="skeleton skeleton-text" aria-hidden="true"></div>
        <div class="skeleton skeleton-text" aria-hidden="true"></div>
        <div class="skeleton skeleton-text" aria-hidden="true"></div>
        <div class="skeleton skeleton-text" aria-hidden="true"></div>
    </div>
  `;

  mapElem.innerHTML = `<div class="skeleton skeleton-map"></div>`;
}
