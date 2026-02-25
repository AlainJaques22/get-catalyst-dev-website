import { useMemo, useState, useEffect } from 'react';
import { marked } from 'marked';
import { getConnector } from './connectorData';

interface ConnectorDetailProps {
  connectorId: string;
}

export function ConnectorDetail({ connectorId }: ConnectorDetailProps) {
  const connector = getConnector(connectorId);
  const [screenshotLoaded, setScreenshotLoaded] = useState(true);

  // Reset when switching connectors so we try loading the new screenshot
  useEffect(() => { setScreenshotLoaded(true); }, [connectorId]);

  const html = useMemo(() => {
    if (!connector) return '';
    // Strip the first h1 line (e.g. "# Catalyst Connector: Name") since we
    // already render the title in the header with the connector icon.
    const md = connector.readme.markdown.replace(/^#\s+.+\n/, '');
    return marked(md, { gfm: true }) as string;
  }, [connector]);

  if (!connector) {
    return (
      <div className="sc-placeholder">
        <p className="sc-placeholder-text">Connector not found</p>
      </div>
    );
  }

  return (
    <div className="sc-connector-detail">
      <div className="sc-connector-detail-header">
        <img src={connector.icon} width={40} height={40} alt="" />
        <h2 className="sc-connector-detail-title">{connector.readme.title}</h2>
      </div>

      {screenshotLoaded && (
        <img
          src={`/connectors/screenshots/${connectorId.replace('connector:', '')}.png`}
          alt={`${connector.readme.title} in Catalyst Studio`}
          className="sc-connector-screenshot"
          onError={() => setScreenshotLoaded(false)}
        />
      )}

      <div
        className="sc-connector-detail-body sc-markdown"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
