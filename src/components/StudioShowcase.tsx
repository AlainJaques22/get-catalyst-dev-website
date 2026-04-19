import { useShowcaseState } from './studio/useShowcaseState';
import { LeftMenu } from './studio/LeftMenu';
import { ContentArea } from './studio/ContentArea';
import { TitleBar } from './studio/TitleBar';

export default function StudioShowcase() {
  const [state, dispatch] = useShowcaseState();
  const navigate = (id: string, label: string) => dispatch({ type: 'NAVIGATE', id, label });

  return (
    <div className="sc-window">
      <LeftMenu state={state} dispatch={dispatch} />
      <div className="sc-right-col">
        <TitleBar onNavigate={navigate} />
        <ContentArea state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
