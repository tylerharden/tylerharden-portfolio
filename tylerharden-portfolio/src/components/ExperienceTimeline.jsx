import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

const keyFor = (item) => `${item.startDate}-${item.title}`;
const STEM = 28;
const RAISE = 12;
// Deliberate visible gap between the axis line and each bracket leg, so the chunk
// reads as clearly separate from the timeline rather than sitting on it.
const GAP = 4;

const CardContent = ({ item, active }) => (
  <>
    <h4 className={`font-semibold text-xs text-neutral-900 dark:text-white ${active ? '' : 'line-clamp-2'}`}>
      {item.title}
    </h4>
    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">{item.stringDate}</p>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        active ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">{item.description}</p>
    </div>
  </>
);

const ExperienceTimeline = ({ experience }) => {
  const [activeKey, setActiveKey] = useState(null);
  const toggle = (item) => setActiveKey((cur) => (cur === keyFor(item) ? null : keyFor(item)));
  const hover = (item) => setActiveKey(keyFor(item));
  const unhover = (item) => setActiveKey((cur) => (cur === keyFor(item) ? null : cur));

  // Oldest -> newest, for left-to-right reading on the desktop line.
  const chronological = useMemo(() => [...experience].reverse(), [experience]);

  // Positions are true date-proportions along the axis, not just evenly spaced by
  // index, so the tick marks below actually mean something. Adjacent roles alternate
  // above/below the line, so what matters for collision is the gap between same-side
  // neighbors (2 apart) - comfortably wide for a real career history.
  const start = dayjs(`${chronological[0].startDate}-01`).startOf('month');
  const end = dayjs();
  const totalMonths = Math.max(end.diff(start, 'month'), 1);
  const positionFor = (dateStr) => {
    const d = dayjs(`${dateStr}-01`);
    return Math.min(100, Math.max(0, (d.diff(start, 'month') / totalMonths) * 100));
  };

  // Whichever side (above/below) the role covering this point puts its bracket on,
  // the year label goes on the other side so it never lands on top of a chunk.
  const freeSideAt = (pct) => {
    const idx = chronological.findIndex((it) => {
      const s = positionFor(it.startDate);
      const e = it.endDate ? positionFor(it.endDate) : 100;
      return pct >= s && pct <= e;
    });
    if (idx === -1) return 'below';
    return idx % 2 === 0 ? 'below' : 'above';
  };

  const years = useMemo(() => {
    const list = [];
    let y = start.startOf('year');
    while (y.year() <= end.year()) {
      list.push(y);
      y = y.add(1, 'year');
    }
    return list;
  }, [start, end]);

  // Unlabeled ticks for every month in between, so the axis reads as a ruler rather
  // than just a handful of year marks with empty space between them. January is
  // skipped since the taller, labeled year tick already marks that spot.
  const months = useMemo(() => {
    const list = [];
    let m = start;
    while (m.isBefore(end) || m.isSame(end, 'month')) {
      if (m.month() !== 0) list.push(m);
      m = m.add(1, 'month');
    }
    return list;
  }, [start, end]);

  return (
    <div>
      {/* Desktop: horizontal line with year ticks, cards alternate above/below so
          neighbors never collide */}
      <div className="hidden md:block relative pt-48 pb-48">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-neutral-200 dark:bg-neutral-800" />

        {months.map((month) => (
          <div
            key={month.format('YYYY-MM')}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-px bg-neutral-200 dark:bg-neutral-800"
            style={{ left: `${(month.diff(start, 'month') / totalMonths) * 100}%` }}
          />
        ))}

        {years.map((year) => {
          const pct = Math.max((year.diff(start, 'month') / totalMonths) * 100, 0);
          const labelAbove = freeSideAt(pct) === 'above';
          return (
            <div key={year.format('YYYY')} className="absolute top-1/2" style={{ left: `${pct}%` }}>
              {/* Tick centers on its own width independently of the label, so the
                  label's rotated, much wider footprint can't drag the tick itself
                  away from its true date position. */}
              <div
                className="absolute w-px -translate-x-1/2 bg-neutral-300 dark:bg-neutral-700"
                style={{ height: 8, transform: `translateX(-50%) translateY(${labelAbove ? '-100%' : '0'})` }}
              />
              {/* Label: angled to the right, on whichever side (above/below) isn't
                  occupied by an experience bracket at this point on the axis. */}
              <div
                className="absolute text-[10px] text-neutral-400 dark:text-neutral-500 whitespace-nowrap"
                style={{
                  left: 2,
                  [labelAbove ? 'bottom' : 'top']: 10,
                  transform: `rotate(${labelAbove ? -30 : 30}deg)`,
                  transformOrigin: labelAbove ? 'bottom left' : 'top left',
                }}
              >
                {year.format('YYYY')}
              </div>
            </div>
          );
        })}

        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="h-2 w-px bg-blue-500 dark:bg-blue-400" />
          <div className="mt-1 text-xs font-medium text-blue-500 dark:text-blue-400 whitespace-nowrap">Present</div>
        </div>

        {/* Chunks: a bracket per role - two legs dropping to its true start/end dates
            on the axis, joined by a bar raised off the line (up for 'above' roles,
            down for 'below' ones) so it doesn't just sit flush on the axis. Rendered
            directly against the axis container (not nested in the per-item anchor
            below) so left/width percentages are unambiguous. */}
        {chronological.map((item, idx) => {
          const startPct = positionFor(item.startDate);
          const endPct = item.endDate ? positionFor(item.endDate) : 100;
          const widthPct = Math.max(endPct - startPct, 1);
          const above = idx % 2 === 0;
          return (
            <div key={`chunk-${keyFor(item)}`}>
              <div
                className="absolute w-px bg-neutral-300 dark:bg-neutral-600 z-20"
                style={{
                  left: `${startPct}%`,
                  top: '50%',
                  height: Math.max(RAISE - GAP, 1),
                  transform: `translateY(${above ? -RAISE : GAP}px)`,
                }}
              />
              <div
                className="absolute w-px bg-neutral-300 dark:bg-neutral-600 z-20"
                style={{
                  left: `${endPct}%`,
                  top: '50%',
                  height: Math.max(RAISE - GAP, 1),
                  transform: `translateY(${above ? -RAISE : GAP}px)`,
                }}
              />
              <div
                className="absolute h-px bg-neutral-300 dark:bg-neutral-600 z-20"
                style={{
                  left: `${startPct}%`,
                  width: `${widthPct}%`,
                  top: '50%',
                  transform: `translateY(calc(-50% + ${above ? -RAISE : RAISE}px))`,
                }}
              />
            </div>
          );
        })}

        {chronological.map((item, idx) => {
          const startPct = positionFor(item.startDate);
          const endPct = item.endDate ? positionFor(item.endDate) : 100;
          const mid = startPct + Math.max(endPct - startPct, 1) / 2;
          const active = activeKey === keyFor(item);
          const above = idx % 2 === 0;

          return (
            <div key={keyFor(item)} className="absolute top-1/2" style={{ left: `${mid}%` }}>
              {/* Stem: continues from the raised chunk bar up/down to the card. A fixed
                  height that never changes with hover state, so the card's near edge
                  stays put and hovering it can never shift it out from under the
                  cursor (which is what caused the flicker before). */}
              <div
                className={`absolute w-px bg-neutral-300 dark:bg-neutral-700 ${above ? 'bottom-0' : 'top-0'}`}
                style={{
                  height: STEM,
                  left: '50%',
                  transform: `translateX(-50%) translateY(${above ? -RAISE : RAISE}px)`,
                }}
              />

              {/* Flag: hover listeners live on it directly, so only the actual text
                  area (not empty space around it) triggers the expand. No card
                  background/border - just the text, growing in place on hover.
                  Always centered on its point, same as every other item. */}
              <button
                onMouseEnter={() => hover(item)}
                onMouseLeave={() => unhover(item)}
                onClick={() => toggle(item)}
                aria-expanded={active}
                className={`absolute left-1/2 -translate-x-1/2 text-center transition-all duration-300 ease-out cursor-pointer ${
                  active ? 'w-72 max-h-96 overflow-y-auto p-2 z-30' : 'w-32 p-1 z-10'
                }`}
                style={{ [above ? 'bottom' : 'top']: RAISE + STEM + 6 }}
              >
                <CardContent item={item} active={active} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical line, latest at top, cards alternate left/right */}
      <div className="md:hidden relative">
        <div className="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-neutral-200 dark:bg-neutral-800" />
        <ul className="space-y-5">
          {experience.map((item, idx) => {
            const active = activeKey === keyFor(item);
            const onLeft = idx % 2 === 0;
            return (
              <li key={keyFor(item)} className="relative">
                <span className="absolute left-1/2 top-4 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-blue-400 dark:bg-blue-500 z-10" />
                <div className={`w-[46%] ${onLeft ? 'mr-auto' : 'ml-auto'}`}>
                  <button
                    onClick={() => toggle(item)}
                    aria-expanded={active}
                    className="w-full text-left p-2.5 transition-colors cursor-pointer"
                  >
                    <CardContent item={item} active={active} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
