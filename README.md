# iBrew

iBrew is a responsive brewery discovery website built with HTML, CSS, and vanilla JavaScript. Users can search for breweries, sort results, view brewery details, open mapped locations, and generate a random brewery recommendation.

I built this project as a front-end portfolio piece focused on practical product behavior, maintainable code organization, and accessibility without relying on a framework.

## What It Does

- Searches breweries by keyword using the Open Brewery DB API
- Displays responsive search result cards with brewery type, address, and phone
- Sorts results alphabetically by brewery name
- Opens brewery details in an accessible popover
- Displays brewery locations with Google Maps
- Generates a random brewery recommendation
- Supports light and dark themes with `localStorage`
- Provides loading skeletons for async states

## Engineering Highlights

- Separated HTML, CSS, and JavaScript into page-specific and shared files
- Used `addEventListener` instead of inline event handlers for maintainable behavior
- Kept API calls in `scripts/api/brewery.js` so data fetching is isolated from UI rendering
- Encoded user search input before sending API requests
- Handled missing brewery fields with conditional rendering
- Used event delegation for dynamically rendered search result cards
- Followed BEM-style CSS naming for readable component-level styling

## Accessibility

- Added semantic HTML landmarks and accessible navigation labels
- Added labels for form controls, including visually hidden labels where the visual design uses icons
- Added `aria-current`, `aria-live`, `aria-expanded`, and `aria-pressed` where they describe real UI state
- Marked decorative images and icons as hidden from assistive technology
- Added visible keyboard focus states
- Added keyboard-accessible popover close behavior
- Respected reduced-motion preferences with `prefers-reduced-motion`

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Open Brewery DB API
- Google Maps JavaScript API
- Font Awesome

## Run Locally

Open `index.html` directly in a browser.

## What I Would Improve Next

- Add automated accessibility checks with axe and continue validating overall page quality with Chrome Lighthouse
- Add pagination if the API response strategy expands beyond the current pattern for loading more
- Improve image performance by lazy loading below-the-fold images, adding image dimensions to reduce layout shift, and using async decoding where appropriate
- Replace larger `innerHTML` template strings with DOM-building helpers or small rendering utilities to improve maintainability and reduce HTML injection risk

## Notes

The project currently uses a Google Maps API key in `scripts/map.js`. In production, the key should be restricted by domain and API scope in Google Cloud.
