import classes from './RamScale.module.scss';
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
    <div className={classes.ramviz}>
      <div className={classes.bar}>
        <div
          className={`${classes.segment} ${classes.base}`}
          style={{ left: '0%', width: `${startPct}%` }}
        ></div>
        <div
          className={`${classes.segment} ${classes.recommended}`}
          style={{ left: `${startPct}%`, width: `${recWidthPct}%` }}
        ></div>
        <div
          className={`${classes.segment} ${classes.warning}`}
          style={{ left: `${endPct}%`, width: `${100 - endPct}%` }}
        ></div>

        <img
          src={indicator}
          alt="indicator"
          className={classes.pointer}
          style={{ left: `${currentPct}%` }}
        />
      </div>

      <div className={classes.scale}>
        <span className={classes.label}>0 GB</span>
        <span className={classes.label}>{recommendedStartGb} GB</span>
        <span className={classes.label}>{recommendedEndGb} GB</span>
        <span className={classes.label}>{maxGb} GB</span>
      </div>

      <div className={classes.overlay} style={{ left: `${startPct}%`, width: `${recWidthPct}%` }}>
        <div className={classes.recommendation}></div>
        <div className={classes.recommendationText}>Recommended</div>
      </div>
    </div>
  );
};

export default RamScale;
