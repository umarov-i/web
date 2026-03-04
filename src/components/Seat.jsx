function Seat({ seat, onSelect, onDeselect, maxSelections, selectedCount, getSeatClass }) {
  const isSelected = seat.status === 'selected';
  const isReservedOrOccupied = seat.status === 'reserved' || seat.status === 'occupied';
  const isAtMaxCapacity = selectedCount >= maxSelections && !isSelected;

  const handleClick = () => {
    if (isSelected) {
      onDeselect(seat.id);
    } else {
      onSelect(seat.id);
    }
  };

  return (
    <div key={seat.id} className="seat-container">
      <button
        type="button"
        className={`${getSeatClass(seat)} ${seat.isWindow ? 'window-seat' : ''}`}
        onClick={handleClick}
        disabled={isAtMaxCapacity && seat.status === 'available'}
        style={{
          cursor: isAtMaxCapacity && seat.status === 'available' ? 'not-allowed' : 'pointer',
          opacity: isAtMaxCapacity && seat.status === 'available' ? 0.6 : 1,
        }}
        title={`Seat ${seat.number} - ${seat.class}\nPrice: $${seat.price}\n${seat.isWindow ? 'Window Seat' : ''}`}
        aria-label={`Seat ${seat.number}, ${seat.class}, $${seat.price}, ${seat.status}`}
      >
        <span className="seat-number">{seat.number}</span>
      </button>
      <div className="seat-info">
        <span className="seat-class-tag">{seat.class.split(' ')[0]}</span>
        <span className="seat-price-tag">${seat.price}</span>
      </div>
    </div>
  );
}

export default Seat;
