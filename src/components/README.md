# Components Documentation

## Overview
The `src/components/` directory contains all the reusable React components used in the Seat Reservation application.

## Component Descriptions

### `SeatMap.jsx`
- **Purpose**: Displays the visual grid of seats in an airplane cabin layout.
- **Key Features**:
  - Dynamically renders rows based on seat data.
  - Visual layout including airplane nose, cabin, and tail.
  - Interactive seat elements with different visual states (hover, click).
  - Row labels and aisle spacing for better navigation.

### `Seat.jsx`
- **Purpose**: Individual seat component (if applicable - currently part of `SeatMap.jsx`).
- **Functionality**: Manages its own styling and handles click events.

### `BookingSummary.jsx`
- **Purpose**: Provides a real-time summary of the user's current selections.
- **Functionality**:
  - Lists all selected seats by number, class, and price.
  - Calculates the total amount.
  - Displays "Cancel Selection" and "Confirm Booking" buttons.
  - Disables buttons when no seats are selected.

### `Legend.jsx`
- **Purpose**: A visual reference for seat statuses and special features.
- **Visuals**: Color-coded boxes for Available, Selected, Reserved, and Occupied statuses.

### `Modal.jsx`
- **Purpose**: A reusable popup for user confirmations and alerts.
- **Functionality**:
  - Used for confirming bookings, resets, and displaying success/error messages.
  - Implements an overlay and centered content box.
  - Animated entry and exit for a polished UX.

## Common Props
Most components communicate through props like `seats`, `onSelect`, `onDeselect`, and `selectedCount` to maintain a single source of truth in the parent `App.jsx` component.
