const fallbackCoordinates = { lat: 37.7749, lng: -122.4194 };

((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k],
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyCPA9Nh8dHZWXecrkYSZrIXMhqVhhRzNEo",
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

async function initMap(brewery = {}) {
  const mapElement = document.getElementById("map");

  if (!mapElement) {
    return;
  }

  const lat = Number(brewery.latitude);
  const lng = Number(brewery.longitude);
  const coordinates =
    Number.isFinite(lat) && Number.isFinite(lng)
      ? { lat, lng }
      : fallbackCoordinates;

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: coordinates,
    mapId: "DEMO_MAP_ID",
  });

  new AdvancedMarkerElement({
    map: map,
    position: coordinates,
    title: brewery.name || "Target Location",
  });
}
