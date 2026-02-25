import { useState } from 'react';
import { CatalystLogo } from './CatalystLogo';

interface GetStartedPageProps {
  onNavigate: (id: string, label: string) => void;
}

function DownloadIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5.548l7.065-0.966v6.822H3V5.548zm0 12.904l7.065 0.966v-6.822H3v5.856zm7.935 1.085L21 21v-7.596H10.935v6.133zm0-14.074v6.133H21V3L10.935 5.463z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8.996 4.497c.104-.076.1-.168.186-.158s.022.102-.098.207c-.12.104-.308.243-.46.323-.291.152-.631.336-.993.336s-.647-.167-.853-.33c-.102-.082-.186-.162-.248-.221-.11-.086-.096-.207-.052-.204.075.01.087.109.134.153.064.06.144.137.241.214.195.154.454.304.778.304s.702-.19.932-.32c.13-.073.297-.204.433-.304M7.34 3.781c.055-.02.123-.031.174-.003.011.006.024.021.02.034-.012.038-.074.032-.11.05-.032.017-.057.052-.093.054-.034 0-.086-.012-.09-.046-.007-.044.058-.072.1-.089m.581-.003c.05-.028.119-.018.173.003.041.017.106.045.1.09-.004.033-.057.046-.09.045-.036-.002-.062-.037-.093-.053-.036-.019-.098-.013-.11-.051-.004-.013.008-.028.02-.034" />
      <path fillRule="evenodd" d="M8.446.019c2.521.003 2.38 2.66 2.364 4.093-.01.939.509 1.574 1.04 2.244.474.56 1.095 1.38 1.45 2.32.29.765.402 1.613.115 2.465a.8.8 0 0 1 .254.152l.001.002c.207.175.271.447.329.698.058.252.112.488.224.615.344.382.494.667.48.922-.015.254-.203.43-.435.57-.465.28-1.164.491-1.586 1.002-.443.527-.99.83-1.505.871a1.25 1.25 0 0 1-1.256-.716v-.001a1 1 0 0 1-.078-.21c-.67.038-1.252-.165-1.718-.128-.687.038-1.116.204-1.506.206-.151.331-.445.547-.808.63-.5.114-1.126 0-1.743-.324-.577-.306-1.31-.278-1.85-.39-.27-.057-.51-.157-.626-.384-.116-.226-.095-.538.07-.988.051-.16.012-.398-.026-.648a2.5 2.5 0 0 1-.037-.369c0-.133.022-.265.087-.386v-.002c.14-.266.368-.377.577-.451s.397-.125.53-.258c.143-.15.27-.374.443-.56q.036-.037.073-.07c-.081-.538.007-1.105.192-1.662.393-1.18 1.223-2.314 1.811-3.014.502-.713.65-1.287.701-2.016.042-.997-.705-3.974 2.112-4.2q.168-.015.321-.013m2.596 10.866-.03.016c-.223.121-.348.337-.427.656-.08.32-.107.733-.13 1.206v.001c-.023.37-.192.824-.31 1.267s-.176.862-.036 1.128v.002c.226.452.608.636 1.051.601s.947-.304 1.36-.795c.474-.576 1.218-.796 1.638-1.05.21-.126.324-.242.333-.4.009-.157-.097-.403-.425-.767-.17-.192-.217-.462-.274-.71-.056-.247-.122-.468-.26-.585l-.001-.001c-.18-.157-.356-.17-.565-.164q-.069.001-.14.005c-.239.275-.805.612-1.197.508-.359-.09-.562-.508-.587-.918m-7.204.03H3.83c-.189.002-.314.09-.44.225-.149.158-.276.382-.445.56v.002h-.002c-.183.184-.414.239-.61.31-.195.069-.353.143-.46.35v.002c-.085.155-.066.378-.029.624.038.245.096.507.018.746v.002l-.001.002c-.157.427-.155.678-.082.822.074.143.235.22.48.272.493.103 1.26.069 1.906.41.583.305 1.168.404 1.598.305.431-.098.712-.369.75-.867v-.002c.029-.292-.195-.673-.485-1.052-.29-.38-.633-.752-.795-1.09v-.002l-.61-1.11c-.21-.286-.43-.462-.68-.5a1 1 0 0 0-.106-.008M9.584 4.85c-.14.2-.386.37-.695.467-.147.048-.302.17-.495.28a1.3 1.3 0 0 1-.74.19.97.97 0 0 1-.582-.227c-.14-.113-.25-.237-.394-.322a3 3 0 0 1-.192-.126c-.063 1.179-.85 2.658-1.226 3.511a5.4 5.4 0 0 0-.43 1.917c-.68-.906-.184-2.066.081-2.568.297-.55.343-.701.27-.649-.266.436-.685 1.13-.848 1.844-.085.372-.1.749.01 1.097.11.349.345.67.766.931.573.351.963.703 1.193 1.015s.302.584.23.777a.4.4 0 0 1-.212.22.7.7 0 0 1-.307.056l.184.235c.094.124.186.249.266.375 1.179.805 2.567.496 3.568-.218.1-.342.197-.664.212-.903.024-.474.05-.896.136-1.245s.244-.634.53-.791a1 1 0 0 1 .138-.061q.005-.045.013-.087c.082-.546.569-.572 1.18-.303.588.266.81.499.71.814h.13c.122-.398-.133-.69-.822-1.025l-.137-.06a2.35 2.35 0 0 0-.012-1.113c-.188-.79-.704-1.49-1.098-1.838-.072-.003-.065.06.081.203.363.333 1.156 1.532.727 2.644a1.2 1.2 0 0 0-.342-.043c-.164-.907-.543-1.66-.735-2.014-.359-.668-.918-2.036-1.158-2.983M7.72 3.503a1 1 0 0 0-.312.053c-.268.093-.447.286-.559.391-.022.021-.05.04-.119.091s-.172.126-.321.238q-.198.151-.13.38c.046.15.192.325.459.476.166.098.28.23.41.334a1 1 0 0 0 .215.133.9.9 0 0 0 .298.066c.282.017.49-.068.673-.173s.34-.233.518-.29c.365-.115.627-.345.709-.564a.37.37 0 0 0-.01-.309c-.048-.096-.148-.187-.318-.257h-.001c-.354-.151-.507-.162-.705-.29-.321-.207-.587-.28-.807-.279m-.89-1.122h-.025a.4.4 0 0 0-.278.135.76.76 0 0 0-.191.334 1.2 1.2 0 0 0-.051.445v.001c.01.162.041.299.102.436.05.116.109.204.183.274l.089-.065.117-.09-.023-.018a.4.4 0 0 1-.11-.161.7.7 0 0 1-.054-.22v-.01a.7.7 0 0 1 .014-.234.4.4 0 0 1 .08-.179q.056-.069.126-.073h.013a.18.18 0 0 1 .123.05c.045.04.08.09.11.162a.7.7 0 0 1 .054.22v.01a.7.7 0 0 1-.002.17 1.1 1.1 0 0 1 .317-.143 1.3 1.3 0 0 0 .002-.194V3.23a1.2 1.2 0 0 0-.102-.437.8.8 0 0 0-.227-.31.4.4 0 0 0-.268-.102m1.95-.155a.63.63 0 0 0-.394.14.9.9 0 0 0-.287.376 1.2 1.2 0 0 0-.1.51v.015q0 .079.01.152c.114.027.278.074.406.138a1 1 0 0 1-.011-.172.8.8 0 0 1 .058-.278.5.5 0 0 1 .139-.2.26.26 0 0 1 .182-.069.26.26 0 0 1 .178.081c.055.054.094.12.124.21.029.086.042.17.04.27l-.002.012a.8.8 0 0 1-.057.277c-.024.059-.089.106-.122.145.046.016.09.03.146.052a5 5 0 0 1 .248.102 1.2 1.2 0 0 0 .244-.763 1.2 1.2 0 0 0-.11-.495.9.9 0 0 0-.294-.37.64.64 0 0 0-.39-.133z" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }}>
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.186.186 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
    </svg>
  );
}

function RancherIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }}>
      <path d="M22.727 6.626L21.36 13.3l-1.631-.58-.978 4.152-1.674-.581-1.41 4.21H8.333l-1.41-4.21-1.674.581-.978-4.152-1.63.58L1.272 6.626 4.598 5.39l.455 2.479.828-.297-.29-2.572L12 2.31l6.41 2.69-.291 2.572.828.297.455-2.479z" />
    </svg>
  );
}

type Platform = 'windows' | 'macos' | 'linux';

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="sc-gs-step">
      <div className="sc-gs-step-header">
        <span className="sc-gs-step-number">{num}</span>
        <span className="sc-gs-step-title">{title}</span>
      </div>
      <div className="sc-gs-step-body">
        {children}
      </div>
    </div>
  );
}

function WindowsSteps() {
  return (
    <>
      <Step num={1} title="Install a container runtime">
        <p style={{ margin: '0 0 8px' }}>
          Install{' '}
          <a href="https://rancherdesktop.io/" target="_blank" rel="noopener noreferrer" className="sc-hp-link">
            <RancherIcon /> Rancher Desktop <ExternalLinkIcon />
          </a>{' '}
          (free for commercial use)
        </p>
        <p style={{ margin: 0 }}>
          Or{' '}
          <a href="https://docs.docker.com/get-docker/" target="_blank" rel="noopener noreferrer" className="sc-hp-link">
            <DockerIcon /> Docker Desktop <ExternalLinkIcon />
          </a>{' '}
          (licence required for commercial use)
        </p>
      </Step>
      <Step num={2} title="Download">
        <div style={{ marginTop: 4 }}>
          <button
            type="button"
            className="sc-hp-download-btn"
            onClick={() => alert('Not released yet, sorry, please check back soon.')}
          >
            <span className="sc-hp-download-btn-icon"><DownloadIcon size={14} /></span>
            <span className="sc-hp-download-btn-text">Download docker-compose.yml</span>
          </button>
        </div>
      </Step>
      <Step num={3} title="Open a terminal and run">
        <div className="sc-hp-code-block">
          <code className="sc-hp-code">docker compose up -d</code>
        </div>
      </Step>
      <Step num={4} title="Open your browser">
        <a href="http://localhost" target="_blank" rel="noopener noreferrer" className="sc-hp-link">http://localhost</a>
      </Step>
    </>
  );
}

function MacSteps() {
  return (
    <>
      <Step num={1} title="Install a container runtime">
        <p style={{ margin: '0 0 8px' }}>
          Install{' '}
          <a href="https://rancherdesktop.io/" target="_blank" rel="noopener noreferrer" className="sc-hp-link">
            <RancherIcon /> Rancher Desktop <ExternalLinkIcon />
          </a>{' '}
          (free for commercial use)
        </p>
        <p style={{ margin: 0 }}>
          Or{' '}
          <a href="https://docs.docker.com/get-docker/" target="_blank" rel="noopener noreferrer" className="sc-hp-link">
            <DockerIcon /> Docker Desktop <ExternalLinkIcon />
          </a>{' '}
          (licence required for commercial use)
        </p>
      </Step>
      <Step num={2} title="Download">
        <div style={{ marginTop: 4 }}>
          <button
            type="button"
            className="sc-hp-download-btn"
            onClick={() => alert('Not released yet, sorry, please check back soon.')}
          >
            <span className="sc-hp-download-btn-icon"><DownloadIcon size={14} /></span>
            <span className="sc-hp-download-btn-text">Download docker-compose.yml</span>
          </button>
        </div>
      </Step>
      <Step num={3} title="Open Terminal and run">
        <div className="sc-hp-code-block">
          <code className="sc-hp-code">docker compose up -d</code>
        </div>
      </Step>
      <Step num={4} title="Open your browser">
        <a href="http://localhost" target="_blank" rel="noopener noreferrer" className="sc-hp-link">http://localhost</a>
      </Step>
    </>
  );
}

function LinuxSteps() {
  return (
    <>
      <Step num={1} title="Install Docker Engine (free)">
        <p style={{ margin: '0 0 8px' }}>
          Docker Engine runs natively on Linux — no additional runtime needed.
        </p>
        <div className="sc-hp-code-block">
          <code className="sc-hp-code">curl -fsSL https://get.docker.com | sudo sh</code>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: 12 }}>
          Supports Ubuntu, Debian, Mint, Fedora, RHEL, CentOS and more.{' '}
          <a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer" className="sc-hp-link">
            Full install guide <ExternalLinkIcon />
          </a>
        </p>
      </Step>
      <Step num={2} title="Download">
        <div style={{ marginTop: 4 }}>
          <button
            type="button"
            className="sc-hp-download-btn"
            onClick={() => alert('Not released yet, sorry, please check back soon.')}
          >
            <span className="sc-hp-download-btn-icon"><DownloadIcon size={14} /></span>
            <span className="sc-hp-download-btn-text">Download docker-compose.yml</span>
          </button>
        </div>
      </Step>
      <Step num={3} title="Run">
        <div className="sc-hp-code-block">
          <code className="sc-hp-code">docker compose up -d</code>
        </div>
      </Step>
      <Step num={4} title="Open your browser">
        <a href="http://localhost" target="_blank" rel="noopener noreferrer" className="sc-hp-link">http://localhost</a>
      </Step>
    </>
  );
}

const tabConfig: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { id: 'windows', label: 'Windows', icon: <WindowsIcon /> },
  { id: 'macos', label: 'macOS', icon: <AppleIcon /> },
  { id: 'linux', label: 'Linux', icon: <LinuxIcon /> },
];

export function GetStartedPage({ onNavigate }: GetStartedPageProps) {
  const [platform, setPlatform] = useState<Platform>('windows');
  const year = new Date().getFullYear();

  return (
    <div className="sc-home-page">
      <div className="sc-gs-page">
        <h1 className="sc-gs-title">Get started with Catalyst Studio</h1>

        <p className="sc-gs-intro">
          Catalyst Studio runs in Docker. Choose your platform below.
        </p>
        <p className="sc-gs-intro">
          We recommend Rancher Desktop on Windows and macOS — it's free
          for commercial use. Docker Desktop works too if your organisation
          has a licence.
        </p>

        <div className="sc-gs-tabs">
          {tabConfig.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`sc-gs-tab ${platform === tab.id ? 'active' : ''}`}
              onClick={() => setPlatform(tab.id)}
            >
              <span className="sc-gs-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {platform === 'windows' && <WindowsSteps />}
        {platform === 'macos' && <MacSteps />}
        {platform === 'linux' && <LinuxSteps />}

        <p className="sc-gs-note">
          Having trouble? Email us at{' '}
          <a href="mailto:hello@get-catalyst.dev" className="sc-hp-link">
            <MailIcon /> hello@get-catalyst.dev
          </a>
        </p>
      </div>

      {/* Footer */}
      <footer className="sc-hp-footer">
        <div className="sc-hp-footer-inner">
          <div className="sc-hp-footer-brand">
            <div className="sc-hp-footer-logo">
              <CatalystLogo size={20} />
              <span className="sc-hp-footer-name">Catalyst</span>
            </div>
            <p className="sc-hp-footer-tagline">Built for the Camunda 7 community</p>
          </div>
          <div className="sc-hp-footer-links">
            <a href="mailto:hello@get-catalyst.dev" className="sc-hp-footer-link">
              <MailIcon />
              hello@get-catalyst.dev
            </a>
          </div>
        </div>
        <div className="sc-hp-footer-copyright">
          <p>&copy; {year} Catalyst</p>
        </div>
      </footer>
    </div>
  );
}
