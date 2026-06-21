let breweryList = [];
const initialEndIndex = 8;
let currentEndExpandIndex = initialEndIndex;
let chosenBrewery = {};

const breweryListElem = document.querySelector(".search-results__list");
const searchResultsExpandBtnWrapper = document.querySelector(
  ".search-results__expand-btn--wrapper",
);
const searchResultsWrapperElem = document.querySelector(
  ".search-results__wrapper",
);
const breweryDialogElem = document.querySelector("#brewery-dialog");
let activeBreweryTrigger = null;

async function onSearchBreweries(evt) {
  evt.preventDefault();

  displaySkeletonLoader();

  const searchInput = document.querySelector(".search__input");
  const query = searchInput.value.trim();
  if (query) {
    try {
      breweryList = await searchBreweriesApi(query);
      currentEndExpandIndex = initialEndIndex;
      displaySearchResults(currentEndExpandIndex);
    } catch (err) {
      searchResultsWrapperElem.style.display = "block";
      searchResultsWrapperElem.innerHTML = `<p class="search-results__error">An error occurred while fetching breweries. Please try again.</p>`;
    }
  }
}

function onExpandSearchResults() {
  currentEndExpandIndex += initialEndIndex;
  displaySearchResults(currentEndExpandIndex);

  if (currentEndExpandIndex >= breweryList.length) {
    searchResultsExpandBtnWrapper.style.display = "none";
  }
}

function displaySearchResults(currentEndExpandIndex) {
  const searchResultsCountElem = document.querySelector(
    ".search-results-filter__count",
  );

  const breweryHtml = (brewery) => {
    const addressParts = [
      brewery.street,
      brewery.address_2,
      brewery.address_3,
      brewery.city,
      brewery.state,
    ].filter(Boolean);

    return `<li class="search-results__item--wrapper">
        <button class="search-results__item" data-brewery-id="${brewery.id}">
            <div class="search-results__item--overlay" aria-hidden="true">Click to view details</div>
            <h4 class="search-results__item--title">${brewery.name}</h4>
            ${brewery.brewery_type ? `<p class="search-results__item--para">Type: ${brewery.brewery_type}</p>` : ""}
            ${addressParts.length ? `<p class="search-results__item--para">${addressParts.join(", ")}</p>` : ""}
            ${brewery.phone ? `<p class="search-results__item--para">Phone: ${brewery.phone}</p>` : ""}
        </button>
    </li>`;
  };

  animateCounter(
    searchResultsCountElem,
    breweryList.length,
    (num) => `Search Results: ${num}`,
  );

  searchResultsWrapperElem.style.display = "block";
  searchResultsWrapperElem.classList.add("animate-pop-in");

  if (breweryList.length > initialEndIndex)
    searchResultsExpandBtnWrapper.style.display = "block";
  else searchResultsExpandBtnWrapper.style.display = "none";

  if (breweryList.length === 0) {
    breweryListElem.style.justifyContent = "center";
    breweryListElem.innerHTML = `<p class="search-results__error">No breweries found for "${document.querySelector(".search__input").value.trim()}". Please try a different search.</p>`;
    searchResultsExpandBtnWrapper.style.display = "none";
    return;
  } else {
    breweryListElem.style.justifyContent = "start";
    breweryListElem.innerHTML = breweryList
      .slice(0, currentEndExpandIndex)
      .map((brewery) => breweryHtml(brewery))
      .join("");
  }
}

function onClickBrewery(evt) {
  const breweryItem = evt.target.closest(".search-results__item");
  if (!breweryItem || !breweryDialogElem) return;

  const breweryId = breweryItem.getAttribute("data-brewery-id");
  chosenBrewery = breweryList.find((brewery) => brewery.id === breweryId);
  if (!chosenBrewery) return;

  activeBreweryTrigger = breweryItem;

  const breweryTypeHtml = `<p class="brewery__para">Type: ${chosenBrewery.brewery_type}</p>`;

  const address = [
    chosenBrewery.street,
    chosenBrewery.address_2,
    chosenBrewery.address_3,
    chosenBrewery.city,
    chosenBrewery.state,
  ]
    .filter(Boolean)
    .join(", ");
  const addressHtml = `
    <div class="row align-items-center brewery__row">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      <p class="brewery__para">
        ${address}
      </p>
    </div>
  `;

  const phoneHtml = `
    <div class="row align-items-center brewery__row">
      <i class="fa-solid fa-phone" aria-hidden="true"></i>
      <p class="brewery__para">
        ${chosenBrewery.phone}
      </p>
    </div>
  `;

  const websiteHtml = `
    <div class="row align-items-center brewery__row">
      <i class="fa-solid fa-earth-americas" aria-hidden="true"></i>
      <p class="brewery__para">
        <a class="dark-outline-on-focus" href="${chosenBrewery.website_url}" target="_blank" rel="noopener noreferrer">${chosenBrewery.website_url}</a>
      </p>
    </div>
  `;

  breweryDialogElem.innerHTML = `
    <button class="modal__close-btn" type="button" aria-label="Close brewery details" autofocus>
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>

    <div id="map" role="region" aria-label="Brewery location map"></div>
  
    <div class="brewery__details">
      <h2 id="brewery-dialog-title">${chosenBrewery.name}</h2>
      ${chosenBrewery.brewery_type ? breweryTypeHtml : ""}
      ${addressHtml}
      ${chosenBrewery.phone ? phoneHtml : ""}
      ${chosenBrewery.website_url ? websiteHtml : ""}
    </div>
  `;

  breweryDialogElem.showModal();
  initMap(chosenBrewery);
}

function onSortSearchResults(evt) {
  if (evt.target.value === "name-asc") {
    breweryList.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;

      return 0;
    });
  } else if (evt.target.value === "name-desc") {
    breweryList.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;

      return 0;
    });
  }

  displaySearchResults(currentEndExpandIndex);
}

function displaySkeletonLoader() {
  const skeletonHtml = `<li class="search-results__item--wrapper animate-pop-in" aria-hidden="true">
        <button class="search-results__item" disabled>
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
        </button>
    </li>`;

  searchResultsWrapperElem.style.display = "none";
  searchResultsWrapperElem.classList.remove("animate-pop-in");
  searchResultsExpandBtnWrapper.style.display = "block";

  breweryListElem.innerHTML = Array(8)
    .fill(0)
    .map(() => skeletonHtml)
    .join("");
}

function bindSearchEvents() {
  document
    .querySelector(".search__form")
    ?.addEventListener("submit", onSearchBreweries);

  document
    .querySelector(".search-results-filter__dropdown")
    ?.addEventListener("change", onSortSearchResults);

  document
    .querySelector(".search-results__expand-btn")
    ?.addEventListener("click", onExpandSearchResults);

  breweryListElem?.addEventListener("click", (evt) => {
    if (evt.target.closest(".search-results__item")) {
      onClickBrewery(evt);
    }
  });

  breweryDialogElem?.addEventListener("click", (evt) => {
    if (evt.target.closest(".modal__close-btn")) {
      breweryDialogElem.close();
    }
  });

  breweryDialogElem?.addEventListener("close", () => {
    activeBreweryTrigger?.focus();
    activeBreweryTrigger = null;
  });
}

window.addEventListener("DOMContentLoaded", bindSearchEvents);
