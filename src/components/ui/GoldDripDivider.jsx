export default function GoldDripDivider() {
  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        position: 'relative',
        height: 48,
        zIndex: 2,
      }}
    >
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 48, display: 'block' }}
      >
        <defs>
          <linearGradient id="dripGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a84c" stopOpacity="1" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L1200,0 L1200,4 Q1100,4 1080,18 Q1070,28 1060,4 L1020,4 Q1000,4 990,22 Q985,32 975,4 L920,4 Q900,4 885,14 Q878,20 870,4 L800,4 Q780,4 770,20 Q765,30 755,4 L700,4 Q690,4 680,16 Q675,24 665,4 L580,4 Q560,4 550,24 Q545,38 535,4 L480,4 Q470,4 460,14 Q455,22 445,4 L380,4 Q360,4 350,18 Q345,28 335,4 L280,4 Q265,4 255,16 Q250,24 240,4 L180,4 Q160,4 150,22 Q145,34 135,4 L80,4 Q60,4 50,14 Q45,22 35,4 L0,4 Z"
          fill="url(#dripGold)"
        />
      </svg>
    </div>
  );
}
