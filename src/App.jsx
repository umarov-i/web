import { useState, useEffect } from 'react';
import SeatMap from './components/SeatMap';
import Legend from './components/Legend';
import BookingSummary from './components/BookingSummary';
import Modal from './components/Modal';
import './App.css';

const MAX_SELECTIONS = 5;

// Initial seat data - simulating an airplane with 12 rows, 6 seats per row (A-F)
// Initial seat data - simulating an airplane with 12 rows, 6 seats per row (A-F)
function generateInitialSeats() {
  const seats = [];
  const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  for (let row = 1; row <= 12; row++) {
    seatLetters.forEach((letter, index) => {
      const seatNumber = `${row}${letter}`;
      let status = 'available';

      // Randomly assign some seats as occupied or reserved for realism
      const random = Math.random();
      if (random < 0.15) {
        status = 'occupied';
      } else if (random < 0.25) {
        status = 'reserved';
      }

      // Determine seat class and base price based on row
      let seatClass = 'Economy';
      let basePrice = 100;

      if (row <= 2) {
        seatClass = 'First Class';
        basePrice = 500;
      } else if (row <= 5) {
        seatClass = 'Business Class';
        basePrice = 300;
      }

      // Window seats are first and last in the row (A and F)
      const isWindow = index === 0 || index === seatLetters.length - 1;
      let finalPrice = basePrice;

      if (isWindow) {
        finalPrice = Math.round(basePrice * 1.2); // 20% premium for window seats
      }

      seats.push({
        id: `${row}${letter}`,
        number: seatNumber,
        status,
        class: seatClass,
        basePrice,
        price: finalPrice,
        isWindow,
      });
    });
  }

  return seats;
}

function App() {
  const [seats, setSeats] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'confirm',
    onConfirm: null,
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Load seats from localStorage or generate initial seats
  useEffect(() => {
    const savedSeats = localStorage.getItem('airplaneSeats');
    if (savedSeats) {
      setSeats(JSON.parse(savedSeats));
    } else {
      const initialSeats = generateInitialSeats();
      setSeats(initialSeats);
      localStorage.setItem('airplaneSeats', JSON.stringify(initialSeats));
    }
  }, []);

  // Save seats to localStorage whenever they change
  useEffect(() => {
    if (seats.length > 0) {
      localStorage.setItem('airplaneSeats', JSON.stringify(seats));
    }
  }, [seats]);

  const selectedSeats = seats.filter(seat => seat.status === 'selected');
  const selectedCount = selectedSeats.length;

  const handleSelect = (seatId) => {
    setErrorMessage('');
    const seat = seats.find(s => s.id === seatId);

    // Handle unbooking reserved/occupied seats
    if (seat && (seat.status === 'reserved' || seat.status === 'occupied')) {
      setModal({
        isOpen: true,
        title: 'Unbook Seat',
        message: `Are you sure you want to unbook seat ${seat.number}?`,
        type: 'confirm',
        onConfirm: () => {
          setSeats(prevSeats =>
            prevSeats.map(s =>
              s.id === seatId ? { ...s, status: 'available' } : s
            )
          );
          setModal({ ...modal, isOpen: false });
        },
      });
      return;
    }

    if (selectedCount >= MAX_SELECTIONS) {
      setErrorMessage(`You can select a maximum of ${MAX_SELECTIONS} seats.`);
      return;
    }

    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId ? { ...seat, status: 'selected' } : seat
      )
    );
  };

  const handleDeselect = (seatId) => {
    setErrorMessage('');
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId ? { ...seat, status: 'available' } : seat
      )
    );
  };

  const handleResetAll = () => {
    setModal({
      isOpen: true,
      title: 'Reset All Bookings',
      message: 'Are you sure you want to cancel all reservations? This will reset all seats to available.',
      type: 'confirm',
      onConfirm: () => {
        setSeats(prevSeats =>
          prevSeats.map(seat => ({ ...seat, status: 'available' }))
        );
        setModal({ ...modal, isOpen: false });
      },
    });
  };

  const handleCancelSelection = () => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.status === 'selected' ? { ...seat, status: 'available' } : seat
      )
    );
    setErrorMessage('');
  };

  const handleConfirmBooking = () => {
    if (selectedCount === 0) {
      setErrorMessage('Please select at least one seat.');
      return;
    }

    setModal({
      isOpen: true,
      title: 'Confirm Booking',
      message: `Are you sure you want to book ${selectedCount} seat(s): ${selectedSeats.map(s => s.number).join(', ')}?`,
      type: 'confirm',
      onConfirm: finalizeBooking,
    });
  };

  const finalizeBooking = () => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.status === 'selected' ? { ...seat, status: 'reserved' } : seat
      )
    );
    setModal({
      isOpen: true,
      title: 'Booking Confirmed!',
      message: `Your ${selectedCount} seat(s) have been successfully reserved.`,
      type: 'success',
      onConfirm: () => setModal({ ...modal, isOpen: false }),
    });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>✈️ Airplane Seat Booking</h1>
        <p className="subtitle">Select your preferred seats for your journey</p>
      </header>

      <main className="app-main">
        <div className="left-panel">
          <Legend />
          <div className="seat-map-container">
            <SeatMap
              seats={seats}
              onSelect={handleSelect}
              onDeselect={handleDeselect}
              maxSelections={MAX_SELECTIONS}
              selectedCount={selectedCount}
            />
          </div>
        </div>

        <div className="right-panel">
          <BookingSummary
            selectedSeats={seats}
            onConfirm={handleConfirmBooking}
            onCancel={handleCancelSelection}
            maxSelections={MAX_SELECTIONS}
          />

          {errorMessage && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {errorMessage}
            </div>
          )}

          <div className="instructions">
            <h4>Instructions</h4>
            <ul>
              <li>Click on <strong>Available</strong> seats to select them</li>
              <li>Click on <strong>Selected</strong> seats to deselect</li>
              <li>Click on <strong>Reserved/Occupied</strong> seats to unbook them</li>
              <li>Maximum {MAX_SELECTIONS} seats per booking</li>
            </ul>
          </div>

          <button className="btn btn-reset" onClick={handleResetAll}>
            Reset All Bookings
          </button>
        </div>
      </main>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
        type={modal.type}
      />

      <footer className="app-footer">
        <p>SE201 - Web Programming Midterm Project | Seat Booking System</p>
      </footer>
    </div>
  );
}

export default App;
