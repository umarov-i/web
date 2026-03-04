function BookingSummary({ selectedSeats, onConfirm, onCancel, maxSelections }) {
  const selectedSeatList = selectedSeats.filter(seat => seat.status === 'selected');
  const totalPrice = selectedSeatList.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="booking-summary">
      <h3>Booking Summary</h3>
      <div className="summary-content">
        <p>
          <strong>Selected Seats:</strong>{' '}
          {selectedSeatList.length} of {maxSelections} max
        </p>
        {selectedSeatList.length > 0 && (
          <div className="selected-seats-list">
            {selectedSeatList.map(seat => (
              <div key={seat.id} className="selected-seat-tag">
                <span className="tag-number">{seat.number}</span>
                <span className="tag-price">${seat.price}</span>
                <span className="tag-class">{seat.class.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        )}
        <p className="total-price">
          <strong>Total Amount:</strong> ${totalPrice}
        </p>
      </div>
      <div className="summary-actions">
        <button
          className="btn btn-cancel"
          onClick={onCancel}
          disabled={selectedSeatList.length === 0}
        >
          Cancel Selection
        </button>
        <button
          className="btn btn-confirm"
          onClick={onConfirm}
          disabled={selectedSeatList.length === 0}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
