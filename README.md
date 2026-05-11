# AgriMap Fertiliser Overuse Website

This is a self-contained website about efficiently mapping fertiliser overuse in food and agriculture systems.

## Files

- `index.html` contains the page structure.
- `styles.css` contains the visual design.
- `app.js` contains the database code and dashboard logic.

## Database

The project uses the browser's built-in IndexedDB database. It stores agricultural region records locally in the visitor's browser, including:

- Region or district
- Main crop
- Fertiliser used in kg/ha
- Recommended fertiliser in kg/ha
- Water sensitivity percentage

Open `index.html` in a modern browser. The app will automatically create the database and seed sample records on first load.
