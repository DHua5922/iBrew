async function searchBreweriesApi(query) {
  const response = await fetch(
    `https://api.openbrewerydb.org/v1/breweries/search?query=${query}`,
  );
  return response.json();
}
