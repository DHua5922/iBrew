export function createSearchState(pageSize) {
  let breweries = [];
  let visibleCount = pageSize;

  function setBreweries(nextBreweries) {
    breweries = [...nextBreweries];
    visibleCount = pageSize;
  }

  function showMore() {
    visibleCount += pageSize;
  }

  function sort(direction) {
    if (direction !== "name-asc" && direction !== "name-desc") return;
    const multiplier = direction === "name-desc" ? -1 : 1;
    breweries.sort(
      (first, second) =>
        first.name.localeCompare(second.name, undefined, {
          sensitivity: "base",
        }) * multiplier,
    );
  }

  function findById(id) {
    return breweries.find((brewery) => brewery.id === id);
  }

  function getViewModel() {
    return {
      breweries: breweries.slice(0, visibleCount),
      totalCount: breweries.length,
      hasMore: visibleCount < breweries.length,
    };
  }

  return { findById, getViewModel, setBreweries, showMore, sort };
}
