let brewery = {};
const mapElem = document.getElementById("map");
const breweryDescriptionElem = document.querySelector(".brewery__description");

async function loadBrewery() {
  mapElem.classList.remove("animate-slide-in-left");
  breweryDescriptionElem.classList.remove("animate-slide-in-right");
  displaySkeletonLoader();

  try {
    brewery = await getRandomBreweryApi();

    const breweryTypeHtml = `<p class="brewery__para text-secondary">Type: ${brewery.brewery_type}</p>`;

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
      <i class="fa-solid fa-location-dot text-secondary"></i> 
      <p class="brewery__para text-secondary">
        ${address}
      </p>
    </div>
  `;

    const phoneHtml = `
    <div class="row align-items-center brewery__row">
      <i class="fa-solid fa-phone text-secondary"></i> 
      <p class="brewery__para text-secondary">
        ${brewery.phone}
      </p>
    </div>
  `;

    const websiteHtml = `
    <div class="row align-items-center brewery__row">
      <i class="fa-solid fa-earth-americas text-secondary"></i> 
      <p class="brewery__para text-secondary">
        <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>
      </p>
    </div>
  `;

    breweryDescriptionElem.innerHTML = `  
      <div>
        <h2 class="text-secondary">${brewery.name}</h2>
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
        <i class="fas fa-map fa-stack-1x"></i>
        <i class="fas fa-ban fa-stack-2x" style="color: Tomato;"></i>
      </span>
    `;
  }

  mapElem.classList.add("animate-slide-in-left");
  breweryDescriptionElem.classList.add("animate-slide-in-right");
}

function displaySkeletonLoader() {
  breweryDescriptionElem.innerHTML = `
    <div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
    </div>
  `;

  mapElem.innerHTML = `<div class="skeleton skeleton-map"></div>`;
}

window.addEventListener("load", loadBrewery);
