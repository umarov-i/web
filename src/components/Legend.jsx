function Legend() {
  return (
    <div className="legend">
      <h3>Seat Legend</h3>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-color seat-available"></div>
          <span>Available ($100-$600)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color seat-selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-color seat-reserved"></div>
          <span>Reserved</span>
        </div>
        <div className="legend-item">
          <div className="legend-color seat-occupied"></div>
          <span>Occupied</span>
        </div>
        <div className="legend-item">
          <span className="window-icon">🪟</span>
          <span>Window (+20% Price)</span>
        </div>
      </div>
    </div>
  );
}

export default Legend;
