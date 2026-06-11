const baseUrl = "https://api.openbrewerydb.org/v1/breweries";

async function searchBreweriesApi(query) {
  const response = await fetch(
    `${baseUrl}/search?query=${encodeURIComponent(query)}`,
  );
  return response.json();
}

async function getRandomBreweryApi() {
  const response = await fetch(`${baseUrl}/random`);
  const data = await response.json();
  return data[0];
}
