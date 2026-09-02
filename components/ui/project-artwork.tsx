import { cn } from "@/lib/utils";

/**
 * Generated cover art for each project.
 *
 * The apps are closed-source and there are no store screenshots in the repo, so
 * rather than shipping a generic code glyph on every card, each project gets a
 * motif that depicts what it actually does, tinted by its own hue. Drop real
 * screenshots into `Project.shots` and the consuming card will prefer those.
 */

type ArtworkProps = {
  slug: string;
  hue: number;
  className?: string;
  /** Rendered as decoration; the card supplies the accessible name. */
  title?: string;
};

function palette(hue: number) {
  return {
    strong: `oklch(0.72 0.15 ${hue})`,
    mid: `oklch(0.62 0.13 ${hue})`,
    soft: `oklch(0.55 0.09 ${hue} / 0.28)`,
    faint: `oklch(0.6 0.08 ${hue} / 0.12)`,
  };
}

function Frame({
  hue,
  children,
  className,
  title,
}: {
  hue: number;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  const c = palette(hue);
  const gid = `g-${hue}`;

  return (
    <svg
      viewBox="0 0 800 500"
      className={cn("block h-full w-full", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.soft} />
          <stop offset="100%" stopColor={c.faint} />
        </linearGradient>
        <pattern id={`${gid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0H0v40"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.09"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="800" height="500" fill={`url(#${gid})`} />
      <rect width="800" height="500" fill={`url(#${gid}-grid)`} />
      {children}
    </svg>
  );
}

/** Transparency checkerboard with a subject cut out of it. */
function BackgroundEraserArt({ hue, title }: { hue: number; title?: string }) {
  const c = palette(hue);
  const squares: React.ReactElement[] = [];
  const size = 25;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 13; col++) {
      if ((row + col) % 2 !== 0) continue;
      squares.push(
        <rect
          key={`${row}-${col}`}
          x={230 + col * size}
          y={150 + row * size}
          width={size}
          height={size}
          fill="currentColor"
          opacity="0.1"
        />,
      );
    }
  }

  return (
    <Frame hue={hue} title={title}>
      <g>{squares}</g>
      {/* Cut-out subject: shoulders and head, sitting on the checkerboard. */}
      <path
        d="M400 200c26 0 47 21 47 47 0 18-10 34-25 42 38 9 66 36 74 71H304c8-35 36-62 74-71-15-8-25-24-25-42 0-26 21-47 47-47Z"
        fill={c.strong}
      />
      {/* The selection edge being traced by the brush. */}
      <path
        d="M300 362c10-40 42-70 82-78-18-10-30-29-30-51 0-32 26-58 58-58"
        fill="none"
        stroke={c.mid}
        strokeWidth="3"
        strokeDasharray="10 8"
        strokeLinecap="round"
      />
      <circle cx="352" cy="233" r="9" fill="none" stroke={c.strong} strokeWidth="3" />
      <rect
        x="230"
        y="150"
        width="325"
        height="200"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />
    </Frame>
  );
}

/** Two currency nodes, a rate line, and an offline cache marker. */
function CurrencyConverterArt({ hue, title }: { hue: number; title?: string }) {
  const c = palette(hue);

  return (
    <Frame hue={hue} title={title}>
      <path
        d="M120 330c60 0 90-70 150-70s90 40 150 40 90-90 150-90 70 40 110 40"
        fill="none"
        stroke={c.strong}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M120 360c60 0 90-50 150-50s90 30 150 30 90-62 150-62 70 28 110 28"
        fill="none"
        stroke={c.mid}
        strokeWidth="2"
        strokeOpacity="0.5"
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
      {[
        { x: 270, y: 260 },
        { x: 420, y: 300 },
        { x: 570, y: 210 },
      ].map((p) => (
        <circle key={p.x} cx={p.x} cy={p.y} r="7" fill={c.strong} />
      ))}

      <g transform="translate(120 120)">
        <circle cx="0" cy="0" r="42" fill="none" stroke={c.strong} strokeWidth="2.5" />
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fill={c.strong}
          fontSize="38"
          fontFamily="ui-serif, Georgia, serif"
        >
          $
        </text>
      </g>
      <path
        d="M180 120h120"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeDasharray="5 6"
      />
      <path d="M292 112l12 8-12 8" fill={c.mid} />
      <g transform="translate(360 120)">
        <circle cx="0" cy="0" r="42" fill="none" stroke={c.mid} strokeWidth="2.5" />
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fill={c.mid}
          fontSize="34"
          fontFamily="ui-serif, Georgia, serif"
        >
          €
        </text>
      </g>

      {/* Offline cache badge. */}
      <g transform="translate(560 96)">
        <rect
          x="0"
          y="0"
          width="130"
          height="48"
          rx="8"
          fill="currentColor"
          fillOpacity="0.07"
          stroke="currentColor"
          strokeOpacity="0.2"
        />
        <circle cx="22" cy="24" r="6" fill={c.strong} />
        <path
          d="M44 18h68M44 30h44"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

/** A USSD sequence collapsing into a single saved action. */
function SimpliCodeArt({ hue, title }: { hue: number; title?: string }) {
  const c = palette(hue);
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <Frame hue={hue} title={title}>
      {/* The long sequence being replaced. */}
      <g transform="translate(90 92)">
        <rect
          x="0"
          y="0"
          width="290"
          height="52"
          rx="10"
          fill="currentColor"
          fillOpacity="0.06"
          stroke="currentColor"
          strokeOpacity="0.18"
        />
        <text
          x="20"
          y="33"
          fill="currentColor"
          fillOpacity="0.55"
          fontSize="21"
          fontFamily="ui-monospace, monospace"
        >
          *144*4*2*1#
        </text>
      </g>
      <path
        d="M395 118h56"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeDasharray="5 6"
      />
      <path d="M444 110l12 8-12 8" fill={c.mid} />
      {/* One saved action. */}
      <g transform="translate(470 92)">
        <rect x="0" y="0" width="230" height="52" rx="10" fill={c.strong} fillOpacity="0.18" stroke={c.strong} strokeOpacity="0.55" />
        <circle cx="28" cy="26" r="10" fill={c.strong} />
        <path
          d="M52 20h100M52 33h64"
          stroke={c.strong}
          strokeOpacity="0.75"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Keypad. */}
      <g transform="translate(272 190)">
        {keys.map((key, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const active = key === "*" || key === "#" || key === "1" || key === "4";
          return (
            <g key={key} transform={`translate(${col * 90} ${row * 66})`}>
              <rect
                width="72"
                height="52"
                rx="8"
                fill={active ? c.strong : "currentColor"}
                fillOpacity={active ? 0.2 : 0.05}
                stroke={active ? c.strong : "currentColor"}
                strokeOpacity={active ? 0.5 : 0.14}
              />
              <text
                x="36"
                y="34"
                textAnchor="middle"
                fill={active ? c.strong : "currentColor"}
                fillOpacity={active ? 1 : 0.4}
                fontSize="21"
                fontFamily="ui-monospace, monospace"
              >
                {key}
              </text>
            </g>
          );
        })}
      </g>

      {/* Dual SIM markers. */}
      <g transform="translate(96 226)">
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(0 ${i * 86})`}>
            <rect
              width="108"
              height="66"
              rx="8"
              fill="currentColor"
              fillOpacity="0.05"
              stroke="currentColor"
              strokeOpacity="0.16"
            />
            <path d="M84 0v14h14" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
            <text
              x="18"
              y="42"
              fill={i === 0 ? c.strong : "currentColor"}
              fillOpacity={i === 0 ? 1 : 0.4}
              fontSize="17"
              fontFamily="ui-monospace, monospace"
            >
              SIM {i + 1}
            </text>
          </g>
        ))}
      </g>
    </Frame>
  );
}

export function ProjectArtwork({ slug, hue, className, title }: ArtworkProps) {
  const wrapper = cn("text-fg", className);

  switch (slug) {
    case "background-eraser":
      return (
        <div className={wrapper}>
          <BackgroundEraserArt hue={hue} title={title} />
        </div>
      );
    case "currency-converter-offline":
      return (
        <div className={wrapper}>
          <CurrencyConverterArt hue={hue} title={title} />
        </div>
      );
    case "simpli-code":
      return (
        <div className={wrapper}>
          <SimpliCodeArt hue={hue} title={title} />
        </div>
      );
    default:
      return (
        <div className={wrapper}>
          <Frame hue={hue} title={title}>
            <circle cx="400" cy="250" r="80" fill={palette(hue).strong} fillOpacity="0.35" />
          </Frame>
        </div>
      );
  }
}
