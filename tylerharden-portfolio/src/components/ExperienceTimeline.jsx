import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

const keyFor = (item) => `${item.startDate}-${item.title}`;
const STEM = 28;

const CardContent = ({ item, active }) => (
  <>
    <h4 className={`font-semibold text-neutral-900 dark:text-white ${active ? 'text-sm' : 'text-xs line-clamp-2'}`}>
      {item.title}
    </h4>
    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">{item.stringDate}</p>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        active ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{item.description}</p>
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

  // Flags are spaced evenly by index rather than strict date-proportion: with only a
  // handful of roles, proportional spacing clusters adjacent cards close enough to
  // collide. Each card still shows its real date range, so nothing is lost.
  const n = chronological.length;
  const xFor = (idx) => (n <= 1 ? 50 : 6 + (idx / (n - 1)) * 88);

  return (
    <div>
      {/* Desktop: horizontal line, cards alternate above/below so neighbors never collide */}
      <div className="hidden md:block relative pt-56 pb-56">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-neutral-200 dark:bg-neutral-800" />

        <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-white dark:bg-neutral-950 pr-2 text-xs text-neutral-400 dark:text-neutral-500">
          {dayjs(`${chronological[0].startDate}-01`).format('MMM YYYY')}
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white dark:bg-neutral-950 pl-2 text-xs text-neutral-400 dark:text-neutral-500">
          Present
        </div>

        {chronological.map((item, idx) => {
          const left = xFor(idx);
          const active = activeKey === keyFor(item);
          const align = left < 10 ? 'start' : left > 90 ? 'end' : 'center';
          const above = idx % 2 === 0;
          const sideOffset = align === 'start' ? 0 : align === 'end' ? '100%' : '50%';

          return (
            <div key={keyFor(item)} className="absolute top-1/2" style={{ left: `${left}%` }}>
              {/* Dot: centered exactly on the line regardless of which side the card sits on */}
              <span
                className="absolute h-2.5 w-2.5 rounded-full bg-blue-600 z-20"
                style={{ left: sideOffset, top: 0, transform: 'translate(-50%, -50%)' }}
              />

              {/* Stem: a fixed height that never changes with hover state, so the card's
                  near edge stays put and hovering it can never shift it out from under
                  the cursor (which is what caused the flicker before). */}
              <div
                className={`absolute w-px bg-neutral-300 dark:bg-neutral-700 ${above ? 'bottom-0' : 'top-0'}`}
                style={{ height: STEM, left: sideOffset, transform: 'translateX(-50%)' }}
              />

              {/* Flag card: hover listeners live on the card itself, so only the actual
                  card area (not empty space around it) triggers the expand. */}
              <button
                onMouseEnter={() => hover(item)}
                onMouseLeave={() => unhover(item)}
                onClick={() => toggle(item)}
                aria-expanded={active}
                className={`absolute rounded-lg border text-left transition-all duration-300 ease-out cursor-pointer ${
                  align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2'
                } ${
                  active
                    ? 'w-72 max-h-64 overflow-y-auto p-4 bg-white dark:bg-neutral-900 border-blue-600 shadow-lg z-30'
                    : 'w-40 p-2.5 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm z-10'
                }`}
                style={{ [above ? 'bottom' : 'top']: STEM + 6 }}
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
                <span className="absolute left-1/2 top-4 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-blue-600 z-10" />
                <div className={`w-[46%] ${onLeft ? 'mr-auto' : 'ml-auto'}`}>
                  <button
                    onClick={() => toggle(item)}
                    aria-expanded={active}
                    className={`w-full text-left rounded-lg border p-2.5 transition-colors cursor-pointer ${
                      active
                        ? 'border-blue-600 bg-white dark:bg-neutral-900 shadow-md'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                    }`}
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
