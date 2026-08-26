import { createBreweryDialog } from "./brewery-dialog.js";
import { createSearchResultsView } from "./search-results.js";
import { createSearchState } from "./search-state.js";

const PAGE_SIZE = 8;
const searchForm = document.querySelector(".search__form");
const searchInput = document.querySelector(".search__input");
const sortDropdown = document.querySelector(".search-results-filter__dropdown");
const expandButton = document.querySelector(".search-results__expand-btn");
const breweryList = document.querySelector(".search-results__list");
const dialogElement = document.querySelector("#brewery-dialog");

const state = createSearchState(PAGE_SIZE);
const resultsView = createSearchResultsView(PAGE_SIZE);
const breweryDialog = createBreweryDialog(dialogElement);

window.addEventListener("DOMContentLoaded", bindSearchEvents);

function bindSearchEvents() {
  searchForm?.addEventListener("submit", onSearchBreweries);
  sortDropdown?.addEventListener("change", (event) => {
    state.sort(event.target.value);
    renderCurrentResults();
  });
  expandButton?.addEventListener("click", () => {
    state.showMore();
    renderCurrentResults();
  });
  breweryList?.addEventListener("click", onClickBrewery);
  breweryDialog.bindEvents();
}

async function onSearchBreweries(event) {
  event.preventDefault();
  const query = searchInput?.value.trim();
  if (!query) return;

  resultsView.renderLoading();
  try {
    state.setBreweries(await window.searchBreweriesApi(query));
    resultsView.render(state.getViewModel(), query);
  } catch (error) {
    resultsView.renderError();
  }
}

function renderCurrentResults() {
  resultsView.render(state.getViewModel(), searchInput?.value.trim());
}

function onClickBrewery(event) {
  const item = event.target.closest(".search-results__item");
  if (!item) return;
  const brewery = state.findById(item.dataset.breweryId);
  if (brewery) breweryDialog.open(brewery);
}
