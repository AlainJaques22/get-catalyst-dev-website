interface PlaceholderPageProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  credentials?: string;
}

export function PlaceholderPage({ title, icon, description, credentials }: PlaceholderPageProps) {
  return (
    <div className="sc-placeholder">
      <div className="sc-placeholder-icon">{icon}</div>
      <h3 className="sc-placeholder-title">{title}</h3>
      <p className="sc-placeholder-description">{description}</p>
      {credentials && (
        <div className="sc-credentials-box" style={{ marginTop: 12, maxWidth: 360 }}>
          <span className="sc-credentials-label">Credentials</span>
          <span className="sc-credentials-value">{credentials}</span>
        </div>
      )}
      <p className="sc-placeholder-text">Screenshot coming soon</p>
    </div>
  );
}
