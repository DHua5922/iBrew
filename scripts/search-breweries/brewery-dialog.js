export function createBreweryDialog(dialog) {
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

  function detailRow(iconClass, text, linkUrl) {
    const row = document.createElement("div");
    row.className = "row align-items-center brewery__row";

    const icon = document.createElement("i");
    icon.className = `fa-solid ${iconClass}`;
    icon.setAttribute("aria-hidden", "true");

    const paragraph = document.createElement("p");
    paragraph.className = "brewery__para";
    if (linkUrl) {
      const link = document.createElement("a");
      link.className = "dark-outline-on-focus";
      link.href = linkUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = text;
      paragraph.append(link);
    } else {
      paragraph.textContent = text;
    }

    row.append(icon, paragraph);
    return row;
  }

  function createCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.className = "modal__close-btn";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close brewery details");
    closeButton.autofocus = true;
    closeButton.innerHTML =
      '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    return closeButton;
  }

  function createMap() {
    const map = document.createElement("div");
    map.id = "map";
    map.setAttribute("role", "region");
    map.setAttribute("aria-label", "Brewery location map");
    return map;
  }

  function createDetails(brewery) {
    const details = document.createElement("div");
    details.className = "brewery__details";

    const title = document.createElement("h2");
    title.id = "brewery-dialog-title";
    title.textContent = brewery.name;
    details.append(title);

    if (brewery.brewery_type) {
      const type = document.createElement("p");
      type.className = "brewery__para";
      type.textContent = `Type: ${brewery.brewery_type}`;
      details.append(type);
    }

    const address = formatAddress(brewery);
    if (address) details.append(detailRow("fa-location-dot", address));
    if (brewery.phone) details.append(detailRow("fa-phone", brewery.phone));
    if (brewery.website_url) {
      details.append(
        detailRow(
          "fa-earth-americas",
          brewery.website_url,
          brewery.website_url,
        ),
      );
    }

    return details;
  }

  function open(brewery) {
    dialog.replaceChildren(
      createCloseButton(),
      createMap(),
      createDetails(brewery),
    );
    dialog.showModal();
    window.initMap(brewery);
  }

  function bindEvents() {
    dialog?.addEventListener("click", (event) => {
      if (event.target.closest(".modal__close-btn")) dialog.close();
    });
  }

  return { bindEvents, open };
}
