# Source Code Overview

## Directory Structure
- `assets/`: Contains static assets like images and SVG files.
- `components/`: Contains all React functional components.
- `App.jsx`: The main entry point and orchestrator for the application state.
- `App.css`: Main stylesheet for the application.
- `main.jsx`: Entry point for React DOM rendering.
- `index.css`: Global baseline styles.

## State Management
The application follows a "top-down" data flow:
1. `App.jsx` holds the master state (`seats`, `modal`, `errorMessage`).
2. Functions for handling selection, confirmation, and resets are defined in `App.jsx`.
3. State and handlers are passed down to child components (`SeatMap`, `BookingSummary`, `Legend`, `Modal`) via props.

## Data Persistence
The application uses `localStorage` to persist seat statuses. On initial load, it either fetches saved data or generates a new airplane cabin layout.
