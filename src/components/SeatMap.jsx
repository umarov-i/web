import React from 'react';
import Seat from './Seat';

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
                <div key={rowNumber} className={`seat-row ${isTapered ? 'tapered-row' : ''}`} style={{ width: '100%', justifyContent: 'center' }}>
                  <span className="row-label">{rowNumber}</span>
                  <div className="row-seats">
                    {rows[rowNumber].map((seat) => {
                      return (
                        <Seat
                          key={seat.id}
                          seat={seat}
                          onSelect={onSelect}
                          onDeselect={onDeselect}
                          maxSelections={maxSelections}
                          selectedCount={selectedCount}
                          getSeatClass={getSeatClass}
                        />
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
