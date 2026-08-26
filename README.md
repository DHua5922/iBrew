# iBrew

iBrew is a responsive brewery discovery website built with HTML, CSS, and vanilla JavaScript. Users can search for breweries, sort results, view brewery details, open mapped locations, and generate a random brewery recommendation.

I built this project as a front-end portfolio piece focused on practical product behavior, maintainable code organization, and accessibility without relying on a framework.

## What It Does

- Searches breweries by keyword using the Open Brewery DB API
- Displays responsive search result cards with brewery type, address, and phone
- Sorts results alphabetically by brewery name
- Opens brewery details in an accessible modal dialog
- Displays brewery locations with Google Maps
- Generates a random brewery recommendation
- Supports light and dark themes with `localStorage`
- Provides loading skeletons for async states

## Engineering Highlights

- Separated shared layout and utility styles from page-specific CSS
- Split search behavior into small ES modules for state, result rendering, and
  brewery dialog rendering
- Used `addEventListener` instead of inline event handlers for maintainable behavior
- Kept API calls in `scripts/api/brewery.js` so data fetching is isolated from UI rendering
- Encoded user search input before sending API requests
- Handled missing brewery fields with conditional rendering
- Used event delegation for dynamically rendered search result cards
- Followed BEM-style CSS naming for readable component-level styling
- Optimized landing page artwork with responsive AVIF/WebP sources and PNG fallbacks
- Organized production assets by purpose, page, and image family for easier maintenance

## Accessibility

- Added semantic HTML landmarks and accessible navigation labels
- Added labels for form controls, including visually hidden labels where the visual design uses icons
- Added `aria-current`, `aria-live`, `aria-expanded`, and `aria-pressed` where they describe real UI state
- Marked decorative images and icons as hidden from assistive technology
- Added visible keyboard focus states
- Added keyboard-accessible dialog controls
- Respected reduced-motion preferences with `prefers-reduced-motion`

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Open Brewery DB API
- Google Maps JavaScript API
- Font Awesome

## Run Locally

The search page uses native JavaScript modules, so serve the project through a
local HTTP server instead of opening the HTML files directly:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Project Structure

```text
css/
├── layout/              # Global, navigation, and footer styles
├── search-breweries/    # Search-page component styles
└── utilities/           # Reusable buttons, links, modal, and other utilities

scripts/
├── api/                 # Open Brewery DB requests
├── search-breweries/    # Search state, results, dialog, and page coordinator
├── map.js               # Google Maps integration
├── navbar.js            # Mobile navigation behavior
└── theme.js             # Theme loading, toggling, and persistence
```

## What I Would Improve Next

- Add automated accessibility checks with axe and continue validating overall page quality with Chrome Lighthouse
- Add pagination if the API response strategy expands beyond the current pattern for loading more
- Replace the remaining `innerHTML` templates on the random brewery page with
  DOM-building helpers

## Notes

This project uses a browser-side Google Maps API key for map rendering. The key is restricted in Google Cloud to the deployed iBrew domain and localhost development, and its API access is scoped to the Maps JavaScript APIs used by this project.
