import { getConnector } from './connectorData';

interface ConnectorDetailProps {
  connectorId: string;
}

export function ConnectorDetail({ connectorId }: ConnectorDetailProps) {
  const connector = getConnector(connectorId);
  if (!connector) {
    return (
      <div className="sc-placeholder">
        <p className="sc-placeholder-text">Connector not found</p>
      </div>
    );
  }

  const { readme } = connector;

  return (
    <div className="sc-connector-detail">
      <div className="sc-connector-detail-header">
        <img src={connector.icon} width={40} height={40} alt="" />
        <h2 className="sc-connector-detail-title">{readme.title}</h2>
      </div>

      <div className="sc-connector-detail-body">
        {readme.description.split('\n\n').map((paragraph, i) => (
          <p key={i} className="sc-connector-detail-paragraph">
            {paragraph}
          </p>
        ))}

        <div className="sc-credentials-box">
          <span className="sc-credentials-label">Credentials</span>
          <span className="sc-credentials-value">{readme.credentials}</span>
        </div>

        {readme.links.length > 0 && (
          <div className="sc-links-section">
            <span className="sc-links-label">Quick Links</span>
            {readme.links.map((link, i) => (
              <div key={i} className="sc-quick-link">
                <span>{link.label}</span>
                <span className="sc-link-chevron">›</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
