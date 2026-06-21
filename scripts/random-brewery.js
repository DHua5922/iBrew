let brewery = {};
const mapElem = document.getElementById("map");
const breweryDescriptionElem = document.querySelector(".brewery__description");

async function loadBrewery() {
  mapElem.classList.remove("animate-slide-in-left");
  breweryDescriptionElem.classList.remove("animate-slide-in-right");
  displaySkeletonLoader();

  try {
    brewery = await getRandomBreweryApi();

    const breweryTypeHtml = `<p class="brewery__para text-dark">Type: ${brewery.brewery_type}</p>`;

    const address = [
      brewery.street,
      brewery.address_2,
      brewery.address_3,
      brewery.city,
      brewery.state,
    ]
      .filter(Boolean)
      .join(", ");
    const addressHtml = `
    <div class="row align-items-center brewery__row">
      <i class="fa-solid fa-location-dot text-dark" aria-hidden="true"></i>
      <p class="brewery__para text-dark">
        ${address}
      </p>
    </div>
  `;

    const phoneHtml = `
    <div class="row align-items-center brewery__row">
      <i class="fa-solid fa-phone text-dark" aria-hidden="true"></i>
      <p class="brewery__para text-dark">
        ${brewery.phone}
      </p>
    </div>
  `;

    const websiteHtml = `
    <div class="row align-items-center brewery__row">
      <i class="fa-solid fa-earth-americas text-dark" aria-hidden="true"></i>
      <p class="brewery__para text-dark">
        <a class="dark-outline-on-focus" href="${brewery.website_url}" target="_blank" rel="noopener noreferrer">${brewery.website_url}</a>
      </p>
    </div>
  `;

    breweryDescriptionElem.innerHTML = `  
      <div>
        <h2 class="text-dark">${brewery.name}</h2>
        ${brewery.brewery_type ? breweryTypeHtml : ""}
        ${addressHtml}
        ${brewery.phone ? phoneHtml : ""}
        ${brewery.website_url ? websiteHtml : ""}
      </div>
    `;

    initMap(brewery);
  } catch (error) {
    breweryDescriptionElem.innerHTML = `<p class="brewery__message--error">Failed to load brewery. Please try again.</p>`;
    mapElem.innerHTML = `
      <span class="fa-stack fa-lg brewery__map--error">
        <i class="fas fa-map fa-stack-1x" aria-hidden="true"></i>
        <i class="fas fa-ban fa-stack-2x" style="color: Tomato;" aria-hidden="true"></i>
      </span>
    `;
  }

  mapElem.classList.add("animate-slide-in-left");
  breweryDescriptionElem.classList.add("animate-slide-in-right");
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

window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".brewery__button--refresh")
    ?.addEventListener("click", loadBrewery);

  loadBrewery();
});
