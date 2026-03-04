function SeatMap({ seats, onSelect, onDeselect, maxSelections, selectedCount }) {
  const rows = {};
  seats.forEach(seat => {
    const rowNumber = seat.number.slice(0, -1);
    if (!rows[rowNumber]) {
      rows[rowNumber] = [];
    }
    rows[rowNumber].push(seat);
  });

  const sortedRowNumbers = Object.keys(rows).sort((a, b) => parseInt(a) - parseInt(b));

  const handleSeatClick = (seat) => {
    const isReservedOrOccupied = seat.status === 'reserved' || seat.status === 'occupied';
    const isSelected = seat.status === 'selected';
    const isAtMaxCapacity = selectedCount >= maxSelections && !isSelected;

    if (isAtMaxCapacity && !isReservedOrOccupied) return;

    if (isSelected) {
      onDeselect(seat.id);
    } else {
      onSelect(seat.id);
    }
  };

  const getSeatClass = (seat) => {
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
    <div className="airplane-container">
      <div className="airplane-body">
        <div className="airplane-nose">
          <div className="cockpit"></div>
          <span>Flight Deck</span>
        </div>

        <div className="cabin">
          <div className="side-wall left-wall">
            {sortedRowNumbers.map(rowNumber => (
              <div key={`win-l-${rowNumber}`} className="window-frame">
                <span className="window-icon">🪟</span>
              </div>
            ))}
          </div>

          <div className="seats-area">
            {sortedRowNumbers.map(rowNumber => {
              const rowInt = parseInt(rowNumber);
              const isTapered = rowInt <= 2;

              return (
                <div key={rowNumber} className={`seat-row ${isTapered ? 'tapered-row' : ''}`}>
                  <span className="row-label">{rowNumber}</span>
                  <div className="row-seats">
                    {rows[rowNumber].map((seat, index) => {
                      const isSelected = seat.status === 'selected';
                      const isAtMaxCapacity = selectedCount >= maxSelections && !isSelected;
                      const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

                      // Add aisle spacing after seat 'C' (index 2)
                      return (
                        <>
                          <div key={seat.id} className="seat-container">
                            <div
                              className={`${getSeatClass(seat)} ${seat.isWindow ? 'window-seat' : ''}`}
                              onClick={() => handleSeatClick(seat)}
                              style={{
                                cursor: isAtMaxCapacity && seat.status === 'available' ? 'not-allowed' : 'pointer',
                                opacity: isAtMaxCapacity && seat.status === 'available' ? 0.6 : 1,
                              }}
                              title={`Seat ${seat.number} - ${seat.class}\nPrice: $${seat.price}\n${seat.isWindow ? 'Window Seat' : ''}`}
                            >
                              <span className="seat-number">{seat.number}</span>
                            </div>
                            <div className="seat-info">
                              <span className="seat-class-tag">{seat.class.split(' ')[0]}</span>
                              <span className="seat-price-tag">${seat.price}</span>
                            </div>
                          </div>
                          {index === 2 && <div className="aisle"></div>}
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="side-wall right-wall">
            {sortedRowNumbers.map(rowNumber => (
              <div key={`win-r-${rowNumber}`} className="window-frame">
                <span className="window-icon">🪟</span>
              </div>
            ))}
          </div>
        </div>

        <div className="airplane-tail">
          <div className="stabilizers"></div>
          <span>Rear Exit</span>
        </div>
      </div>
    </div>
  );
}

export default SeatMap;
