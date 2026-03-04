# Seat Reservation Application - SE201 Midterm Project

## Overview
This is a front-end seat booking application developed for the SE201 Web Programming midterm project. It simulates an airplane seat reservation system (Transportation domain) with interactive visualization, real-time state management, and persistent storage.

## Features
- **Interactive Seat Map**: A visual representation of an airplane cabin with 12 rows.
- **Dynamic Statuses**: Seats can be Available, Selected, Reserved, or Occupied.
- **Validation Rules**:
  - Maximum of 5 seats per booking.
  - Cannot select already reserved or occupied seats.
  - Confirmation required before finalizing bookings.
- **Booking Summary**: Real-time calculation of total price based on seat class and premium features (window seats).
- **Persistence**: Data is saved to `localStorage`, so reservations persist across page refreshes.
- **Legend & Instructions**: Clear visual cues and guidance for users.
- **Responsive Design**: Optimized for different screen sizes.

## Technical Details
- **Framework**: React 18
- **Styling**: Vanilla CSS with modern flexbox and grid layouts.
- **State Management**: React `useState` and `useEffect` hooks.
- **Build Tool**: Vite

## Project Requirements Addressed
1. **Seat Visualization**: Grid layout with status-based color coding.
2. **Interaction**: Click-based selection/deselection with real-time updates.
3. **Validation**: Capacity limits and confirmation flows implemented.
4. **UI/UX**: Accessible color contrast and a clear legend.
5. **Clean Code**: Follows modern React best practices without redundant logic.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open the provided local URL in your browser.

---
**Course**: SE201 - Web Programming  
**University**: School of Computing, Department of Computer Science
