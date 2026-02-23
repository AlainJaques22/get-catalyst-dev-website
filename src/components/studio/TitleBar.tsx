export function TitleBar() {
  return (
    <div className="sc-titlebar">
      <div className="sc-traffic-lights">
        <span className="sc-dot sc-dot-red" />
        <span className="sc-dot sc-dot-yellow" />
        <span className="sc-dot sc-dot-green" />
      </div>
      <span className="sc-titlebar-text">Catalyst Studio</span>
      <div className="sc-traffic-lights" style={{ visibility: 'hidden' }}>
        <span className="sc-dot" />
        <span className="sc-dot" />
        <span className="sc-dot" />
      </div>
    </div>
  );
}
