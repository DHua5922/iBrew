export function createSearchResultsView(pageSize) {
  const list = document.querySelector(".search-results__list");
  const wrapper = document.querySelector(".search-results__wrapper");
  const count = document.querySelector(".search-results-filter__count");
  const expandWrapper = document.querySelector(
    ".search-results__expand-btn--wrapper",
  );

  function textElement(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
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

  function appendParagraph(button, text) {
    if (text) {
      button.append(textElement("p", "search-results__item--para", text));
    }
  }

  function createResultButton(brewery) {
    const button = document.createElement("button");
    button.className = "search-results__item";
    button.dataset.breweryId = brewery.id;

    const overlay = textElement(
      "div",
      "search-results__item--overlay",
      "Click to view details",
    );
    overlay.setAttribute("aria-hidden", "true");

    button.append(
      overlay,
      textElement("h4", "search-results__item--title", brewery.name),
    );
    appendParagraph(
      button,
      brewery.brewery_type ? `Type: ${brewery.brewery_type}` : "",
    );
    appendParagraph(button, formatAddress(brewery));
    appendParagraph(button, brewery.phone ? `Phone: ${brewery.phone}` : "");

    return button;
  }

  function breweryItem(brewery) {
    const item = document.createElement("li");
    item.className = "search-results__item--wrapper";
    item.append(createResultButton(brewery));
    return item;
  }

  function showResultsWrapper(hasMore) {
    wrapper.style.display = "block";
    wrapper.classList.add("animate-pop-in");
    expandWrapper.style.display = hasMore ? "block" : "none";
  }

  function renderEmpty(query) {
    list.style.justifyContent = "center";
    list.append(
      textElement(
        "p",
        "search-results__error",
        `No breweries found for "${query}". Please try a different search.`,
      ),
    );
  }

  function render({ breweries, totalCount, hasMore }, query) {
    showResultsWrapper(hasMore);
    count.textContent = `Search Results: ${totalCount.toLocaleString()}`;
    list.replaceChildren();

    if (totalCount === 0) {
      renderEmpty(query);
      return;
    }

    list.style.justifyContent = "start";
    list.append(...breweries.map(breweryItem));
  }

  function renderLoading() {
    wrapper.style.display = "none";
    wrapper.classList.remove("animate-pop-in");
    expandWrapper.style.display = "block";
    const skeletons = Array.from({ length: pageSize }, createSkeleton);
    list.replaceChildren(...skeletons);
  }

  function createSkeleton() {
    const item = document.createElement("li");
    item.className = "search-results__item--wrapper animate-pop-in";
    item.setAttribute("aria-hidden", "true");
    item.innerHTML = `<button class="search-results__item" disabled>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </button>`;
    return item;
  }

  function renderError() {
    showResultsWrapper(false);
    list.style.justifyContent = "center";
    list.replaceChildren(
      textElement(
        "p",
        "search-results__error",
        "An error occurred while fetching breweries. Please try again.",
      ),
    );
  }

  return { render, renderError, renderLoading };
}
