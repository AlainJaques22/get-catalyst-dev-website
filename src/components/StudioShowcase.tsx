import { useShowcaseState } from './studio/useShowcaseState';
import { LeftMenu } from './studio/LeftMenu';
import { ContentArea } from './studio/ContentArea';

export default function StudioShowcase() {
  const [state, dispatch] = useShowcaseState();

  return (
    <div className="sc-window">
      <LeftMenu state={state} dispatch={dispatch} />
      <ContentArea state={state} dispatch={dispatch} />
    </div>
  );
}
