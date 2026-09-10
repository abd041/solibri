export function HoneycombBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900">
      <div className="absolute inset-0 opacity-60">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 72% 56% at 54% 18%, rgba(255,255,255,0.028), transparent 72%), radial-gradient(ellipse 52% 38% at 76% 72%, rgba(255,255,255,0.012), transparent 74%)",
          }}
        />
        <div className="honeycomb-drift absolute inset-[-10%]">
          <div className="honeycomb-zoom h-full w-full">
            <svg width="100%" height="100%" viewBox="0 0 720 720" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="hc-matte-face" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0e0e0d" />
                  <stop offset="46%" stopColor="#090909" />
                  <stop offset="100%" stopColor="#050505" />
                </linearGradient>
                <pattern id="hc-front" x="0" y="0" width="48.49742261192856" height="84" patternUnits="userSpaceOnUse">
                  <g fill="url(#hc-matte-face)" stroke="#030303" strokeWidth="2.2">
                    <polygon points="24.2,0.0 48.5,14.0 48.5,42.0 24.2,56.0 0.0,42.0 0.0,14.0" />
                    <polygon points="0.0,42.0 24.2,56.0 24.2,84.0 0.0,98.0 -24.2,84.0 -24.2,56.0" />
                    <polygon points="48.5,42.0 72.7,56.0 72.7,84.0 48.5,98.0 24.2,84.0 24.2,56.0" />
                  </g>
                  <g fill="none" stroke="#211f1d" strokeWidth="0.72" strokeOpacity="0.64">
                    <polygon points="24.2,0.0 48.5,14.0 48.5,42.0 24.2,56.0 0.0,42.0 0.0,14.0" />
                    <polygon points="0.0,42.0 24.2,56.0 24.2,84.0 0.0,98.0 -24.2,84.0 -24.2,56.0" />
                    <polygon points="48.5,42.0 72.7,56.0 72.7,84.0 48.5,98.0 24.2,84.0 24.2,56.0" />
                  </g>
                </pattern>
              </defs>
              <rect width="720" height="720" fill="url(#hc-front)" />
              <g>
                <polygon
                  className="hex-lit"
                  points="24.2,0.0 48.5,14.0 48.5,42.0 24.2,56.0 0.0,42.0 0.0,14.0"
                  fill="none"
                  stroke="#dd5a16"
                  strokeWidth="0.95"
                  vectorEffect="non-scaling-stroke"
                  shapeRendering="geometricPrecision"
                  style={{ ["--breathe-dur" as string]: "10.4s", ["--breathe-delay" as string]: "-1.2s" }}
                />
                <polygon
                  className="hex-lit"
                  points="145.5,42.0 169.7,56.0 169.7,84.0 145.5,98.0 121.2,84.0 121.2,56.0"
                  fill="none"
                  stroke="#dd5a16"
                  strokeWidth="0.95"
                  vectorEffect="non-scaling-stroke"
                  shapeRendering="geometricPrecision"
                  style={{ ["--breathe-dur" as string]: "13.1s", ["--breathe-delay" as string]: "-8.4s" }}
                />
                <polygon
                  className="hex-lit"
                  points="121.2,168.0 145.5,182.0 145.5,210.0 121.2,224.0 97.0,210.0 97.0,182.0"
                  fill="none"
                  stroke="#dd5a16"
                  strokeWidth="0.95"
                  vectorEffect="non-scaling-stroke"
                  shapeRendering="geometricPrecision"
                  style={{ ["--breathe-dur" as string]: "12.8s", ["--breathe-delay" as string]: "-6.1s" }}
                />
                <polygon
                  className="hex-lit"
                  points="291.0,210.0 315.2,224.0 315.2,252.0 291.0,266.0 266.7,252.0 266.7,224.0"
                  fill="none"
                  stroke="#dd5a16"
                  strokeWidth="0.95"
                  vectorEffect="non-scaling-stroke"
                  shapeRendering="geometricPrecision"
                  style={{ ["--breathe-dur" as string]: "15.2s", ["--breathe-delay" as string]: "-2.6s" }}
                />
                <polygon
                  className="hex-lit"
                  points="266.7,336.0 291.0,350.0 291.0,378.0 266.7,392.0 242.5,378.0 242.5,350.0"
                  fill="none"
                  stroke="#dd5a16"
                  strokeWidth="0.95"
                  vectorEffect="non-scaling-stroke"
                  shapeRendering="geometricPrecision"
                  style={{ ["--breathe-dur" as string]: "12.2s", ["--breathe-delay" as string]: "-10.8s" }}
                />
                <polygon
                  className="hex-lit"
                  points="436.5,378.0 460.7,392.0 460.7,420.0 436.5,434.0 412.2,420.0 412.2,392.0"
                  fill="none"
                  stroke="#dd5a16"
                  strokeWidth="0.95"
                  vectorEffect="non-scaling-stroke"
                  shapeRendering="geometricPrecision"
                  style={{ ["--breathe-dur" as string]: "15.8s", ["--breathe-delay" as string]: "-3.9s" }}
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="honeycomb-matte-grain absolute inset-0" />
      </div>
      <div className="absolute inset-0 bg-ink-900/25" />
    </div>
  );
}
