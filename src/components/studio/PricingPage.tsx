interface PricingPageProps {
  onNavigate: (id: string, label: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div className="sc-pricing">

      {/* Hero */}
      <div className="sc-pricing-hero">
        <h1 className="sc-pricing-h1">Pricing</h1>
        <p className="sc-pricing-sub">Two products. One simple rule — <strong>free to build, fair to ship.</strong></p>
      </div>

      <div className="sc-pricing-divider" />

      {/* Catalyst Studio */}
      <section className="sc-pricing-product">
        <div className="sc-pricing-product-header">
          <span className="sc-pricing-badge sc-pricing-badge-green">Catalyst Studio</span>
          <span className="sc-pricing-product-name">Dev environment · Free</span>
        </div>
        <h2 className="sc-pricing-h2"><span style={{ color: 'var(--primary)' }}>Catalyst Studio</span> is Free. No registration, No account. No trial period. No limits.</h2>
        <p className="sc-pricing-tagline">Your local development environment. Multi-engine — Camunda 7, Operaton, and more on the way. Every connector included. Build and test as much as you want.</p>

        <div className="sc-pricing-facts">
          <div className="sc-pricing-fact">
            <div className="sc-pricing-fact-label sc-pricing-label-green">No account</div>
            <p>No email address. No "verify your inbox." No onboarding sequence. No drip campaign. <strong>We don't even know you installed it.</strong></p>
          </div>
          <div className="sc-pricing-fact">
            <div className="sc-pricing-fact-label sc-pricing-label-green">No trial</div>
            <p>No trial period. No feature gates. No nudges to upgrade. <strong>No crippleware. No nagware. No tricks.</strong></p>
          </div>
          <div className="sc-pricing-fact">
            <div className="sc-pricing-fact-label sc-pricing-label-green">No salesperson</div>
            <p>No salesperson will follow up. <strong>Just run one command and you're in.</strong> Full functionality. No catch.</p>
          </div>
        </div>

        <div className="sc-pricing-smallprint-box">
          <div className="sc-pricing-smallprint-heading">The smallprint</div>
          <p className="sc-pricing-smallprint">You're right to be sceptical. Nobody goes to all this effort to give it away for free. Confession time. We have an ulterior motive. We think once you've built with the connectors, integrated with AI and all the other good stuff, you won't want to live without them in production — and that's when we'd like to be paid. Not much. Significantly less than whoever is currently quoting you six figures to modernise your stack. Just enough for us to keep the lights on and keep shipping. That's genuinely it.</p>
        </div>
      </section>

      <div className="sc-pricing-divider" />

      {/* Catalyst Connector */}
      <section className="sc-pricing-product">
        <div className="sc-pricing-product-header">
          <span className="sc-pricing-badge sc-pricing-badge-amber">Catalyst Connector</span>
          <span className="sc-pricing-product-name">Production runtime · Pay per execution</span>
        </div>
        <h2 className="sc-pricing-h2"><span style={{ color: 'var(--amber)' }}>Catalyst Connector</span> is an optional separate product. It enables you to run the connectors in your production environment. It is fair but not free.</h2>
        <p className="sc-pricing-tagline">The production runtime. Just the lean Java runtime JARs. Drop them into your Camunda environment and your connectors run. You only need this if you want to use our connectors in production. It only costs a few cents to execute a connector in production.</p>

        <div className="sc-pricing-steps">
          {[
            { n: '1', title: 'Pick your executions', desc: <>Choose your estimated connector executions for the year. The more you buy, <strong>the better the rate</strong> — the table is public and the same for everyone.</> },
            { n: '2', title: 'Pay up front, get your key', desc: <>Click and pay. You receive a licence key. Drop it into your production environment. <strong>The odometer starts counting down.</strong> Your logs show your run rate and warn you if you're burning through faster than expected — so you always know where you stand.</> },
            { n: '3', title: 'Top up when you\'re ready', desc: <>Same fair rate. Same table for everyone.</> },
          ].map(({ n, title, desc }) => (
            <div key={n} className="sc-pricing-step">
              <div className="sc-pricing-step-num">{n}</div>
              <div className="sc-pricing-step-body">
                <div className="sc-pricing-step-title">{title}</div>
                <div className="sc-pricing-step-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="sc-pricing-no-hostage">
          <div className="sc-pricing-nh-label">If you run out</div>
          <p><strong>Nothing breaks. Production keeps running.</strong> You just start seeing warnings in the logs telling you it's time to top up.</p>
          <p>No hard cutoffs. No ransom notes. We're not going to take your production environment hostage.</p>
        </div>

        <div className="sc-pricing-manifesto-quote">
          We publish our prices. On the internet.<br />
          Where anyone can see them.<br />
          Revolutionary, we know.
        </div>

        <p className="sc-pricing-manifesto-prose">No sales calls. No "let's find a solution that works for your budget." No enterprise quotes that take three weeks and an NDA. No wondering if the company next door got a better deal because their procurement team plays golf with ours.</p>
        <p className="sc-pricing-manifesto-prose"><strong>There is no golf. There is no procurement team. There is a price. It's on the website.</strong></p>

        <div className="sc-pricing-principles">
          {[
            { label: 'Volume', text: <>We do have volume pricing — the more you use, the better the rate. But it's the same table for everyone. No expiry date on the executions you buy, this isn't milk.</> },
            { label: 'Affordable', text: <>Priced to be a no-brainer. Priced so you never need to open a procurement ticket or schedule a budget meeting. <strong>A fraction of what you'd pay to "modernise your stack"</strong> — with none of the migration project, none of the retraining, none of the six-figure renewal conversation.</> },
            { label: 'Fair', text: <>Honestly, transparently, deliberately affordable. A one-person startup in Cape Town pays exactly the same rate as a billion dollar bank in Frankfurt. Because that's how prices should work.</> },
          ].map(({ label, text }) => (
            <div key={label} className="sc-pricing-principle">
              <div className="sc-pricing-principle-label">{label}</div>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="sc-pricing-closing">Click. Pay. Done.</div>
        <p className="sc-pricing-closing-sub">
          Full pricing at <a href="https://catalyst-connector.com" target="_blank" rel="noreferrer">catalyst-connector.com</a>
        </p>
      </section>

      <div className="sc-pricing-divider" />

      {/* CTA */}
      <div className="sc-pricing-cta">
        <div>
          <h2 className="sc-pricing-cta-h2">Start building today.</h2>
          <p className="sc-pricing-cta-sub">Questions? <a href="mailto:hello@get-catalyst.dev">hello@get-catalyst.dev</a></p>
        </div>
        <div className="sc-pricing-cta-actions">
          <button type="button" className="sc-pricing-btn-primary" onClick={() => onNavigate('get-started', 'Get Started')}>
            Get Studio free →
          </button>
          <a href="https://catalyst-connector.com" target="_blank" rel="noreferrer" className="sc-pricing-btn-amber">
            Connector pricing →
          </a>
        </div>
      </div>

    </div>
  );
}
