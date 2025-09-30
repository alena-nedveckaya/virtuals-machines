import './RamScale.css';
import indicator from '@/assets/indicator.svg';

interface RamScaleProps {
  maxGb?: number;
  recommendedStartGb?: number;
  recommendedEndGb?: number;
  currentGb?: number;
}

const RamScale = ({
  maxGb = 50,
  recommendedStartGb = 16,
  recommendedEndGb = 32,
  currentGb = 0,
}: RamScaleProps) => {
  const startPct = (recommendedStartGb / maxGb) * 100; // 32%
  const endPct = (recommendedEndGb / maxGb) * 100; // 64%
  const recWidthPct = endPct - startPct; // 32%
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
  const currentPct = clamp((currentGb / maxGb) * 100, 0, 100);

  return (
    <div className="ramviz">
      <div className="ramviz-bar">
        <div className="ramviz-segment base" style={{ left: '0%', width: `${startPct}%` }}></div>
        <div
          className="ramviz-segment recommended"
          style={{ left: `${startPct}%`, width: `${recWidthPct}%` }}
        ></div>
        <div
          className="ramviz-segment warning"
          style={{ left: `${endPct}%`, width: `${100 - endPct}%` }}
        ></div>

        <img
          src={indicator}
          alt="indicator"
          className="ramviz-pointer"
          style={{ left: `${currentPct}%` }}
        />
      </div>

      <div className="ramviz-scale">
        <span className="ramviz-label">0 GB</span>
        <span className="ramviz-label">{recommendedStartGb} GB</span>
        <span className="ramviz-label">{recommendedEndGb} GB</span>
        <span className="ramviz-label end">{maxGb} GB</span>
      </div>

      <div className="ramviz-overlay" style={{ left: `${startPct}%`, width: `${recWidthPct}%` }}>
        <div className="ramviz-recommendation"></div>
        <div className="ramviz-recommendation-text">Recommended</div>
      </div>
    </div>
  );
};

export default RamScale;
