import { connectors } from './connectorData';
import { CatalystLogo } from './CatalystLogo';

interface ConnectorsGridProps {
  onSelect: (id: string, label: string) => void;
}

export function ConnectorsGrid({ onSelect }: ConnectorsGridProps) {
  return (
    <div className="sc-connectors-page">
      <div className="sc-connectors-header">
        <CatalystLogo size={28} />
        <span className="sc-connectors-logo-text">
          <span className="sc-logo-word-catalyst">catalyst</span>
          <span className="sc-logo-word-product">connectors</span>
        </span>
      </div>
      <p className="sc-connectors-hint">
        Click a connector to see its documentation and example BPMN.
      </p>
      <div className="sc-connectors-grid">
        {connectors.map(connector => (
          <div
            key={connector.id}
            className="sc-connector-card"
            onClick={() => onSelect(connector.id, connector.label)}
          >
            <div className="sc-connector-card-header">
              <img src={connector.icon} width={24} height={24} alt="" />
              <span className="sc-connector-card-name">{connector.label}</span>
            </div>
            <p className="sc-connector-card-copy">{connector.cardCopy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
