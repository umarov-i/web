function Seat({ seat, onSelect, onDeselect, maxSelections, selectedCount }) {
  const isDisabled = seat.status === 'occupied' || seat.status === 'reserved';
  const isSelected = seat.status === 'selected';
  const isAtMaxCapacity = selectedCount >= maxSelections && !isSelected;

  const handleClick = () => {
    if (isDisabled) return;
    if (isAtMaxCapacity) return;

    if (isSelected) {
      onDeselect(seat.id);
    } else {
      onSelect(seat.id);
    }
  };

  const getSeatClass = () => {
    const baseClass = 'seat';
    switch (seat.status) {
      case 'available':
        return `${baseClass} seat-available`;
      case 'selected':
        return `${baseClass} seat-selected`;
      case 'reserved':
        return `${baseClass} seat-reserved`;
      case 'occupied':
        return `${baseClass} seat-occupied`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="seat-container">
      <button
        className={getSeatClass()}
        onClick={handleClick}
        disabled={isDisabled || isAtMaxCapacity}
        aria-label={`Seat ${seat.number}, ${seat.status}`}
        title={`Seat ${seat.number} - ${seat.status}`}
      >
        <span className="seat-number">{seat.number}</span>
      </button>
      <span className="seat-label">{seat.number}</span>
    </div>
  );
}

export default Seat;
